import { writable, derived } from 'svelte/store';
import { END_IMPACT_TIME_ALL } from '$lib/../config.js';
import { handle } from '$lib/api/api.js';
import { CURRENT_GEOGRAPHY_UID, CURRENT_SCENARIOS_UID } from './store.js';

export const IMPACT_TIME_ALL_CACHE = writable({});

export const IMPACT_TIME_ALL_DATA = derived(
  [IMPACT_TIME_ALL_CACHE, CURRENT_GEOGRAPHY_UID, CURRENT_SCENARIOS_UID],
  async ([], set) => {
    set(handle(END_IMPACT_TIME_ALL, 'get'));
  }
);
