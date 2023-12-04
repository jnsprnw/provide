import { browser } from '$app/environment';
import { CURRENT_GEOGRAPHY_UID, CURRENT_INDICATOR_OPTION_VALUES, CURRENT_INDICATOR_UID, CURRENT_SCENARIOS_UID } from '$stores/state.js';
import { PATH_IMPACT, URL_PATH_INDICATOR, URL_PATH_GEOGRAPHY, URL_PATH_SCENARIOS, URL_PATH_TIME, URL_PATH_REFERENCE, URL_PATH_SPATIAL } from '$config';
import { autoType } from 'd3-dsv';
import { parse, stringify } from 'qs';

const MODE_MERGE = 'merge';

const urlToStateMapping = [
  { key: URL_PATH_INDICATOR, store: CURRENT_INDICATOR_UID },
  { key: URL_PATH_GEOGRAPHY, store: CURRENT_GEOGRAPHY_UID },
  { key: URL_PATH_SCENARIOS, store: CURRENT_SCENARIOS_UID },
  {
    key: [URL_PATH_TIME, URL_PATH_REFERENCE, URL_PATH_SPATIAL],
    store: CURRENT_INDICATOR_OPTION_VALUES,
    mode: MODE_MERGE,
  },
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

function changeStoreToValue(store, value, mode) {
  if (mode === MODE_MERGE) {
    store.update((d) => ({ ...d, ...value }));
  } else {
    store.set(value);
  }
}

export function urlToState(currentUrl) {
  const url = new URL(currentUrl);
  const params = parse(url.search.replace(/^\?/, ''));
  urlToStateMapping.forEach(({ store, key, mode }) => {
    let param;
    if (Array.isArray(key)) {
      const obj = {};
      key.forEach((k) => {
        param = params[k];
        if (!param) return;
        removeParamFromURL(param, k, url);
        obj[k] = param;
      });
      changeStoreToValue(store, obj, mode);
    } else {
      param = params[key];
      if (!param) return;
      removeParamFromURL(param, key, url);
      changeStoreToValue(store, param);
    }
  });
  if (browser) window.history.replaceState(window.history.state, null, url.href);
}

export function buildURL(type = PATH_IMPACT, { indicator, geography, scenarios, time, reference, spatial } = {}) {
  let obj;
  if (type === PATH_IMPACT) {
    obj = {
      [URL_PATH_INDICATOR]: indicator,
      [URL_PATH_GEOGRAPHY]: geography,
      [URL_PATH_SCENARIOS]: (scenarios ?? []).sort(),
      [URL_PATH_TIME]: time,
      [URL_PATH_REFERENCE]: reference,
      [URL_PATH_SPATIAL]: spatial,
    };
  }
  // TODO: Other type
  const query = stringify(obj, {
    encodeValuesOnly: true,
  });
  return `?${query}`;
}
