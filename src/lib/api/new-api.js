import { STATUS_LOADING, STATUS_SUCCESS } from '$lib/../config';
import { loadFromAPI } from '$lib/../routes/api/utils';
import qs from 'qs';
import { clone, forEach } from 'lodash';

const cache = {};

const fetchMultiple = (store, urls) => {
  forEach(urls, ({ endpoint, params }, key) => {
    const query = qs.stringify(params, {
      encodeValuesOnly: true,
    });
    const url = `${import.meta.env.VITE_DATA_API_URL}/${endpoint}/?${query}`;
    const cached = cache[url];
    if (cached) {
      store.update((d) => {
        const next = clone(d); // Not sure if necessary to clone, but feels cleaner than mutating old state
        next[key] = cached;
        return next;
      });
    } else {
      const loadingData = { status: STATUS_LOADING, data: {} };
      cache[url] = loadingData;
      store.update((d) => {
        const next = clone(d);
        next[key] = loadingData;
        return next;
      });
      loadFromAPI(url).then((data) => {
        cache[url] = { status: STATUS_SUCCESS, data };
        store.update((d) => {
          if (d[key] !== loadingData) return d;

          const next = clone(d);
          next[key] = cache[url];
          return next;
        });
      });
    }
  });
};

const fetchSingle = (store, { endpoint, params }) => {
  const query = qs.stringify(params, {
    encodeValuesOnly: true,
  });
  const url = `${import.meta.env.VITE_DATA_API_URL}/${endpoint}/?${query}`;
  const cached = cache[url];
  if (cached) {
    store.set(cached);
  } else {
    const loadingData = { status: STATUS_LOADING, data: {} };
    cache[url] = loadingData;
    store.set(loadingData);
    loadFromAPI(url).then((data) => {
      cache[url] = { status: STATUS_SUCCESS, data };
      store.update((d) => {
        if (d !== loadingData) return d;
        return cache[url];
      });
    });
  }
};

export const dataStore = (store, config = []) => {
  if (config.endpoint && config.params) fetchSingle(store, config);
  else fetchMultiple(store, config);
};
