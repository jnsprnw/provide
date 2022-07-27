import { derived } from "svelte/store";
import { browser } from "$app/env";
import qs from "qs";

import {
  CURRENT_INDICATOR_UID,
  CURRENT_SCENARIOS_UID,
  CURRENT_GEOGRAPHY_UID,
  AVAILABLE_INDICATORS_UID,
} from "$lib/../stores/store.js";

const cache = {};

const fetchOrRetrieve = async (urls, set, process) => {
  if (!browser) return;
  const allCached = urls.every((url) => cache[url]);

  if (allCached) {
    const cached = urls.map((url) => cache[url]);
    const processed = process ? process(cached) : { response: cached };
    set({ ...processed, status: "success" });
  } else {
    set({ status: "loading" });

    const promises = urls.map(async (url) => {
      const response = await fetch(url);
      const body = await response.json();
      return body;
    });

    Promise.all(promises).then((responses) => {
      responses.forEach((response, i) => (cache[urls[i]] = response));
      const processed = process ? process(responses) : { response: responses };
      set({ ...processed, status: "success" });
    });
  }
};

/*
 *  ENDPOINTS
 */

export const IMPACT_TIME_DISTRIBUTION_DATA = derived(
  [CURRENT_GEOGRAPHY_UID, CURRENT_SCENARIOS_UID, CURRENT_INDICATOR_UID],
  async (stores, set) => {
    if (stores.some((d) => !d || !d.length)) {
      set(null);
      return;
    }

    const [geography, scenarios, indicator] = stores;
    const urls = scenarios.map((scenario) => {
      const query = qs.stringify(
        {
          scenario,
          geography,
          indicator,
        },
        {
          encodeValuesOnly: true,
        }
      );
      return `/api/impact-time-distribution?${query}`;
    });

    const processData = (responses) => {
      const data = responses.map((body) => {
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

        return { mean, distribution };
      });
      return { ...data[0] };
    };

    fetchOrRetrieve(urls, set, processData);
  }
);

export const IMPACT_TIME_DATA_2 = derived(
  [CURRENT_GEOGRAPHY_UID, CURRENT_SCENARIOS_UID, AVAILABLE_INDICATORS_UID],
  async (stores, set) => {
    if (stores.some((d) => !d || !d.length)) {
      set(null);
      return;
    }

    const [geography, scenarios, indicators] = stores;
    const urls = scenarios.map((scenario) => {
      const query = qs.stringify(
        {
          scenario,
          geography,
          indicators,
        },
        {
          encodeValuesOnly: true,
        }
      );
      return `/api/impact-time?${query}`;
    });

    fetchOrRetrieve(urls, set);
  }
);
