import { format } from 'd3-format';
import { has, set, compact } from 'lodash-es';
import { handle } from '$lib/api/api.js';
import { loadFromAPI } from '$lib/../routes/api/utils.js';
import qs from 'qs';
import { browser } from '$app/env';
import { STATUS_LOADING, STATUS_SUCCESS, STATUS_FAILED } from '$lib/../config.js';

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
  // console.log("loading:", { params, url, query, url }, `${url}?${query}`);
  return await loadFromAPI(url, query);
}

export function hasInObject(data, addr, param) {
  return compact(
    addr.map((a, i) => {
      return has(data, a) ? false : { addr: a, param: param[i] };
    })
  );
}

function updateDate(old, addr, newData) {
  const obj = old;
  set(obj, addr, newData);
  return obj;
}

export async function load(cache, endpoint, param, addr, url) {
  cache.update((old) => updateDate(old, addr, { status: STATUS_LOADING, data: {} }));
  const newData = await request(param, url);
  cache.update((old) =>
    updateDate(old, addr, { status: newData ? STATUS_SUCCESS : STATUS_FAILED, data: newData })
  );
}
