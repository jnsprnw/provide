import { writable, derived } from 'svelte/store';
import { END_IMPACT_GEO } from "$lib/../config.js";
import { handle } from "$lib/api/api.js";
import {
  CURRENT_GEOGRAPHY_UID,
  CURRENT_SCENARIOS_UID,
  CURRENT_INDICATOR_UID,
} from "./store.js";

export const IMPACT_GEO_CACHE = writable({});

export const IMPACT_GEO_DATA = derived(
  [
    IMPACT_GEO_CACHE,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_INDICATOR_UID,
    CURRENT_SCENARIOS_UID,
  ],
  async ([cache, $geo, $indicator, $scenarios], set) => {
    set(handle(END_IMPACT_GEO, "get")[0]); // This endpoint only has one dimension.
  }
);
