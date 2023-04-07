import { page } from '$app/stores';
import { SCENARIO_DATA_KEYS } from '$src/config.js';
import {
  get,
  keyBy,
} from 'lodash-es';
import {
  derived,
  writable,
} from 'svelte/store';

// META DATA (This will only be set once on load and won't change again)
export const GEOGRAPHY_TYPES = derived(
  page,
  ($page) => $page.data?.meta?.geographyTypes ?? {}
);
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
            hasContinent: Boolean(continent),
          };
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
          const { data, yearStart, yearStep, unit } = get(
            scenarioRaw,
            ['scenarioData', key],
            {}
          );
          if (data && yearStart && yearStep) {
            const datum = data.map((value, i) => ({
              value,
              year: yearStart + yearStep * i,
            }));
            scenario[key] = {
              data: datum,
              unit,
            };
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

export const SECTORS = derived(
  page,
  ($page) => $page.data?.meta?.sectors ?? []
);

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

export const INDICATOR_PARAMETERS = derived(
  page,
  ($page) => $page.data?.meta?.indicatorParameters ?? []
);
export const DICTIONARY_INDICATOR_PARAMETERS = derived(
  INDICATOR_PARAMETERS,
  ($parameters) => keyBy($parameters, 'uid')
);

export const UNITS = (() => {
  const store = writable();
  return {
    ...store,
    set: (units) => {
      store.set(keyBy(units, 'uid'));
    },
  };
})();
