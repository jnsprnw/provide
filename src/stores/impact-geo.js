import { writable, derived } from 'svelte/store';
import { END_IMPACT_GEO } from '$lib/../config.js';
import { handle } from '$lib/api/api.js';
import {
  CURRENT_GEOGRAPHY_UID,
  CURRENT_SCENARIOS_UID,
  CURRENT_INDICATOR_UID,
  CURRENT_IMPACT_GEO_YEAR_UID,
} from './store.js';

export const IMPACT_GEO_CACHE = writable({});

export const IMPACT_GEO_DATA = derived(
  [
    IMPACT_GEO_CACHE,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_INDICATOR_UID,
    CURRENT_SCENARIOS_UID,
    CURRENT_IMPACT_GEO_YEAR_UID,
  ],
  async ([cache], set) => {
    // We don’t need any parameter, but instead just the reactivity of the other stores.
    // This endpoint only has one dimension so we take the first item.
    set(handle(END_IMPACT_GEO, 'get'));
  }
);
