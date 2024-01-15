import { formatReadableList } from '$lib/utils.js';
import {
  DEFAULT_FORMAT_UID,
  GEOGRAPHY_TYPES_IN_AVOIDING_IMPACTS,
  LOCALSTORE_PARAMETERS,
  PATH_AVOID,
  URL_PATH_TIME,
  URL_PATH_REFERENCE,
  URL_PATH_FREQUENCY,
  URL_PATH_SPATIAL,
  URL_PATH_INDICATOR_VALUE,
} from '$config';
import THEME from '$styles/theme-store.js';
import { interpolateLab, piecewise } from 'd3-interpolate';
import _, { every, get, keyBy, map, reduce, without, isEqual, isString } from 'lodash-es';
import { derived, get as getStore, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getLocalStorage, setLocalStorage, getAllLocalStorage } from './utils.js';
import { extractTimeframesFromScenarios } from '$lib/utils.js';
import { extractTimeframe } from '$utils/meta.js';

import { DEFAULT_GEOGRAPHY_UID, DEFAULT_SCENARIOS_UID, MAX_NUMBER_SELECTABLE_SCENARIOS, LOCALSTORE_INDICATOR, LOCALSTORE_GEOGRAPHY, LOCALSTORE_SCENARIOS } from '../config.js';
import { GEOGRAPHY_TYPES, INDICATORS, SECTORS, DICTIONARY_INDICATOR_PARAMETERS, DICTIONARY_INDICATORS, DICTIONARY_SCENARIOS, GEOGRAPHIES, INDICATOR_PARAMETERS, SCENARIOS } from './meta.js';

// Set to true if is in embed mode e.g. if the url is /embed/something
export const IS_EMBEDED = writable(false);

// Set to true for generating screenshots when we don't want
// to display controls n stuff, derived from &static=true url parameter
export const IS_STATIC = writable(false);

export const CURRENT_PAGE = writable('/');

/*
 * GEOGRAPHY STATE
 */

/**
 * Derived store that uses the list of geography types defined in the meta store and the current page to determine the list of available types
 * @type {Readable<Object[]>}
 */
export const AVAILABLE_GEOGRAPHY_TYPES = derived([GEOGRAPHY_TYPES, CURRENT_PAGE], ([$types, $currentPage]) => {
  return $types.map((t) => {
    // It could be disabled by the meta endpoint
    const disabledByEndpoint = t.disabled;
    // By default no type is disabled
    let disabledByMode = false;
    // Check specifically for the avoid mode
    if ($currentPage === PATH_AVOID) {
      // Check if the type is present in the list of allowed types
      disabledByMode = !GEOGRAPHY_TYPES_IN_AVOIDING_IMPACTS.includes(t.uid);
    }
    // The tooltip is different if the type is disabled by the endpoint of specifically by this mode (avoid)
    const tooltip = disabledByEndpoint ? 'Geography type is not available' : disabledByMode ? 'Switch to the Future impacts mode to see impact projections for this geography type' : undefined;
    return {
      ...t,
      disabled: disabledByEndpoint ? true : disabledByMode,
      tooltip,
    };
  });
});

/**
 * Derived store that filters the disabled geography types
 * @type {Readable<Object[]>}
 */
export const SELECTABLE_GEOGRAPHY_TYPES = derived(AVAILABLE_GEOGRAPHY_TYPES, ($types) => {
  return $types.filter(({ disabled }) => !disabled);
});

/**
 * Writable store that holds the uid of the currently selected geography.
 * Upon loading it checks the localstore. If fallbacks to a default value.
 * @type {Writable<number>}
 */
export const CURRENT_GEOGRAPHY_UID = writable(getLocalStorage(LOCALSTORE_GEOGRAPHY, DEFAULT_GEOGRAPHY_UID));
// Listen to the store to update the localstorage on change.
CURRENT_GEOGRAPHY_UID.subscribe((value) => {
  setLocalStorage(LOCALSTORE_GEOGRAPHY, value);
});

/**
 * Derived store that filters the disabled geography types
 * @type {Readable<Object|undefined>}
 */
export const CURRENT_GEOGRAPHY = derived([CURRENT_GEOGRAPHY_UID, SELECTABLE_GEOGRAPHY_TYPES, GEOGRAPHIES], ([$uid, $selectableGeographyTypes, $geographies], set) => {
  if (typeof $uid === 'undefined') {
    set(undefined);
  } else {
    let geography;
    // This loops over every selectable geography type and searches for the currently selected geography uid
    // We use the `every` loop to quit if we found it
    $selectableGeographyTypes.every(({ uid: type }) => {
      // Get the list of geographies for this type
      const list = $geographies[type];
      if (typeof list === 'undefined') {
        console.warn(`Geography type ${type} from meta does not match. Could not find any geographies.`);
      }
      // Check if the currently selected uid can be found in the
      geography = (list ?? []).find(({ uid }) => uid === $uid);
      if (geography) {
        return false; // A geography was found so we quit the loop
      }
      return true; // Return true to continue the loop
    });
    // If the geography could not be found
    if (typeof geography === 'undefined') {
      console.warn(`Could not find any geography from uid ‘${$uid}’ given the current set of geography types.`);
      if (typeof $uid !== 'undefined') {
        // Set the geography uid to undefined to reset the selection
        CURRENT_GEOGRAPHY_UID.set(undefined);
      }
    }
    // Set the geography. This can also be undefined if no geography was found.
    set(geography);
  }
});

export const CURRENT_GEOGRAPHY_LABEL = derived(CURRENT_GEOGRAPHY, ($geography) => {
  return $geography?.label;
});

/**
 * Derived store that checks if a geography is selected
 * @type {Readable<Boolean>}
 */
export const IS_EMPTY_GEOGRAPHY = derived(CURRENT_GEOGRAPHY, ($geography) => {
  return !Boolean($geography);
});

/**
 * Derived store that holds the current geography type
 * @type {Readable<Object|undefined>}
 */
export const CURRENT_GEOGRAPHY_TYPE = derived([CURRENT_GEOGRAPHY, SELECTABLE_GEOGRAPHY_TYPES], ([$currentGeography, $geographyTypes]) => {
  if (typeof $currentGeography === 'undefined') {
    // This can happen for example if the user
    // - has a geography in localstorage and than visits the avoiding impacts page that does not have all geographies available.
    // - has selected an invalid geography through links
    return undefined;
  }
  const { geographyType: uid } = $currentGeography;
  if (typeof uid === 'undefined') {
    // If – for some reason – the geography has no geography type
    console.warn(`Could not determine geography type from current geography.`);
    return undefined;
  }
  const geographyType = $geographyTypes.find((type) => type.uid === uid);
  if (typeof geographyType === 'undefined') {
    // If the geography types do not include the current geography
    console.warn(`Could not find any geography type for uid ${uid}.`);
    return undefined;
  }
  return geographyType;
});

/**
 * Derived store that lists the available geographies
 * @type {Readable<Object[]>}
 */
export const AVAILABLE_GEOGOGRAPHIES = derived([GEOGRAPHIES, CURRENT_GEOGRAPHY_TYPE], ([$geographies, $currentGeographyType]) => {
  const { uid } = $currentGeographyType;
  const geographies = $geographies[uid];
  if (typeof geographies === 'undefined') {
    console.warn(`Could not find any geographies for type ${uid}.`);
  }
  return geographies ?? [];
});

/*
 * INDICATOR STATE
 */

/**
 * Derived store that holds a list of available indicators based on the geography type
 * @type {Readable<Object[]>}
 */
export const AVAILABLE_INDICATORS = derived([INDICATORS, CURRENT_GEOGRAPHY_TYPE], ([$indicators, $type]) => {
  // Geography types have specific indicators available
  const list = get($type, 'availableIndicators', []);
  // Filter the list of indicators if they are included for the current geography
  const indicators = $indicators.filter(({ uid }) => list.includes(uid));

  // The list of indicators should match the list of available indicators
  if (indicators.length !== list.length) {
    // If this is not the case, some indicators that are present in the list of the geography type are not actually available
    // There is nothing wrong about this per se. But it can still be an mistake that the lists are outdated.
    const missing = without(list, ...indicators.map(({ uid }) => uid));
    console.warn(`Amount of potentially available indicators does not match listed amount of indicators. Missing indicators: ${missing.join(', ')}`);
  }
  return indicators.sort((a, b) => a.label.localeCompare(b.label));
});

export const SELECTABLE_SECTORS = derived([SECTORS, AVAILABLE_INDICATORS], ([$sectors, $indicators]) => {
  return $sectors.map(({ uid, label }) => {
    const indicators = $indicators.filter(({ sector: sectorUID }) => sectorUID === uid);
    return {
      label,
      uid,
      indicators,
      amount: indicators.length,
      disabled: !indicators.length,
      count: indicators.length,
    };
  });
});

export const CURRENT_INDICATOR_UID = writable(getLocalStorage(LOCALSTORE_INDICATOR, undefined));

export const IS_EMPTY_INDICATOR = derived(CURRENT_INDICATOR_UID, ($uid) => {
  return !Boolean($uid);
});

export const IS_COMBINATION_AVAILABLE_INDICATOR = derived([CURRENT_INDICATOR_UID, AVAILABLE_INDICATORS], ([$uid, $validIndicators]) => {
  // This checks if the currently selected indicator is valid given the list of valid indicators
  if (typeof $uid === 'undefined') {
    setLocalStorage(LOCALSTORE_INDICATOR, undefined);
    return false; // TODO: Check what to do here.
  }
  const isValidIndicator = $validIndicators.map(({ uid }) => uid).includes($uid);
  if (isValidIndicator) {
    // Only save to localstorage if valid indicator
    setLocalStorage(LOCALSTORE_INDICATOR, $uid);
  } else {
    setLocalStorage(LOCALSTORE_INDICATOR, undefined);
  }
  return isValidIndicator;
});

export const CURRENT_INDICATOR = derived([CURRENT_INDICATOR_UID, DICTIONARY_INDICATORS], ([$uid, $indicators]) => get($indicators, $uid));

export const CURRENT_INDICATOR_UNIT = derived(CURRENT_INDICATOR, ($indicator) => get($indicator, ['unit']));

export const CURRENT_INDICATOR_UNIT_UID = derived(CURRENT_INDICATOR_UNIT, ($unit) => get($unit, 'uid', DEFAULT_FORMAT_UID));

const LOCALSTORE_PARAMETER_PREFIX = `${LOCALSTORE_PARAMETERS}-`;

function getAllLocalStorageForParameters() {
  // This gets all values in the local storage and then filters out the one relevant for the parameters
  const list = getAllLocalStorage().filter(([key]) => key.startsWith(LOCALSTORE_PARAMETER_PREFIX));
  // This loops over the values, extracts the actual key and the value.
  // This allows false entries to be made, but we clean them up later when we have a the list of possible values from INDICATOR_PARAMETERS
  return Object.fromEntries(list.map(([key, value]) => [key.replace(LOCALSTORE_PARAMETER_PREFIX, ''), value]));
}

// Key value store of currently selected parameters
// The initial lookup in the localstorage might get too many parameters as we can only filter out irrelevant parameters when we know the indicator
export const CURRENT_INDICATOR_OPTION_VALUES = writable(getAllLocalStorageForParameters());
CURRENT_INDICATOR_OPTION_VALUES.subscribe((obj) => {
  // This loops over the parameter object …
  Object.entries(obj).forEach(([key, value]) => {
    // and stores all values with a prefix in the local storage
    setLocalStorage(`${LOCALSTORE_PARAMETER_PREFIX}${key}`, value);
  });
});

// Array of available parameters for currently selected indicator
// This list is based on the current indicator and the generally available parameters
export const CURRENT_INDICATOR_PARAMETERS = derived([CURRENT_INDICATOR, INDICATOR_PARAMETERS], ([$indicator, $parameters]) => {
  // This builds a list of all indicator parameter (with label, uid and options) that are available for this indicator
  // It is based on the parameters provided by the indicator
  // And then enriched by the label and options labels provided by the meta endpoint
  const indicatorParameters = map($indicator?.parameters ?? {}, (optionsAvailableForIndicator, key) => {
    // Search for the parameter in the list from the meta endpoint
    const parameter = $parameters.find(({ uid }) => uid === key);
    let options = [];
    // If this parameter is present in the meta endpoint
    if (![URL_PATH_TIME, URL_PATH_REFERENCE, URL_PATH_FREQUENCY, URL_PATH_SPATIAL, URL_PATH_INDICATOR_VALUE].includes(key)) {
      console.warn(`Unknown indicator parameter ${key}. This might cause problems.`);
    }
    if (parameter && parameter.hasOwnProperty('options') && Array.isArray(parameter.options)) {
      // Not all options are available for each indicator. So we need to filter out some options.
      options = parameter.options.filter(({ uid }) => optionsAvailableForIndicator.includes(uid));
    } else {
      // If the indicator is not present in the meta endpoint, we can still use it by creating options manually
      console.warn(`Indicator has parameter ${key} that is not defined in meta configuration.`);
      // Both label and uid is the same here
      options = optionsAvailableForIndicator.map((option) => ({ label: option, uid: option }));
    }
    return {
      uid: key,
      label: parameter?.label ?? key, // Use the key if no label is present
      options,
    };
  });

  // This builds a list of default values for this indicator by taking the first value from the possible options
  let defaultValues = reduce($indicator?.parameters ?? {}, (acc, [def], key) => ({ ...acc, [key]: def }), {});

  // Updating the current option selection with the default values, in case they were not present for the previous indicator
  CURRENT_INDICATOR_OPTION_VALUES.update((previousValues) => {
    // We want to keep the old values, but only if these values are valid values for the current indicator
    const previousValidValues = [];
    Object.entries(previousValues ?? {}).forEach(([key, value]) => {
      // We try to find a list of possible values for the parameter
      const possibleValuesForThisIndicator = $indicator?.parameters?.[key];
      if (Array.isArray(possibleValuesForThisIndicator)) {
        // If the parameter is preset in the current indicator
        if (possibleValuesForThisIndicator.includes(value)) {
          // If the old value is included in the list, we add it
          previousValidValues.push([key, value]);
        }
        // We don’t need to do anything if it is not includes, since this is handled by the default values further down
      } else {
        // We want to keep the old values that are not present in the current indicator, because the user might switch back and wants to keep the selected value
        const possibleParameter = $parameters.find(({ uid }) => uid === key);
        if (possibleParameter && (possibleParameter?.options ?? []).find(({ uid }) => uid === value)) {
          // We only want to keep it, if it’s present in the general list of possible parameters
          previousValidValues.push([key, value]);
        } else {
          // We do some clean up and remove this parameter from the local storage
          console.warn(`The entry ${LOCALSTORE_PARAMETER_PREFIX}${key} was removed from the localStorage.`);
          setLocalStorage(`${LOCALSTORE_PARAMETER_PREFIX}${key}`, undefined);
        }
      }
    });
    return {
      ...defaultValues,
      ...Object.fromEntries(previousValidValues),
    };
  });

  return indicatorParameters;
});

// export const CURRENT_GEOGRAPHY_UID = writable(getLocalStorage(LOCALSTORE_GEOGRAPHY, DEFAULT_GEOGRAPHY_UID));

// Key value store of full parameter objects
export const CURRENT_INDICATOR_OPTIONS = derived([CURRENT_INDICATOR_OPTION_VALUES, DICTIONARY_INDICATOR_PARAMETERS], ([$currentOptions, $parameters]) => {
  return reduce(
    $currentOptions,
    (acc, uid, key) => {
      acc[key] = $parameters[key].options.find((option) => option.uid === uid);
      return acc;
    },
    {}
  );
});

export const CURRENT_INDICATOR_LABEL = derived([CURRENT_INDICATOR, CURRENT_INDICATOR_OPTIONS], ([$indicator, $options]) => {
  // This function is used to replace the X for example in 'nights a year with minimum temperatures above X°C'
  let label = get($indicator, ['labelWithinSentence']); // This is the regular label we use
  // Check if the current options hold an indicator value and if the indicator has the indicator value option
  if ($options.hasOwnProperty('indicator_value') && $indicator?.parameters.indicator_value?.length) {
    // Check if there is a X°C in the label
    if (label.match(/X°C/)) {
      // Replace the part with the label from the options
      label = label.replace(/X°C/, $options.indicator_value.label);
    }
  }
  return label;
});

// Utility for quicker access to list of indicator parameters
export const CURRENT_INDICATOR_PARAMETERS_KEYS = derived(CURRENT_INDICATOR_PARAMETERS, ($options) => {
  return $options.map((indicator) => get(indicator, 'uid'));
});

/*
 * SCENARIO STATE
 */

export const CURRENT_SCENARIOS_UID = (() => {
  const { subscribe, set, update } = writable(
    getLocalStorage(LOCALSTORE_SCENARIOS, DEFAULT_SCENARIOS_UID, (v) => {
      let value = DEFAULT_SCENARIOS_UID;
      if (Boolean(v) && isString(value) && value.trim() !== '') {
        try {
          const json = JSON.parse(v);
          if (Array.isArray(json)) {
            if (json.length > MAX_NUMBER_SELECTABLE_SCENARIOS) {
              console.warn('Too many scenarios selected.');
            }
            value = json.sort().slice(0, MAX_NUMBER_SELECTABLE_SCENARIOS);
          }
        } catch (e) {
          console.log('Error loading current scenarios from localstore:', e);
        }
      }

      return value;
    })
  );

  return {
    subscribe,
    update,
    set,
    toggle: (id, timeframe) =>
      update((selectedUids) => {
        if (selectedUids.length === 0) return [id]; // If there was no scenarios previously selected

        const availableScenarios = getStore(SELECTABLE_SCENARIOS);
        const availableScenariosUids = availableScenarios.map((d) => d.uid);
        // Make sure we only keep the scenarios that are actually available. Otherwise we might
        // prevent the selection of a new scenario if the three selected are not available
        const availableSelected = selectedUids.filter((uid) => availableScenariosUids.includes(uid));
        if (availableSelected.length === 0) return [id]; // If there was no available scenarios previously selected
        // Find current timeframe to see if the timeframe changed
        const scenarios = getStore(DICTIONARY_SCENARIOS);
        const currentTimeframe = extractTimeframe(scenarios[availableSelected[0]]);
        const timeframeChanged = currentTimeframe !== timeframe;
        // If timeframe changed we want to remove all the old scenarios
        if (timeframeChanged) return [id];

        // The default list
        let updatedList = availableSelected;
        // Check if the id is already in the array
        if (availableSelected.includes(id) && availableSelected.length > 1) {
          // Remove the id from the array
          updatedList = availableSelected.filter((selectedId) => selectedId !== id);
        } else if (!availableSelected.includes(id) && availableSelected.length < MAX_NUMBER_SELECTABLE_SCENARIOS) {
          // Add the id to the array if the limit is not reached
          updatedList = [...availableSelected, id];
        }
        // Sort the list of ids.
        // This allows to potentially reduce the number of requests because the same order can be handled by the cache.
        return updatedList.sort();
      }),
  };
})();
CURRENT_SCENARIOS_UID.subscribe((value) => {
  const scenarios = value.sort().slice(0, MAX_NUMBER_SELECTABLE_SCENARIOS);
  if (value.length > MAX_NUMBER_SELECTABLE_SCENARIOS) {
    console.warn(`Too many scenarios selected. Reset to ${MAX_NUMBER_SELECTABLE_SCENARIOS} scenarios.`);
    CURRENT_SCENARIOS_UID.set(scenarios);
  }
  setLocalStorage(LOCALSTORE_SCENARIOS, JSON.stringify(scenarios));
});

if (browser) {
  // This is necessary since CURRENT_INDICATOR depends on the page store (some levels down)
  // Because of this, we can not subscribe to it.
  // More information here: https://kit.svelte.dev/docs/state-management#avoid-shared-state-on-the-server
  CURRENT_INDICATOR.subscribe((indicator) => {
    const selectableScenarios = indicator?.availableScenarios ?? [];
    if (selectableScenarios.length) {
      // The list of available scenarios is empty at the first loading of the page. This should not result in filtering the list.
      const currentScenarios = getStore(CURRENT_SCENARIOS_UID) || [];
      const validScenarios = currentScenarios.filter((scenario) => selectableScenarios.includes(scenario));
      if (!isEqual(validScenarios, currentScenarios)) {
        console.warn(`Invalid scenario selected. Will reset.`);
        CURRENT_SCENARIOS_UID.set(validScenarios);
      }
    }
  });
}

export const CURRENT_SCENARIOS = derived([CURRENT_SCENARIOS_UID, DICTIONARY_SCENARIOS, THEME], ([$uids, $scenarios, $theme]) =>
  ($uids ?? []).map((uid, i) => ({
    ...$scenarios[uid],
    color: $theme.color.category.base[i],
    colorInterpolator: piecewise(interpolateLab, [$theme.color.category.weakest[i], $theme.color.category.base[i], $theme.color.category.strongest[i]]),
  }))
);

export const DICTIONARY_CURRENT_SCENARIOS = derived([CURRENT_SCENARIOS], ([$currentScenarios]) => keyBy($currentScenarios, 'uid'));

export const AVAILABLE_SCENARIOS = derived([SCENARIOS, CURRENT_INDICATOR], ([$SCENARIOS, $CURRENT_INDICATOR]) => {
  return $SCENARIOS.map((scenario) => {
    return {
      ...scenario,
      disabled: !get($CURRENT_INDICATOR, 'availableScenarios', []).includes(scenario.uid),
    };
  });
});

export const SELECTABLE_SCENARIOS = derived([AVAILABLE_SCENARIOS], ([$scenarios]) => {
  return $scenarios.filter(({ disabled }) => !disabled);
});

export const SELECTABLE_SCENARIOS_UID = derived(SELECTABLE_SCENARIOS, ($scenarios) => $scenarios.map(({ uid }) => uid));

export const AVAILABLE_TIMEFRAMES = derived([AVAILABLE_SCENARIOS, SELECTABLE_SCENARIOS], ([$available, $selectable]) => {
  return extractTimeframesFromScenarios($available ?? [], $selectable ?? []);
});

/* UTILITY N STUFF */
export const IS_EMPTY_SCENARIO = derived(CURRENT_SCENARIOS_UID, ($scenarios) => !Array.isArray($scenarios) || !$scenarios.length);

export const IS_EMPTY_SELECTION = derived([IS_EMPTY_GEOGRAPHY, IS_EMPTY_INDICATOR, IS_EMPTY_SCENARIO], ([$geography, $indicator, $scenario]) => $geography || $indicator || $scenario);

export const IS_COMBINATION_AVAILABLE_SCENARIO = derived(
  [SELECTABLE_SCENARIOS_UID, CURRENT_SCENARIOS_UID],
  ([$SELECTABLE_SCENARIOS, $CURRENT_SCENARIOS_UID]) =>
    Array.isArray($CURRENT_SCENARIOS_UID) && $CURRENT_SCENARIOS_UID.length && every($CURRENT_SCENARIOS_UID, (scenario) => $SELECTABLE_SCENARIOS.includes(scenario))
);

export const IS_COMBINATION_AVAILABLE = derived(
  [IS_COMBINATION_AVAILABLE_INDICATOR, IS_COMBINATION_AVAILABLE_SCENARIO],
  ([$indicatorAvailable, $scenariosAvailable]) => $indicatorAvailable && $scenariosAvailable
);

export const TEMPLATE_PROPS = derived(
  [CURRENT_GEOGRAPHY, CURRENT_INDICATOR, CURRENT_SCENARIOS, CURRENT_INDICATOR_OPTIONS, CURRENT_INDICATOR_UNIT, CURRENT_INDICATOR_LABEL],
  ([$CURRENT_GEOGRAPHY, $CURRENT_INDICATOR, $CURRENT_SCENARIOS, $CURRENT_INDICATOR_OPTIONS, $CURRENT_INDICATOR_UNIT, $currentIndicatorLabel]) => {
    return {
      scenarioList: formatReadableList($CURRENT_SCENARIOS, 'label'),
      geography: $CURRENT_GEOGRAPHY,
      indicator: $CURRENT_INDICATOR,
      scenarios: $CURRENT_SCENARIOS,
      indicatorOptions: $CURRENT_INDICATOR_OPTIONS,
      indicatorUnit: $CURRENT_INDICATOR_UNIT,
      indicatorLabel: $currentIndicatorLabel,
    };
  }
);

// export const URL_CURRENT = derived([CURRENT_GEOGRAPHY_UID, CURRENT_INDICATOR_UID, CURRENT_INDICATOR_OPTION_VALUES], ([$CURRENT_GEOGRAPHY, $CURRENT_INDICATOR, $CURRENT_INDICATOR_OPTION_VALUES]) => {
//   return $CURRENT_INDICATOR; // buildURL('impacts', { indicator: $CURRENT_INDICATOR, geography: $CURRENT_GEOGRAPHY });
// });

// Object holding the parameters that are needed in every data download request
// scenario are not included since scenarios are specified as individual requests
export const DOWNLOAD_URL_PARAMS = derived(
  [CURRENT_GEOGRAPHY_UID, CURRENT_INDICATOR_UID, CURRENT_INDICATOR_OPTION_VALUES],
  ([$CURRENT_GEOGRAPHY, $CURRENT_INDICATOR, $CURRENT_INDICATOR_OPTION_VALUES]) => ({
    geography: $CURRENT_GEOGRAPHY,
    indicator: $CURRENT_INDICATOR,
    ...$CURRENT_INDICATOR_OPTION_VALUES,
  })
);

// Object holding the parameters that are needed in every graph download request
export const GRAPH_URL_PARAMS = derived(
  [CURRENT_GEOGRAPHY_UID, CURRENT_INDICATOR_UID, CURRENT_SCENARIOS_UID, CURRENT_INDICATOR_OPTION_VALUES],
  ([$CURRENT_GEOGRAPHY, $CURRENT_INDICATOR, $CURRENT_SCENARIOS_UID, $CURRENT_INDICATOR_OPTION_VALUES]) => ({
    geography: $CURRENT_GEOGRAPHY,
    indicator: $CURRENT_INDICATOR,
    scenarios: $CURRENT_SCENARIOS_UID,
    ...$CURRENT_INDICATOR_OPTION_VALUES,
  })
);
