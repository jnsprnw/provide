import { browser } from '$app/environment';
import { filter, forEach } from 'lodash-es';
import { parse } from 'qs';
import {
  CURRENT_INDICATOR_UID,
  CURRENT_GEOGRAPHY_UID,
  CURRENT_SCENARIOS_UID,
} from '$stores/state.js';
import { autoType } from 'd3-dsv';

const urlToStateMapping = {
  indicator: CURRENT_INDICATOR_UID,
  geography: CURRENT_GEOGRAPHY_UID,
  scenarios: CURRENT_SCENARIOS_UID,
};

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

export function urlToState(currentUrl) {
  const url = new URL(currentUrl);
  const params = parse(url.search.replace(/^\?/, ''));
  forEach(urlToStateMapping, (store, key) => {
    const param = params[key];
    if (!param) return;
    if (Array.isArray(param))
      param.forEach((p, i) => url.searchParams.delete(`${key}[${i}]`));
    else url.searchParams.delete(key);
    store.set(param);
  });
  if (browser)
    window.history.replaceState(window.history.state, null, url.href);
}
