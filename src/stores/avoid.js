import { writable } from 'svelte/store';
import { getLocalStorage, setLocalStorage } from './utils.js';
import { LOCALSTORE_LIKELIHOOD, LOCALSTORE_STUDY_LOCATION, LOCALSTORE_LEVEL_OF_IMACT } from '$config';

export const SELECTED_LIKELIHOOD_LEVEL = writable(getLocalStorage(LOCALSTORE_LIKELIHOOD, 'likely'));
SELECTED_LIKELIHOOD_LEVEL.subscribe((value) => {
  setLocalStorage(LOCALSTORE_LIKELIHOOD, value);
});

export const SELECTED_STUDY_LOCATION = writable(getLocalStorage(LOCALSTORE_STUDY_LOCATION, 'urban-hot-spot')); // TODO: Change default to average
SELECTED_STUDY_LOCATION.subscribe((value) => {
  setLocalStorage(LOCALSTORE_STUDY_LOCATION, value);
});

export const LEVEL_OF_IMPACT = writable(getLocalStorage(LOCALSTORE_LEVEL_OF_IMACT, 1));
LEVEL_OF_IMPACT.subscribe((value) => {
  setLocalStorage(LOCALSTORE_LEVEL_OF_IMACT, value);
});
