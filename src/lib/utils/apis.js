import { get } from 'lodash-es';

export const loadFromStrapi = function (url, fetch) {
  return new Promise(async (resolve) => {
    const res = await fetch(
      `https://provide-cms.herokuapp.com/api/${url}?populate=*`
    );
    const data = await res.json();
    resolve(data.data);
  });
};

// Load data from Climate Analytics API
// We use the fetch function provided by Svelte if provided.
export const loadFromAPI = async function (url, svelteFetch = fetch) {
  try {
    const res = await svelteFetch(url); // ${import.meta.env.VITE_DATA_API_URL}
    const data = await res.json();
    return data;
  } catch (e) {
    return undefined;
  }
};

export const loadMetaData = function (svelteFetch = fetch) {
  return new Promise(async (resolve) => {
    const descriptionIndicators = await loadFromStrapi(
      'indicators',
      svelteFetch
    );
    const descriptionScenarios = await loadFromStrapi('scenarios', svelteFetch);
    const meta = await loadFromAPI(
      `${import.meta.env.VITE_DATA_API_URL}/meta/`,
      svelteFetch
    );
    resolve({
      ...meta,
      indicators: meta.indicators.map((indicator) => {
        const description = get(
          descriptionIndicators.find((d) => d.attributes.UID === indicator.uid),
          ['attributes', 'Description']
        );
        return {
          ...indicator,
          description,
        };
      }),
      scenarios: meta.scenarios.map((indicator) => {
        const description = get(
          descriptionScenarios.find((d) => d.attributes.UID === indicator.uid),
          ['attributes', 'Description']
        );
        return {
          ...indicator,
          description,
        };
      }),
    });
  });
};
