import { page } from '$app/stores';
import { SCENARIO_DATA_KEYS } from '$src/config.js';
import {
  get,
  keyBy,
} from 'lodash-es';
import { derived } from 'svelte/store';

// META DATA (This will only be set once on load and won't change again)
export const GEOGRAPHY_TYPES = derived(
  page,
  ($page) => $page.data?.meta?.geographyTypes ?? {}
);

export const GEOGRAPHIES = derived(page, ($page) => {
  const { geographyTypes, continents, ...meta } = $page.data?.meta ?? {
    geographyTypes: [],
    continents: [],
  };
  if (geographyTypes.length && continents.length) {
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
    return geographies;
  } else {
    return {};
  }
});

export const SCENARIOS = derived(page, ($page) => {
  return ($page.data?.meta?.scenarios ?? []).map((scenarioRaw) => {
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
});

export const DICTIONARY_SCENARIOS = derived(SCENARIOS, ($scenarios) =>
  keyBy($scenarios, 'uid')
);

export const SECTORS = derived(
  page,
  ($page) => $page.data?.meta?.sectors ?? []
);

export const INDICATORS = derived(page, ($page) => {
  const { indicators: indicatorsRaw, units } = $page.data?.meta ?? {
    indicators: [],
  };
  return indicatorsRaw.map((indicator) => {
    return {
      ...indicator,
      unit: units.find((unit) => unit.uid === indicator.unit) || {
        uid: indicator.unit,
        label: indicator.unit,
      },
    };
  });
});

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

export const UNITS = derived(page, ($page) => {
  const units = $page.data?.meta?.units ?? [];
  if (units.length) {
    return keyBy(units, 'uid');
  } else {
    return {};
  }
});
