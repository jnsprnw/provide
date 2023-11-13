import { page } from '$app/stores';
import { UID_STUDY_LOCATION_AVERAGE } from '$config';
import { get, keyBy, uniq, without, sortBy } from 'lodash-es';
import { derived } from 'svelte/store';

// META DATA (This will only be set once on load and won't change again)
export const GEOGRAPHY_TYPES = derived(page, ($page) =>
  sortBy(
    ($page.data?.meta?.geographyTypes ?? []).map((t) => ({ ...t, disabled: !(t.isAvailable && t.availableIndicators.length) })),
    [
      (t) => t.disabled, // This sorts the available types first
      (t) => t.availableIndicators.length,
      (t) => t.order,
      (t) => t.label,
    ]
  )
);

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
  return $page.data?.meta?.scenarios ?? [];
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

export const LIKELIHOODS = derived(page, ($page) => {
  return $page.data?.meta?.likelihoods ?? [];
});

export const STUDY_LOCATIONS = derived(page, ($page) => {
  const locations = sortBy(
    ($page.data?.meta?.studyLocations ?? []).map((location, i) => {
      const isAverage = location.uid === UID_STUDY_LOCATION_AVERAGE;
      return {
        ...location,
        order: location.order ?? i,
        isAverage,
      };
    }),
    ['order']
  );
  // In order to number the values correctly (without the city average and starting from 1), we need to create a new
  let o = 1;
  return locations.map((location) => ({ ...location, order: location.uid === UID_STUDY_LOCATION_AVERAGE ? 0 : o++ }));
});
