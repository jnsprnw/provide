import { browser } from '$app/environment';
import { forEach } from 'lodash-es';
import { parse } from 'qs';
import {
  CURRENT_INDICATOR_UID,
  CURRENT_GEOGRAPHY_UID,
  CURRENT_SCENARIOS_UID,
} from '$stores/state.js';

const urlToStateMapping = {
  indicator: CURRENT_INDICATOR_UID,
  geography: CURRENT_GEOGRAPHY_UID,
  scenarios: CURRENT_SCENARIOS_UID,
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
