import { writable, derived, get as getStore } from 'svelte/store';
import {
  get,
  compact,
  map,
  reduce,
  keyBy,
  isUndefined,
  isEmpty,
} from 'lodash-es';
import { DEFAULT_FORMAT_UID, SCENARIO_DATA_KEYS } from '$lib/../config.js';
import THEME from '$styles/theme-store.js';

// META DATA (This will only be set once on load and won't change again)
export const GEOGRAPHY_TYPES = writable({});
export const GEOGRAPHIES = (() => {
  const store = writable();
  return {
    ...store,
    set: ({ geographyTypes, continents, ...meta }) => {
      const continentsDict = keyBy(continents, 'uid');
      const geographies = geographyTypes.reduce((acc, type) => {
        const list = get(meta, type.uid, []).map((geography) => {
          const continent = get(continentsDict, geography.continent);
          return {
            ...geography,
            continent,
            hasContinent: Boolean(continent)
          }
        });
        return {
          ...acc,
          [type.uid]: list,
        };
      }, {});
      store.set(geographies);
    },
  };
})();

export const SCENARIOS = (() => {
  const store = writable([]);
  return {
    ...store,
    set: (scenariosRaw) => {
      // Processing of scenario data so we only have to do this once
      const scenarios = scenariosRaw.map((scenarioRaw) => {
        const scenario = { ...scenarioRaw };
        SCENARIO_DATA_KEYS.forEach((key) => {
          const { data, yearStart, yearStep } = get(
            scenarioRaw,
            ['scenarioData', key],
            {}
          );
          if (data && yearStart && yearStep) {
            scenario[key] = data.map((value, i) => ({
              value,
              year: yearStart + yearStep * i,
            }));
          }
        });
        return scenario;
      });

      store.set(scenarios);
    },
  };
})();

export const DICTIONARY_SCENARIOS = derived(SCENARIOS, ($scenarios) =>
  keyBy($scenarios, 'uid')
);

export const SECTORS = writable([]);

export const INDICATORS = (() => {
  const store = writable([]);
  return {
    ...store,
    set: ({ indicators: indicatorsRaw, units }) => {
      const indicators = indicatorsRaw.map((indicator) => {
        return {
          ...indicator,
          unit: units.find((unit) => unit.uid === indicator.unit) || {
            uid: indicator.unit,
            label: indicator.unit,
          },
        };
      });
      store.set(indicators);
    },
  };
})();

export const DICTIONARY_INDICATORS = derived(INDICATORS, ($indicators) =>
  keyBy($indicators, 'uid')
);

export const INDICATOR_PARAMETERS = writable([]);
export const DICTIONARY_INDICATOR_PARAMETERS = derived(
  INDICATOR_PARAMETERS,
  ($parameters) => keyBy($parameters, 'uid')
);

/* GEOGRAPHY STATE */
export const CURRENT_GEOGRAPHY_TYPE_INDEX = writable(0);

export const CURRENT_GEOGRAPHY_TYPE = derived(
  [CURRENT_GEOGRAPHY_TYPE_INDEX, GEOGRAPHY_TYPES],
  ([$index, $types]) => get($types, [$index])
);

// Geographies of the currently selected geography type tab
export const CURRENT_GEOGRAPHIES = derived(
  [GEOGRAPHIES, CURRENT_GEOGRAPHY_TYPE],
  ([$geographies, $currentGeographyType]) =>
    $geographies[$currentGeographyType.uid]
);

export const CURRENT_GEOGRAPHY_UID = writable('DEU');

export const CURRENT_GEOGRAPHY = derived(CURRENT_GEOGRAPHY_UID, ($uid, set) => {
  // We don't want this store to update when CURRENT_GEOGRAPHIES changes, so we only get
  // it's value once CURRENT_GEOGRAPHY_UID changes
  const geography = getStore(CURRENT_GEOGRAPHIES).find(
    (geography) => geography.uid === $uid
  );
  set(geography);
});

export const CURRENT_IMPACT_GEO_YEAR_UID = writable('2030');

/* SCENARIO STATE */
export const CURRENT_SCENARIOS_UID = writable(['sp']); // Currently selected scenarios (not hovered1)

export const CURRENT_SCENARIOS = derived(
  [CURRENT_SCENARIOS_UID, DICTIONARY_SCENARIOS, THEME],
  ([$uids, $scenarios, $theme]) =>
    $uids.map((uid, i) => ({
      ...$scenarios[uid],
      color: $theme.color.scenarios[i],
    }))
);
export const DICTIONARY_CURRENT_SCENARIOS = derived(
  [CURRENT_SCENARIOS],
  ([$currentScenarios]) => keyBy($currentScenarios, 'uid')
);

/* INDICATOR STATE */
// We are using Index here because Tabs and TabContent
export const AVAILABLE_INDICATORS = derived(
  [CURRENT_GEOGRAPHY_TYPE, DICTIONARY_INDICATORS],
  ([$type, $indicators]) => {
    return compact(
      get($type, 'availableIndicators', []).map((indicator) => {
        const item = get($indicators, indicator);
        if (isUndefined(item)) {
          if (!isEmpty($indicators)) {
            // TODO: Check for null?
            console.warn(`Indicator with id ${indicator} was not found.`);
          }
          return null;
        }
        return item;
      })
    );
  }
);

export const CURRENT_INDICATOR_UID = writable('mean-temperature');

export const CURRENT_INDICATOR = derived(
  [CURRENT_INDICATOR_UID, DICTIONARY_INDICATORS],
  ([$uid, $indicators]) => $indicators[$uid]
);

export const CURRENT_INDICATOR_UNIT = derived(CURRENT_INDICATOR, ($indicator) =>
  get($indicator, ['unit'])
);

export const CURRENT_INDICATOR_UNIT_UID = derived(
  CURRENT_INDICATOR_UNIT,
  ($unit) => get($unit, 'uid', DEFAULT_FORMAT_UID)
);

// Array of available parameters for currently selected indicator
export const CURRENT_INDICATOR_PARAMETERS = derived(
  [CURRENT_INDICATOR, INDICATOR_PARAMETERS],
  ([$indicator, $parameters]) => {
    const indicatorParameters = map($indicator.parameters, ([def], key) =>
      $parameters.find(({ uid }) => uid === key)
    );

    const defaultValues = reduce(
      $indicator.parameters,
      (acc, [def], key) => ({ ...acc, [key]: def }),
      {}
    );
    // Updating the current option selection with the default values, in case they were not present for the previous indicator
    CURRENT_INDICATOR_OPTION_VALUES.update((old) => ({
      ...defaultValues,
      ...old,
    }));
    return indicatorParameters;
  }
);

// Key value store of currently selected parameters
export const CURRENT_INDICATOR_OPTION_VALUES = writable({});

// Key value store of full parameter objects
export const CURRENT_INDICATOR_OPTIONS = derived(
  [CURRENT_INDICATOR_OPTION_VALUES, DICTIONARY_INDICATOR_PARAMETERS],
  ([$currentOptions, $parameters]) =>
    reduce(
      $currentOptions,
      (acc, value, key) => {
        acc[key] = $parameters[key].options.find(
          (option) => option.value === value
        );
        return acc;
      },
      {}
    )
);

// Utility for quicker access to list of indicator parameters
export const CURRENT_INDICATOR_PARAMETERS_KEYS = derived(
  CURRENT_INDICATOR_PARAMETERS,
  ($options) => {
    return $options.map((indicator) => get(indicator, 'uid'));
  }
);

/* UTILITY N STUFF */
// Utility boolean to see if all the main parameters are selected
export const ALL_PARAMETERS_SELECTED = derived(
  [CURRENT_GEOGRAPHY, CURRENT_SCENARIOS, CURRENT_INDICATOR],
  ([geography, scenarios, indicator]) =>
    geography && scenarios.length && indicator
);
