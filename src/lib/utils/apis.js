import { get } from 'lodash-es';

// We use different locals to simulate different versions of the content.
// Version 0: `en` and fallback version
// Version 1: `en-EU`
const localCode = import.meta.env.VITE_STRAPI_LOCALE ?? 'en';

export const loadFromStrapi = function (path, fetch) {
  const url = `${
    import.meta.env.VITE_HEROKU_URL
  }/api/${path}?populate=*&locale=${localCode}`;
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

const labelsSingular = {
  admin0: 'Country',
  cities: 'City',
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
      geographyTypes: meta.geographyTypes.map((g) => ({
        ...g,
        labelSingular: labelsSingular[g.uid],
      })),
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
      scenarios: meta.scenarios.map((scenario) => {
        // Find the correct scenario in the list coming from Strapi
        const currentScenario = descriptionScenarios.find(
          (d) => d.attributes.UID === scenario.uid
        );
        // Get the description from the Strapi scenario
        const description = get(currentScenario, ['attributes', 'Description']);
        // Get the characteristics from the Strapi scenario
        const characteristics = get(
          currentScenario,
          ['attributes', 'ScenarioCharacteristics'],
          []
        )
          .map(({ Year: year, Description: description }) => {
            // Check if year is valid and the description has any length
            if (year && description) {
              return { year, description };
            } else {
              return false;
            }
          })
          .filter((d) => Boolean(d)) // Filter invalid entries
          .sort((a, b) => a.year - b.year);
        return {
          ...scenario,
          description,
          characteristics,
        };
      }),
    });
  });
};

export function trimLinebreakAtEnd(str) {
  return str.replace(/\n|<br \/>$/g, '');
}
