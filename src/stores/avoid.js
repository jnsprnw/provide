import { writable } from 'svelte/store';
import { getLocalStorage, setLocalStorage } from './utils.js';
import { LOCALSTORE_LIKELIHOOD, LOCALSTORE_STUDY_LOCATION } from '$config';

export const SELECTED_LIKELIHOOD_LEVEL = writable(getLocalStorage(LOCALSTORE_LIKELIHOOD, 'likely'));
SELECTED_LIKELIHOOD_LEVEL.subscribe((value) => {
  setLocalStorage(LOCALSTORE_LIKELIHOOD, value);
});

export const SELECTED_STUDY_LOCATION = writable(getLocalStorage(LOCALSTORE_STUDY_LOCATION, 'urban-hot-spot')); // TODO: Change default to average
SELECTED_STUDY_LOCATION.subscribe((value) => {
  setLocalStorage(LOCALSTORE_STUDY_LOCATION, value);
});
