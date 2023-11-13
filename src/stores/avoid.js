import { writable, derived } from 'svelte/store';
import { getLocalStorage, setLocalStorage } from './utils.js';
import { LOCALSTORE_LIKELIHOOD, LOCALSTORE_STUDY_LOCATION, LOCALSTORE_LEVEL_OF_IMACT } from '$config';
import { LIKELIHOODS } from './meta.js';

export const SELECTED_LIKELIHOOD_LEVEL = writable(getLocalStorage(LOCALSTORE_LIKELIHOOD, 'likely'));
SELECTED_LIKELIHOOD_LEVEL.subscribe((value) => {
  setLocalStorage(LOCALSTORE_LIKELIHOOD, value);
});

export const SELECTED_LIKELIHOOD_LEVEL_LABEL = derived([SELECTED_LIKELIHOOD_LEVEL, LIKELIHOODS], ([$current, $all]) => {
  const level = $all.find(({ uid }) => uid === $current);
  if (level) {
    return level.label ?? level.uid;
  } else {
    return $current;
  }
});

export const SELECTED_STUDY_LOCATION = writable(getLocalStorage(LOCALSTORE_STUDY_LOCATION, 'urban-hot-spot')); // TODO: Change default to average
SELECTED_STUDY_LOCATION.subscribe((value) => {
  setLocalStorage(LOCALSTORE_STUDY_LOCATION, value);
});

export const LEVEL_OF_IMPACT = writable(getLocalStorage(LOCALSTORE_LEVEL_OF_IMACT, undefined));
LEVEL_OF_IMPACT.subscribe((value) => {
  setLocalStorage(LOCALSTORE_LEVEL_OF_IMACT, value);
});
