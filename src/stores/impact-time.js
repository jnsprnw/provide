import qs from "qs";
import { derived } from "svelte/store";
import { fetchOrRetrieve } from "./utils";
import {
  CURRENT_SCENARIOS_UID,
  CURRENT_GEOGRAPHY_UID,
  AVAILABLE_INDICATORS_UID,
} from "$lib/../stores/store.js";

export default derived(
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
