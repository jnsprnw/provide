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

// {
//   scenarioId: {
//     geoId: {
//       indicatorId: {
//         data
//       }
//     }
//   }
// }

// {
//   "url?scenario=fdjsak&geo=fdsa": {
//     data
//   }
// }
