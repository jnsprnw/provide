import { writable, derived } from 'svelte/store';
import {
  get,
  compact,
  groupBy,
  keyBy,
  map,
  isUndefined,
  isEmpty,
} from 'lodash-es';
import { OPTIONS, DEFAULT_FORMAT_UID } from '$lib/../config.js';
import THEME from '$styles/theme-store.js';

// META DATA (This will only be set once on load and won't change again)
export const GEOGRAPHY_TYPES = writable({});

export const AVAILABLE_SCENARIOS = (() => {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    update,
    set: (scenariosRaw) => {
      // Processing of scenario data so we only have to do this once
      const scenarios = scenariosRaw.map((scenarioRaw) => {
        const scenario = { ...scenarioRaw };
        ['emissions', 'temperature'].map((key) => {
          const { data, yearStart, yearStep } = scenarioRaw.scenarioData[key];
          scenario[key] = data.map((value, i) => ({
            value,
            year: yearStart + yearStep * i,
          }));
        });
        return scenario;
      });

      set(scenarios);
    },
  };
})(); // TODO: Is prefix AVAILABLE_ good?

export const DICTIONARY_AVAILABLE_SCENARIOS = derived(
  AVAILABLE_SCENARIOS,
  ($scenarios) => keyBy($scenarios, 'uid')
);

export const SECTORS = writable([]);

export const DICTIONARY_SECTORS = derived(SECTORS, ($sectors) =>
  keyBy($sectors, 'uid')
);
export const INDICATORS = writable([]);

export const DICTIONARY_INDICATORS = derived(INDICATORS, ($indicators) =>
  keyBy($indicators, 'uid')
);

/* GEOGRAPHY STATE */
export const CURRENT_GEOGRAPHY = writable(null);

export const CURRENT_GEOGRAPHY_UID = derived(CURRENT_GEOGRAPHY, ($geography) =>
  get($geography, 'uid')
);

export const HOVER_GEOGRAPHY_UID = writable(null);

export const CURRENT_GEOGRAPHY_TYPE_INDEX = writable(0);

export const CURRENT_GEOGRAPHY_TYPE = derived(
  [CURRENT_GEOGRAPHY_TYPE_INDEX, GEOGRAPHY_TYPES],
  ([$index, $types]) => get($types, [$index])
);

/* SCENARIO STATE */
export const CURRENT_SCENARIOS_UID = writable([]); // Currently selected scenarios (not hovered1)

export const CURRENT_SCENARIOS = derived(
  [CURRENT_SCENARIOS_UID, DICTIONARY_AVAILABLE_SCENARIOS, THEME],
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

/* INDICATOR/SECTOR STATE */
// We are using Index here because Tabs and TabContent
export const CURRENT_SECTOR_INDEX = writable(0);

export const CURRENT_INDICATOR_UID = writable(null);

export const CURRENT_INDICATOR = derived(
  [CURRENT_INDICATOR_UID, DICTIONARY_INDICATORS],
  ([$uid, $indicators]) => $indicators[$uid]
);

export const CURRENT_INDICATOR_UNIT = derived(CURRENT_INDICATOR, ($indicator) =>
  get($indicator, 'unit', DEFAULT_FORMAT_UID)
);

export const CURRENT_INDICATOR_OPTIONS_SELECTION = writable({});

export const CURRENT_INDICATOR_OPTIONS = derived(
  CURRENT_INDICATOR,
  ($indicator) => {
    const defs = {};
    const list = compact(
      get($indicator, 'options', []).map(([option, def]) => {
        defs[option] = def; // Setting the default value;
        const options = get(OPTIONS, option);
        if (!options) {
          console.warn(
            `Option ${option} was not found. Please check the config file.`
          );
          return false;
        }
        return {
          key: option, // TODO: Maybe we should write that directly into the options so we safe some time here.
          ...options,
        };
      })
    );
    CURRENT_INDICATOR_OPTIONS_SELECTION.update((old) => ({ ...old, ...defs })); // Updating the current option selection with the default values.
    // TODO: Maybe we should overwrite the previously selection options with the new default values.
    return list;
  }
);

export const CURRENT_INDICATOR_OPTIONS_KEYS = derived(
  CURRENT_INDICATOR_OPTIONS,
  ($options) => $options.map((indicator) => get(indicator, 'key'))
);

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

export const AVAILABLE_INDICATOR_GROUPS = derived(
  [AVAILABLE_INDICATORS, SECTORS],
  ([$indicators, $sectors]) => {
    const groups = groupBy($indicators, 'sector');
    return $sectors.map((sector) => {
      const { uid } = sector;
      const indicators = get(groups, uid);
      return {
        sector,
        indicators,
        isAvailable: Boolean(indicators),
      };
    });
  }
);

/* UTILITY N STUFF */
// Utility boolean to see if all the main parameters are selected
export const ALL_PARAMETERS_SELECTED = derived(
  [CURRENT_GEOGRAPHY, CURRENT_SCENARIOS, CURRENT_INDICATOR],
  ([geography, scenarios, indicator]) =>
    geography && scenarios.length && indicator
);
