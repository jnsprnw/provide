import { browser } from '$app/environment';
import { CURRENT_GEOGRAPHY_UID, CURRENT_INDICATOR_OPTION_VALUES, CURRENT_INDICATOR_UID, CURRENT_SCENARIOS_UID } from '$stores/state.js';
import { autoType } from 'd3-dsv';
import { parse, stringify } from 'qs';

const urlToStateMapping = [
  { key: 'indicator', store: CURRENT_INDICATOR_UID },
  { key: 'geography', store: CURRENT_GEOGRAPHY_UID },
  { key: 'scenarios', store: CURRENT_SCENARIOS_UID },
  {
    key: ['time', 'reference', 'spatial'],
    store: CURRENT_INDICATOR_OPTION_VALUES,
    mode: 'merge',
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
  if (mode === 'merge') {
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

export function buildURL(type = 'impacts', { indicator, geography, scenarios, time, reference, spatial } = {}) {
  let obj;
  if (type === 'impacts') {
    obj = {
      indicator,
      geography,
      scenarios: scenarios.sort(),
      time,
      reference,
      spatial,
    };
  }
  // TODO: Other type
  const query = stringify(obj, {
    encodeValuesOnly: true,
  });
  return `/explore/${type}?${query}`;
}