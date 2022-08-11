import { writable, derived } from 'svelte/store';
import { END_DISTRIBUTION } from '$lib/../config.js';
import { handle } from '$lib/api/api.js';
import {
  CURRENT_GEOGRAPHY_UID,
  CURRENT_SCENARIOS_UID,
  CURRENT_INDICATOR_UID,
  CURRENT_INDICATOR_OPTIONS,
} from './store.js';

export const IMPACT_TIME_DISTRIBUTION_CACHE = writable({});

export const IMPACT_TIME_DISTRIBUTION_DATA = derived(
  [
    IMPACT_TIME_DISTRIBUTION_CACHE,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_INDICATOR_UID,
    CURRENT_SCENARIOS_UID,
    CURRENT_INDICATOR_OPTIONS,
  ],
  async (stores, set) => {
    set(handle(END_DISTRIBUTION, 'get')[0]); // This endpoint only has one dimension.
  }
);
