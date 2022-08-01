import { writable, derived } from 'svelte/store';
import { END_UN_AVOIDABLE_RISK } from "$lib/../config.js";
import { handle } from "$lib/api/api.js";
import {
  CURRENT_GEOGRAPHY_UID,
  CURRENT_SCENARIOS_UID,
  CURRENT_INDICATOR_UID,
} from "./store.js";

export const UN_AVOIDABLE_RISK_CACHE = writable({});

export const UN_AVOIDABLE_RISK_DATA = derived(
  [
    UN_AVOIDABLE_RISK_CACHE,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_INDICATOR_UID,
    CURRENT_SCENARIOS_UID,
  ],
  async ([cache, $geo, $indicator, $scenarios], set) => {
    set(handle(END_UN_AVOIDABLE_RISK, "get")[0]); // This endpoint only has one dimension.
  }
);
