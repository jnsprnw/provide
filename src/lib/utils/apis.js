import { get } from 'lodash-es';

// We use different locals to simulate different versions of the content.
// Version 0: `en` and fallback version
// Version 1: `en-EU`
const ENV_CONTENT_LOCALE = import.meta.env.VITE_STRAPI_LOCALE;
const localCode = ENV_CONTENT_LOCALE ?? 'en';
const ENV_URL_CONTENT = import.meta.env.VITE_HEROKU_URL;
const ENV_URL_DATA = import.meta.env.VITE_DATA_API_URL;

export const loadFromStrapi = function (path, fetch) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof ENV_URL_CONTENT === 'undefined') {
        reject(new Error('Content URL is not defined. Check environment variables.'));
      }
      if (typeof ENV_CONTENT_LOCALE === 'undefined') {
        console.warn(`Content version variable in undefined. Fallback version is used.`);
      }
      const url = `${ENV_URL_CONTENT}/api/${path}?populate=*&locale=${localCode}`;
      const res = await fetch(url);
      const data = await res.json();
      resolve(data.data);
    } catch (e) {
      console.warn(`Failed to fetch url ${url} with error ${e}.`);
      reject(new Error('Failed to fetch.'));
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
  return new Promise(async (resolve, reject) => {
    if (typeof ENV_URL_DATA === 'undefined') {
      return reject(new Error('Data URL is not defined. Check environment variables.'));
    }
    const descriptionIndicators = await loadFromStrapi('indicators', svelteFetch);
    const descriptionScenarios = await loadFromStrapi('scenarios', svelteFetch);
    const availableIndicators = descriptionIndicators.map(({ attributes }) => attributes.UID);

    const url = `${ENV_URL_DATA.split('').join('')}/meta/`;
    const meta = await loadFromAPI(url, svelteFetch);
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
        if (typeof description === 'undefined') {
          console.warn(`Indicator description for ${indicator.uid} could not be found.`);
          console.warn(`These descriptions are available: ${availableIndicators.join(', ')}`);
        }

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
        if (typeof currentScenario === 'undefined') {
          console.warn(`Scenario could not be found. This may be caused by a mismatch of the content versions.`)
        }
        // Get the description from the Strapi scenario
        const description = get(currentScenario, ['attributes', 'Description']);
        // Get the characteristics from the Strapi scenario
        const characteristics = get(currentScenario, ['attributes', 'ScenarioCharacteristics'], [])
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
