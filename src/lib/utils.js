import { format } from 'd3-format';
import { has, set, compact } from 'lodash-es';
import { handle } from '$lib/api/api.js';
import { loadFromAPI } from '$lib/../routes/api/utils.js';
import qs from 'qs';
import { browser } from '$app/env';

export const getUID = function (obj) {
  return obj?.uid || null;
};

export const formatObjArr = function (arr, key) {
  const formatter = new Intl.ListFormat('en-GB', {
    style: 'long',
    type: 'conjunction',
  });
  // We have to do an two extra steps because the formatToParts function does not allow object but requires strings
  // First, we map a string from each object
  // Second, we use the find function to bring back the object
  const list = formatter.formatToParts(arr.map((d) => d[key]));
  return list.map((obj) => {
    return {
      ...obj,
      value:
        obj.type === 'literal'
          ? obj.value
          : arr.find((d) => d[key] === obj.value),
    };
  });
};

async function request(params, url) {
  if (!browser) return undefined;
  const query = qs.stringify(params, {
    encodeValuesOnly: true,
  });
  // console.log("loading:", { params, url, query }, `${url}?${query}`);
  return await loadFromAPI(url, query);
}

export function hasInObject(data, addr, param) {
  return compact(
    addr.map((a, i) => {
      return has(data, a) ? false : param[i];
    })
  );
}

function updateDate(old, addr, newData) {
  const obj = old;
  set(obj, addr, newData);
  return obj;
}

async function load(cache, endpoint, params, url) {
  // addr will always returns an array of scenarios, but it is only one element long given the params
  const addr = handle(endpoint, 'addr', params)[0];
  cache.update((old) => updateDate(old, addr, { status: 'loading', data: {} }));
  const newData = await request(params, url);
  cache.update((old) =>
    updateDate(old, addr, { status: 'success', data: newData })
  );
}

export function check(endpoint, store, missing, url) {
  // "has" returns an array with all the missing data.
  // const missing = handle(endpoint, "has", params);
  missing.forEach((request) => {
    // We load each missing data point. In our case, a list of scenarios with other parameters
    load(store, endpoint, request, url);
  });
}
