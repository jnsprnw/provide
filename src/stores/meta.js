import { page } from '$app/stores';
import { SCENARIO_DATA_KEYS } from '$src/config.js';
import { get, keyBy, uniq, without } from 'lodash-es';
import { derived } from 'svelte/store';

// META DATA (This will only be set once on load and won't change again)
export const GEOGRAPHY_TYPES = derived(page, ($page) => $page.data?.meta?.geographyTypes ?? []);

export const GEOGRAPHIES = derived(page, ($page) => {
  // Extract the geography types and its data from the data provided by the load function
  const { geographyTypes, ...meta } = $page.data?.meta ?? {};
  if (geographyTypes.length) {
    const geographies = geographyTypes.map(({ uid }) => {
      // Find the array of geographies for this geography type in the meta endpoint
      const geographiesOfType = get(meta, uid, []).map((d) => ({
        ...d,
        geographyType: uid, // Add the geography type to each geography in the array
      }));
      return [uid, geographiesOfType]; // Return id and array to create object from it
    });
    return Object.fromEntries(geographies); // Create object of the geography types and geographies
  } else {
    return {};
  }
});

export const SCENARIOS = derived(page, ($page) => {
  const scenarios = ($page.data?.meta?.scenarios ?? []).map((scenarioRaw) => {
    const scenario = {
      ...scenarioRaw,
      endYear: scenarioRaw.timeframe[1],
    };
    SCENARIO_DATA_KEYS.forEach((key) => {
      const { data, yearStart, yearStep } = scenarioRaw[key];
      // Some scenarios have no emissions data (data[0] = null)
      if (data) {
        const seriesData = data.map((datum, i) => {
          const hasRange = datum.length > 1;
          return {
            year: yearStart + yearStep * i,
            value: hasRange ? datum[1] : datum,
            min: hasRange && datum[0],
            max: hasRange && datum[2],
          };
        });
        scenario[key] = seriesData;
      } else {
        scenario[key] = null;
      }
    });
    return scenario;
  });
  return scenarios;
});

export const DICTIONARY_SCENARIOS = derived(SCENARIOS, ($scenarios) => keyBy($scenarios, 'uid'));

export const SECTORS = derived(page, ($page) => $page.data?.meta?.sectors ?? []);

export const INDICATORS = derived(page, ($page) => {
  const { indicators, units, sectors } = $page.data?.meta ?? {
    indicators: [],
  };
  return indicators.map((indicator) => {
    const sector = sectors.find((s) => s.uid === indicator.sector);
    const unit = units.find((unit) => unit.uid === indicator.unit) || {
      uid: indicator.unit,
      label: indicator.unit,
    };
    const availableGeographies = uniq([...sector.availableGeographies, ...indicator.availableGeographies]);
    const availableScenarios = without(uniq([...sector.availableScenarios, ...indicator.availableScenarios]), ...(indicator.excludedScenarios ?? []));

    return {
      ...indicator,
      availableScenarios,
      availableGeographies,
      unit,
    };
  });
});

export const DICTIONARY_INDICATORS = derived(INDICATORS, ($indicators) => keyBy($indicators, 'uid'));

export const INDICATOR_PARAMETERS = derived(page, ($page) => $page.data?.meta?.indicatorParameters ?? []);
export const DICTIONARY_INDICATOR_PARAMETERS = derived(INDICATOR_PARAMETERS, ($parameters) => keyBy($parameters, 'uid'));

export const UNITS = derived(page, ($page) => {
  const units = $page.data?.meta?.units ?? [];
  if (units.length) {
    return keyBy(units, 'uid');
  } else {
    return {};
  }
});
