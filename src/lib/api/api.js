// This file holds the handle function, which all endpoints use to interact with the API.
import { get as take } from 'svelte/store';
import { check, hasInObject } from '$lib/utils.js';
import { isArray, get, map } from 'lodash-es';
import {
  END_IMPACT_TIME,
  END_DISTRIBUTION,
  END_UN_AVOIDABLE_RISK,
  END_IMPACT_GEO,
} from '$lib/../config.js';
import { IMPACT_TIME_CACHE } from '$lib/../stores/impact-time.js';
import { IMPACT_TIME_DISTRIBUTION_CACHE } from '$lib/../stores/impact-time-distribution.js';
import { IMPACT_GEO_CACHE } from '$lib/../stores/impact-geo.js';
import { UN_AVOIDABLE_RISK_CACHE } from '$lib/../stores/un-avoidable-risk.js';
import {
  CURRENT_GEOGRAPHY_UID,
  CURRENT_SCENARIOS_UID,
  CURRENT_INDICATOR_UID,
  CURRENT_INDICATOR_OPTIONS,
  CURRENT_INDICATOR_PARAMETERS_KEYS,
} from '$lib/../stores/store.js';

function returnDefault(callback) {
  if (callback === 'get') {
    return [];
  } else if (callback === 'has') {
    return [false];
  } else {
    return undefined;
  }
}

export function handle(
  endpoint,
  callback,
  params = {},
  trigger // This is used for the custom requests. Since the need to be reactive, we need the store to be used in the function call. We basically through it away and don‘t use it.
) {
  let addr;
  let data;
  let store;
  let param;
  let url;
  let scenario;

  const geography = params.geography || take(CURRENT_GEOGRAPHY_UID);
  const indicator = params.indicator || take(CURRENT_INDICATOR_UID);
  let scenarios = params.scenarios || take(CURRENT_SCENARIOS_UID);
  scenarios = isArray(scenarios) ? scenarios : [scenarios];

  if (!geography || !indicator || scenarios.length === 0) {
    return returnDefault(callback);
  }

  const options = take(CURRENT_INDICATOR_PARAMETERS_KEYS).reduce(
    (result, key) => {
      return {
        ...result,
        [key]:
          get(params, ['options', key]) ||
          get(take(CURRENT_INDICATOR_OPTIONS), [key]),
      };
    },
    {}
  );

  const optionsValues = map(options, (value) => value);

  switch (endpoint) {
    case END_IMPACT_TIME:
      addr = scenarios.map((scenario) => {
        return [geography, scenario, indicator, ...optionsValues];
      });
      param = scenarios.map((scenario) => ({
        geography,
        indicator,
        scenarios: [scenario],
        ...options,
      })); // We need this for the load function
      data = take(IMPACT_TIME_CACHE);
      store = IMPACT_TIME_CACHE;
      url = `/api/impact-time`;
      break;
    case END_DISTRIBUTION:
      scenario = scenarios[0];
      addr = [[geography, scenario, indicator, ...optionsValues]];
      param = [{ geography, indicator, scenarios: [scenario], ...options }]; // We need this for the load function
      data = take(IMPACT_TIME_DISTRIBUTION_CACHE);
      store = IMPACT_TIME_DISTRIBUTION_CACHE;
      url = '/api/impact-time-distribution';
      break;
    case END_IMPACT_GEO:
      scenario = scenarios[0];
      addr = [[geography, scenario, indicator, ...optionsValues]];
      param = [{ geography, scenario, indicator, ...options }]; // We need this for the load function
      data = take(IMPACT_GEO_CACHE);
      store = IMPACT_GEO_CACHE;
      url = `${import.meta.env.VITE_DATA_API_URL}/impact-geo`;
      break;
    case END_UN_AVOIDABLE_RISK:
      addr = [[geography, indicator, ...optionsValues]];
      param = [{ geography, indicator, ...options }]; // We need this for the load function
      data = take(UN_AVOIDABLE_RISK_CACHE);
      store = UN_AVOIDABLE_RISK_CACHE;
      url = '/api/un-avoidable-risk';
      break;
  }
  if (addr && data && store && url) {
    let missing;
    if (callback === 'get' || callback === 'has') {
      missing = hasInObject(data, addr, param);
    }
    if (callback === 'get') {
      // We always check if the data is available to trigger a load.
      // We could probably make this faster by not letting check call handle again, but instead call the load function from here directly with the list of missing data points.
      if (missing.length) {
        check(endpoint, store, missing, url);
      }
      // We could also just return the array and let the component extract the first (and only) value
      return addr.map((a) => get(data, a));
      // const values = addr.map(a => get(data, a));
      // return values.length > 1 ? values : values[0];
    } else if (callback === 'has') {
      // We return a list of missing data points
      return missing;
    } else if (callback === 'addr') {
      return addr;
    }
  }
  return returnDefault(callback);
}
