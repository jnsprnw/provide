import { DEFAULT_FORMAT_UID } from '$src/config.js';
import THEME from '$styles/theme-store.js';
import _, { every, get, keyBy, map, reduce } from 'lodash-es';
import { stringify } from 'qs';
import { derived, get as getStore, writable } from 'svelte/store';
import { interpolateLab, piecewise } from 'd3-interpolate';

import {
  DICTIONARY_INDICATOR_PARAMETERS,
  DICTIONARY_INDICATORS,
  DICTIONARY_SCENARIOS,
  GEOGRAPHIES,
  INDICATOR_PARAMETERS,
  SCENARIOS,
} from './meta.js';
import {
  DEFAULT_GEOGRAPHY_UID,
  DEFAULT_INDICATOR_UID,
  DEFAULT_SCENARIOS_UID,
} from '../config.js';

export const IS_EMBEDED = writable(false);

/*
 * INDICATOR STATE
 */
export const CURRENT_INDICATOR_UID = writable(DEFAULT_INDICATOR_UID);

export const CURRENT_INDICATOR = derived(
  [CURRENT_INDICATOR_UID, DICTIONARY_INDICATORS],
  ([$uid, $indicators]) => get($indicators, $uid)
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
    const indicatorParameters = map(
      $indicator?.parameters ?? {},
      ([def], key) => $parameters.find(({ uid }) => uid === key)
    );

    let defaultValues = reduce(
      $indicator?.parameters ?? {},
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
  ([$currentOptions, $parameters]) => {
    return reduce(
      $currentOptions,
      (acc, uid, key) => {
        acc[key] = $parameters[key].options.find(
          (option) => option.uid === uid
        );
        return acc;
      },
      {}
    );
  }
);

// Utility for quicker access to list of indicator parameters
export const CURRENT_INDICATOR_PARAMETERS_KEYS = derived(
  CURRENT_INDICATOR_PARAMETERS,
  ($options) => {
    return $options.map((indicator) => get(indicator, 'uid'));
  }
);

/*
 * GEOGRAPHY STATE
 */

export const AVAILABLE_GEOGOGRAPHIES = derived(
  [GEOGRAPHIES, CURRENT_INDICATOR],
  ([$GEOGRAPHIES, $CURRENT_INDICATOR]) => {
    return reduce(
      $GEOGRAPHIES,
      (acc, geographies) => {
        const availableGeographies = geographies.filter((geography) =>
          $CURRENT_INDICATOR.availableGeographies.includes(geography.uid)
        );
        return [...acc, ...availableGeographies];
      },
      []
    );
  }
);

export const CURRENT_GEOGRAPHY_UID = writable(DEFAULT_GEOGRAPHY_UID);

export const CURRENT_GEOGRAPHY = derived(CURRENT_GEOGRAPHY_UID, ($uid, set) => {
  // We don't want this store to update when CURRENT_GEOGRAPHIES changes, so we only get
  // it's value once CURRENT_GEOGRAPHY_UID changes
  const geography = (getStore(AVAILABLE_GEOGOGRAPHIES) || []).find(
    (geography) => geography?.uid === $uid
  );
  set(geography);
});

export const CURRENT_IMPACT_GEO_YEAR_UID = writable('2030');

/*
 * SCENARIO STATE
 */

export const CURRENT_SCENARIOS_UID = (() => {
  const { subscribe, set, update } = writable(DEFAULT_SCENARIOS_UID);

  return {
    subscribe,
    update,
    set,
    toggle: (id, timeframe) =>
      update((selectedUids) => {
        const scenarios = getStore(DICTIONARY_SCENARIOS);
        const availableScenarios = getStore(AVAILABLE_SCENARIOS);
        const availableScenariosUids = availableScenarios.map((d) => d.uid);
        // Make sure we only keep the scenarios that are actually available. Otherwise we might
        // prevent the selection of a new scenario if the three selected are not available
        const availableSelected = selectedUids.filter((uid) =>
          availableScenariosUids.includes(uid)
        );
        // Find current timeframe to see if the timeframe changed
        const currentTimeframe = scenarios[availableSelected[0]]?.timeframe[1];
        const timeframeChanged = currentTimeframe !== timeframe;
        // If timeframe changed we want to remove all the old scenarios
        if (timeframeChanged) return [id];

        // Check if the id is already in the array
        if (availableSelected.includes(id) && availableSelected.length > 1) {
          // Remove the id from the array
          return availableSelected.filter((selectedId) => selectedId !== id);
        } else if (
          !availableSelected.includes(id) &&
          availableSelected.length < 3
        ) {
          // Add the id to the array if the limit is not reached
          return [...availableSelected, id];
        } else {
          return availableSelected;
        }
      }),
  };
})();

export const CURRENT_SCENARIOS = derived(
  [CURRENT_SCENARIOS_UID, DICTIONARY_SCENARIOS, THEME],
  ([$uids, $scenarios, $theme]) =>
    $uids.map((uid, i) => ({
      ...$scenarios[uid],
      color: $theme.color.category.base[i],
      colorInterpolator: piecewise(interpolateLab, [
        $theme.color.category.weakest[i],
        $theme.color.category.base[i],
        $theme.color.category.strongest[i],
      ]),
    }))
);

export const DICTIONARY_CURRENT_SCENARIOS = derived(
  [CURRENT_SCENARIOS],
  ([$currentScenarios]) => keyBy($currentScenarios, 'uid')
);

export const AVAILABLE_SCENARIOS = derived(
  [SCENARIOS, CURRENT_INDICATOR],
  ([$SCENARIOS, $CURRENT_INDICATOR]) => {
    const availableScenarios = $SCENARIOS.filter((scenario) =>
      get($CURRENT_INDICATOR, 'availableScenarios', []).includes(scenario.uid)
    );

    return availableScenarios;
  }
);

export const AVAILABLE_TIMEFRAMES = derived(
  AVAILABLE_SCENARIOS,
  ($AVAILABLE_SCENARIOS) => {
    return _($AVAILABLE_SCENARIOS)
      .map((s) => s.endYear)
      .uniq()
      .sort()
      .map((uid) => ({ uid, label: uid }))
      .value();
  }
);

/* UTILITY N STUFF */
// Utility boolean to see if all the main parameters are selected
export const ALL_PARAMETERS_SELECTED = derived(
  [CURRENT_GEOGRAPHY, CURRENT_SCENARIOS, CURRENT_INDICATOR],
  ([geography, scenarios, indicator]) =>
    geography && scenarios.length && indicator
);

export const IS_COMBINATION_AVAILABLE = derived(
  [CURRENT_INDICATOR, CURRENT_GEOGRAPHY_UID, CURRENT_SCENARIOS_UID],
  ([$CURRENT_INDICATOR, $CURRENT_GEOGRAPHY_UID, $CURRENT_SCENARIOS_UID]) => {
    const geographyAvailable = $CURRENT_INDICATOR.availableGeographies.includes(
      $CURRENT_GEOGRAPHY_UID
    );
    const scenariosAvailable = every($CURRENT_SCENARIOS_UID, (scenario) =>
      $CURRENT_INDICATOR.availableScenarios.includes(scenario)
    );
    return geographyAvailable && scenariosAvailable;
  }
);

export const TEMPLATE_PROPS = derived(
  [
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR,
    CURRENT_SCENARIOS,
    CURRENT_INDICATOR_OPTIONS,
    CURRENT_INDICATOR_UNIT,
  ],
  ([
    $CURRENT_GEOGRAPHY,
    $CURRENT_INDICATOR,
    $CURRENT_SCENARIOS,
    $CURRENT_INDICATOR_OPTIONS,
    $CURRENT_INDICATOR_UNIT,
  ]) => {
    return {
      geography: $CURRENT_GEOGRAPHY,
      indicator: $CURRENT_INDICATOR,
      scenarios: $CURRENT_SCENARIOS,
      indicatorOptions: $CURRENT_INDICATOR_OPTIONS,
      indicatorUnit: $CURRENT_INDICATOR_UNIT,
    };
  }
);
export const URL = derived(
  [
    CURRENT_GEOGRAPHY_UID,
    CURRENT_INDICATOR_UID,
    CURRENT_SCENARIOS_UID,
    CURRENT_INDICATOR_OPTION_VALUES,
  ],
  ([
    $CURRENT_GEOGRAPHY,
    $CURRENT_INDICATOR,
    $CURRENT_SCENARIOS,
    $CURRENT_INDICATOR_OPTION_VALUES,
  ]) =>
    stringify({
      geography: $CURRENT_GEOGRAPHY,
      indicator: $CURRENT_INDICATOR,
      scenarios: $CURRENT_SCENARIOS,
      ...$CURRENT_INDICATOR_OPTION_VALUES,
    })
);
