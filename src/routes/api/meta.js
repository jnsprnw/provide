import { keyBy, get as take } from "lodash-es";
// Will be loaded externally later
import { GEOGRAPHY_TYPES, CONTINENTS, ADMIN_0, ADMIN_1, CITIES, ICONIC_REGIONS, SCENARIOS, UNITS, SECTORS, INDICATORS } from '$lib/../config.js';
import emojisCountries from '$lib/emojis-countries.json';

const continentDictionary = keyBy(CONTINENTS, 'uid');

export function get() {
  return {
    body: {
      geographyTypes: GEOGRAPHY_TYPES,
      continents: CONTINENTS,
      admin0: ADMIN_0.map((country) => {
        const emoji = take(emojisCountries, country.uid);
        const continent = take(continentDictionary, [country.region, 'label'], country.region);
        return {
          ...country,
          emoji,
          continent
        }
      }),
      admin1: ADMIN_1,
      cities: CITIES,
      iconicRegions: ICONIC_REGIONS,
      scenarios: SCENARIOS,
      units: UNITS,
      sectors: SECTORS,
      indicators: INDICATORS
    }
  }
}