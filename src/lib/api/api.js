import { STATUS_FAILED, STATUS_LOADING, STATUS_SUCCESS } from '$src/config';
import qs from 'qs';
import { forEach, reduce } from 'lodash-es';
import { browser } from '$app/environment';

/*
 * These functions are intended to dynamically load data from the client upon user interaction
 * They will not do anything when called on the server, other than returning an emty "loading" response
 */

const cache = {}; // Initializes an object to serve as a cache for storing fetch responses.

function buildStatusError(message, isExpected) {
  return {
    status: STATUS_FAILED,
    message,
    isExpected,
  };
}

function buildStatusSuccess(data) {
  return {
    status: STATUS_SUCCESS,
    data,
  };
}

/*
 * Loads data from Climate Analytics API
 */
export const loadFromAPI = async function (url) {
  // If this is executed on the server, we simply pretend to be loading so the rest
  // of the loading process doesn't need to be altered
  if (!browser) return new Promise((res) => res);
  try {
    const res = await fetch(url); // ${import.meta.env.VITE_DATA_API_URL}
    const data = await res.json();

    // Error handling based on the response status or the presence of a message in the data.
    if (res.status != 200 || data.message) {
      console.warn(`Request failed with status code: ${res.status}`);
      // Returning an object with detailed information about the failure
      return buildStatusError(data.message ?? `Request failed with status code: ${res.status}`, data.isExpected ?? false);
    }
    // If successful, returning an object with status and the parsed JSON data.
    return buildStatusSuccess(data);
  } catch (e) {
    // Catching and handling any errors that occur during the fetch request.
    return buildStatusError(e.toString(), false);
  }
};

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

  // console.log(urls);

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
          loading: loadFromAPI(url),
          data: null,
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
    if (typeof d.loading?.then !== 'function') return;
    d.loading.then((res) => {
      cache[d.url] = res.data ? buildStatusSuccess(res.data) : buildStatusError(res.message, res.isExpected);

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
  if (typeof store === 'undefined') {
    console.warn('Store to save fetch result is undefined');
    return false;
  }
  // console.log(`Fetching single ${endpoint}`, get(store), { id });
  const query = qs.stringify(params, {
    encodeValuesOnly: true,
  });
  const url = `${import.meta.env.VITE_DATA_API_URL}/${endpoint}/?${query}`;
  const cached = cache[url];

  if (cached) {
    store.set(cached);
  } else {
    const loadingData = { status: STATUS_LOADING, data: null };
    cache[url] = loadingData;
    store.set(loadingData);
    loadFromAPI(url).then((res) => {
      const currentData = res.data ? buildStatusSuccess(res.data) : buildStatusError(res.message, res.isExpected);
      cache[url] = currentData;
      store.update((d) => {
        if (d !== loadingData) return d;
        return currentData;
      });
    });
  }
};

export const fetchData = (store, config = []) => {
  if (config.endpoint && config.params) fetchSingle(store, config);
  else fetchMultiple(store, config);
};
