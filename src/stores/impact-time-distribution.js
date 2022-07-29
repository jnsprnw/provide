import qs from "qs";
import { derived } from "svelte/store";
import { fetchOrRetrieve } from "./utils";
import {
  CURRENT_INDICATOR_UID,
  CURRENT_SCENARIOS_UID,
  CURRENT_GEOGRAPHY_UID,
} from "$lib/../stores/store.js";

export default derived(
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

// {
//   "options": ["months", "freqency"]
// }

// {
//   "options": ["seasons", "freqency"]
// }

// {
//   "options": [{
//     "uid": "seasons",
//     "options": [{
//       "uid": "summer",
//       "label": "Summer"
//     }]
//   }],
//   "unit": "celsius",
//   "thresholds": [0.5, 1, 1.5]
// }
