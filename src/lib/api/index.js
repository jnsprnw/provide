import { derived } from "svelte/store";
import { browser } from "$app/env";

import {
  CURRENT_INDICATOR,
  CURRENT_GEOGRAPHY,
  CURRENT_SCENARIOS,
} from "$lib/../stores/store.js";

export const impactTimeDistribution = derived(
  [CURRENT_INDICATOR, CURRENT_GEOGRAPHY, CURRENT_SCENARIOS],
  async (stores, set) => {
    if (!browser) return;
    const response = await fetch("/api/impact-time-distribution");
    const data = await response.json();
    set(data);
  }
);
