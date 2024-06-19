import { TITLE_PROJECT, TITLE_SITE, KEY_CHARACTERISTICS, KEY_SCENARIO_ENDYEAR, KEY_SCENARIO_STARTYEAR, DEFAULT_STARTYEAR } from '$config';
import { get } from 'lodash-es';

export function generatePageTitle(title_page) {
  return [title_page, TITLE_SITE, TITLE_PROJECT].filter(Boolean).join(' – ');
}

export function extractEndYear(scenario) {
  // TODO: This will not be needed when the API provides the correct data
  if (scenario.hasOwnProperty(KEY_SCENARIO_ENDYEAR)) {
    return scenario[KEY_SCENARIO_ENDYEAR];
  } else if (scenario.hasOwnProperty(KEY_CHARACTERISTICS) && scenario[KEY_CHARACTERISTICS].hasOwnProperty(KEY_SCENARIO_ENDYEAR)) {
    console.warn(`${KEY_SCENARIO_ENDYEAR} of the scenario should be placed at the top level.`);
    return scenario[KEY_CHARACTERISTICS][KEY_SCENARIO_ENDYEAR];
  } else if (Array.isArray(scenario.timeframe) && scenario.timeframe.length == 2) {
    console.warn(`${KEY_SCENARIO_ENDYEAR} of the scenario should be placed in endYear.`);
    return scenario.timeframe[1];
  }
  console.warn(`Could not find endYear. Will use fallback`);
  return 0;
}

export function extractStartYear(scenario) {
  return get(scenario, KEY_SCENARIO_STARTYEAR, DEFAULT_STARTYEAR);
}
