import { keyBy, get as take } from "lodash-es";
// Will be loaded externally later
import { GEOGRAPHY_TYPES, CONTINENTS, ADMIN_0, ADMIN_1, CITIES, ICONIC_REGIONS, SCENARIOS, UNITS, SECTORS, INDICATORS } from '$lib/../config.js';
import emojisCountries from '$lib/../data/emojis-countries.json';

export function get() {
  return {
    body: {
      geographyTypes: GEOGRAPHY_TYPES,
      continents: CONTINENTS,
      admin0: ADMIN_0.map((country) => {
        const emoji = take(emojisCountries, country.uid);
        return {
          ...country,
          emoji
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