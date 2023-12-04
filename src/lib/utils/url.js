import { browser } from '$app/environment';
import { CURRENT_GEOGRAPHY_UID, CURRENT_INDICATOR_OPTION_VALUES, CURRENT_INDICATOR_UID, CURRENT_SCENARIOS_UID } from '$stores/state.js';
import { SELECTED_LIKELIHOOD_LEVEL, LEVEL_OF_IMPACT_ARRAY } from '$stores/avoid.js';
import { URL_PATH_FREQUENCY, URL_PATH_INDICATOR_VALUE, URL_PATH_CERTAINTY_LEVEL, URL_PATH_LEVEL_OF_IMPACT, PATH_AVOID, URL_PATH_INDICATOR, URL_PATH_GEOGRAPHY, URL_PATH_SCENARIOS, URL_PATH_TIME, URL_PATH_REFERENCE, URL_PATH_SPATIAL, MAX_NUMBER_SELECTABLE_SCENARIOS } from '$config';
import { autoType } from 'd3-dsv';
import { parse, stringify } from 'qs';

const MODE_MERGE = 'merge';

const urlToStateMapping = [
  { key: URL_PATH_INDICATOR, store: CURRENT_INDICATOR_UID },
  { key: URL_PATH_GEOGRAPHY, store: CURRENT_GEOGRAPHY_UID },
  { key: URL_PATH_SCENARIOS, store: CURRENT_SCENARIOS_UID },
  {
    key: [URL_PATH_TIME, URL_PATH_REFERENCE, URL_PATH_FREQUENCY, URL_PATH_SPATIAL, URL_PATH_INDICATOR_VALUE],
    store: CURRENT_INDICATOR_OPTION_VALUES,
  },
  { key: URL_PATH_CERTAINTY_LEVEL, store: SELECTED_LIKELIHOOD_LEVEL },
  { key: URL_PATH_LEVEL_OF_IMPACT, store: LEVEL_OF_IMPACT_ARRAY, isIndicatorArray: true },
];

export const parseUrlQuery = (url) => {
  const params = parse(url.search.replace(/^\?/, ''));

  // Filter out all values that are strings (not arrays) so we can pass them to autotype
  const stringParams = Object.entries(params)
    .filter(([key, value]) => typeof value === 'string')
    .reduce((memo, [key, value]) => ({ ...memo, [key]: value }), {});
  return {
    ...params,
    ...autoType(stringParams),
  };
};

function removeParamFromURL(param, key, url) {
  if (Array.isArray(param)) {
    param.forEach((p, i) => url.searchParams.delete(`${key}[${i}]`));
  } else {
    url.searchParams.delete(key);
  }
}

function changeStoreToValue(store, value, { mode, isIndicatorArray }) {
  if (mode === MODE_MERGE) { // This is used for the indicator options
    store.update((d) => ({ ...d, ...value }));
  } else {
    if (isIndicatorArray) { // This is currently only used for level of impact, because MeltUI uses an array for ranges
      store.set(Array.isArray(value) ? value : [value]);
    } else { // This is the normal case
      store.set(value);
    }
  }
}

export function urlToState(currentUrl) {
  const url = new URL(currentUrl);
  const params = parse(url.search.replace(/^\?/, ''));
  urlToStateMapping.forEach(({ store, key, isIndicatorArray = false }) => {
    let param;
    if (Array.isArray(key)) { // This is for indicator options
      const obj = {};
      key.forEach((k) => {
        param = params[k];
        if (!param) return; // If setting is not present in the url
        removeParamFromURL(param, k, url);
        obj[k] = param;
      });
      changeStoreToValue(store, obj, { mode: MODE_MERGE });
    } else { // This is for regular settings
      param = params[key];
      if (!param) return; // If setting is not present in the url
      // TODO: Check for max number of scenarios
      removeParamFromURL(param, key, url);
      changeStoreToValue(store, param, { isIndicatorArray });
    }
  });
  if (browser) window.history.replaceState(window.history.state, null, url.href);
}

export function buildURL(url, params = {}) {
  const obj = {
    [URL_PATH_INDICATOR]: params[URL_PATH_INDICATOR],
    [URL_PATH_GEOGRAPHY]: params[URL_PATH_GEOGRAPHY],
    [URL_PATH_SCENARIOS]: (params[URL_PATH_SCENARIOS] ?? []).sort().slice(0, MAX_NUMBER_SELECTABLE_SCENARIOS),
    [URL_PATH_TIME]: params[URL_PATH_TIME],
    [URL_PATH_REFERENCE]: params[URL_PATH_REFERENCE],
    [URL_PATH_SPATIAL]: params[URL_PATH_SPATIAL],
    [URL_PATH_FREQUENCY]: params[URL_PATH_FREQUENCY],
    [URL_PATH_INDICATOR_VALUE]: params[URL_PATH_INDICATOR_VALUE],
  }
  if (url === PATH_AVOID) {
    obj[URL_PATH_LEVEL_OF_IMPACT] = params[URL_PATH_LEVEL_OF_IMPACT];
    obj[URL_PATH_CERTAINTY_LEVEL] = params[URL_PATH_CERTAINTY_LEVEL];
  }

  const query = stringify(obj, {
    encodeValuesOnly: true,
  });
  return `?${query}`;
}
