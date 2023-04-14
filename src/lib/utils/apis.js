import { get } from 'lodash-es';

export const loadFromStrapi = function (path, fetch) {
  const url = `https://provide-cms.herokuapp.com/api/${path}?populate=*`;
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      resolve(data.data);
    } catch (e) {
      console.log('Failed to fetch ', url);
      console.log(e);
      const res = await loadFromStrapi(path, fetch);
      resolve(res);
    }
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
        // Find the correct scenario in the list coming from Strapi
        const currentScenario = descriptionScenarios.find(
          (d) => d.attributes.UID === indicator.uid
        );
        // Get the description from the Strapi scenario
        const description = get(currentScenario, ['attributes', 'Description']);
        // Get the characteristics from the Strapi scenario
        const chararacteristics = get(currentScenario, [
          'attributes',
          'ScenarioCharacteristics',
        ])
          .map(({ Year: YearStr, Description: descriptionStr }) => {
            const year = parseInt(YearStr);
            // Check if year is valid and the description has any length
            if (year && descriptionStr.length) {
              return [year, descriptionStr];
            } else {
              return false;
            }
          })
          .filter((d) => Boolean(d)); // Filter invalid entries
        return {
          ...indicator,
          description,
          ...Object.fromEntries(chararacteristics),
        };
      }),
    });
  });
};
