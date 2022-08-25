import { STATUS_LOADING, STATUS_SUCCESS } from '$lib/../config';
import { loadFromAPI } from '$lib/../routes/api/utils';
import qs from 'qs';
import { clone, forEach, reduce } from 'lodash';

const cache = {};

/*
 * This function accepts an array or dictionary of config objects.
 * For each config, data is either retreived from cache or loaded from the api
 * Data is then stored on a svelte store.
 */
const fetchMultiple = (store, configs) => {
  const isObject = configs.constructor === Object;
  // Create object/array of url string used to retrieve data either from cache or api
  const urls = reduce(
    configs,
    (acc, { endpoint, params }, keyOrIndex) => {
      const query = qs.stringify(params, {
        encodeValuesOnly: true,
      });
      const url = `${import.meta.env.VITE_DATA_API_URL}/${endpoint}/?${query}`;
      acc[keyOrIndex] = url;
      return acc;
    },
    isObject ? {} : []
  );

  // Create array or object containing either cached data or empty objects
  const initialData = reduce(
    configs,
    (acc, config, keyOrIndex) => {
      const url = urls[keyOrIndex];
      const cached = cache[url];
      if (cached) {
        acc[keyOrIndex] = cached;
      } else {
        // Intial empty object holding promise as data
        const loadingData = {
          url,
          status: STATUS_LOADING,
          data: loadFromAPI(url),
        };
        cache[url] = loadingData;
        acc[keyOrIndex] = loadingData;
      }
      return acc;
    },
    isObject ? {} : []
  );

  // Set initial data
  store.set(initialData);

  // Go through initial data and check if there is a pending promise
  // If promise is present, update data on resolve
  forEach(initialData, (d, keyOrIndex) => {
    if (typeof d.data.then !== 'function') return;
    d.data.then((data) => {
      cache[d.url] = { status: STATUS_SUCCESS, data };
      store.update((old) => {
        // Simple check to make sure no newer data has been requested in the meantime
        if (old[keyOrIndex] !== d) return old;
        const next = isObject ? { ...old } : [...old];
        next[keyOrIndex] = cache[d.url];
        return next;
      });
    });
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

export const dataPlease = (store, config = []) => {
  if (config.endpoint && config.params) fetchSingle(store, config);
  else fetchMultiple(store, config);
};
