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
    const body = await response.json();
    const mean = body.data.mean.map((value, xIndex) => ({
      value,
      year: new Date(body.yearStart + xIndex, 0, 1),
    }));

    const distribution = body.data.distribution.map(
      (yearDistribution, xIndex) =>
        yearDistribution.map((dist, yIndex) => ({
          value: body.valueStart + yIndex * body.valueStep,
          year: body.yearStart + xIndex * body.yearStep,
          z: dist,
        }))
    );

    set({ mean, distribution });
  }
);
