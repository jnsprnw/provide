import { writable, derived, get } from 'svelte/store';
import { getLocalStorage, setLocalStorage } from './utils.js';
import { isString } from 'lodash-es';
import { browser } from '$app/environment';
import { LOCALSTORE_LIKELIHOOD, LOCALSTORE_STUDY_LOCATION, LOCALSTORE_LEVEL_OF_IMACT, PATH_AVOID } from '$config';
import { LIKELIHOODS, STUDY_LOCATIONS } from './meta.js';
import { CURRENT_PAGE } from '$stores/state';
import { formatValue } from '$lib/utils/formatting';

function checkValidValue(list, value) {
  if (Array.isArray(list) && list.length && list.findIndex(({ uid }) => uid === value) === -1) {
    return false;
  }
  return true;
}

function checkValidLikelihood(list, value = get(SELECTED_LIKELIHOOD_LEVEL)) {
  const isValid = checkValidValue(list, value);
  if (!isValid) {
    const newValue = list[0]?.uid;
    SELECTED_LIKELIHOOD_LEVEL.set(newValue);
    console.warn(`Likelihood level has an invalid value. Will reset to default value ${newValue}.`);
  }
  return isValid;
}

export const SELECTED_LIKELIHOOD_LEVEL = writable(getLocalStorage(LOCALSTORE_LIKELIHOOD, 'likely'));
SELECTED_LIKELIHOOD_LEVEL.subscribe((value) => {
  if (browser && checkValidLikelihood(get(LIKELIHOODS), value)) {
    console.log('LOCALSTORE_LIKELIHOOD', value);
    setLocalStorage(LOCALSTORE_LIKELIHOOD, value);
  }
});
if (browser) {
  LIKELIHOODS.subscribe((list) => {
    checkValidLikelihood(list);
  });
}

export const SELECTED_LIKELIHOOD_LEVEL_LABEL = derived([SELECTED_LIKELIHOOD_LEVEL, LIKELIHOODS], ([$current, $all]) => {
  const level = $all.find(({ uid }) => uid === $current);
  if (level) {
    return formatValue(level.value, 'percent') ?? level.label ?? level.uid;
  } else {
    return $current;
  }
});

function checkValidStudyLocation(list, value = get(SELECTED_STUDY_LOCATION)) {
  const isValid = checkValidValue(list, value);
  if (!isValid) {
    const newValue = list[0]?.uid;
    SELECTED_STUDY_LOCATION.set(newValue);
    console.warn(`Study location has an invalid value. Will reset to default value ${newValue}.`);
    return false;
  }
  return isValid;
}

export const SELECTED_STUDY_LOCATION = writable(getLocalStorage(LOCALSTORE_STUDY_LOCATION, 'city-average'));
SELECTED_STUDY_LOCATION.subscribe((value) => {
  if (browser && checkValidStudyLocation(get(STUDY_LOCATIONS), value)) {
    console.log('LOCALSTORE_STUDY_LOCATION', value);
    setLocalStorage(LOCALSTORE_STUDY_LOCATION, value);
  }
});
if (browser) {
  STUDY_LOCATIONS.subscribe((list) => {
    checkValidStudyLocation(list);
  });
}

export const LEVEL_OF_IMPACT_ARRAY = writable(
  getLocalStorage(LOCALSTORE_LEVEL_OF_IMACT, [], (v) => {
    let value = [];
    if (Boolean(v) && isString(value) && value.trim() !== '') {
      try {
        const json = JSON.parse(v);
        if (Array.isArray(json) && json.length === 1) {
          value = json;
        }
      } catch (e) {
        console.log('Error loading current scenarios from localstore:', e);
      }
    }
    return value;
  })
);
LEVEL_OF_IMPACT_ARRAY.subscribe((value) => {
  setLocalStorage(LOCALSTORE_LEVEL_OF_IMACT, JSON.stringify(value));
});

export const LEVEL_OF_IMPACT = writable(0);

export const IS_EMPTY_LEVEL_OF_IMPACT = derived(LEVEL_OF_IMPACT, ($value) => typeof $value === 'undefined');
export const IS_EMPTY_LIKELIHOOD_LEVEL = derived(SELECTED_LIKELIHOOD_LEVEL, ($value) => !Boolean($value));

export const IS_INVALID_AVOID_PARAMETERS = derived([CURRENT_PAGE, IS_EMPTY_LEVEL_OF_IMPACT, IS_EMPTY_LIKELIHOOD_LEVEL], ([$page, $impact, $likelihood]) => {
  return $page === PATH_AVOID && ($impact || $likelihood);
});
