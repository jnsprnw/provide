import { TITLE_PROJECT, TITLE_SITE, KEY_CHARACTERISTICS, KEY_SCENARIO_TIMEFRAME } from '$config';

export function generatePageTitle(title_page) {
  return [title_page, TITLE_SITE, TITLE_PROJECT].filter(Boolean).join(' – ');
}

export function extractTimeframe(scenario) {
  // TODO: This will not be needed when the API provides the correct data
  if (scenario.hasOwnProperty(KEY_SCENARIO_TIMEFRAME)) {
    return scenario[KEY_SCENARIO_TIMEFRAME];
  } else if (scenario.hasOwnProperty(KEY_CHARACTERISTICS) && scenario[KEY_CHARACTERISTICS].hasOwnProperty(KEY_SCENARIO_TIMEFRAME)) {
    console.warn(`${KEY_SCENARIO_TIMEFRAME} of the scenario should be placed at the top level.`);
    return scenario[KEY_CHARACTERISTICS][KEY_SCENARIO_TIMEFRAME];
  } else if (Array.isArray(scenario.timeframe) && scenario.timeframe.length == 2) {
    console.warn(`${KEY_SCENARIO_TIMEFRAME} of the scenario should be placed in endYear.`);
    return scenario.timeframe[1];
  }
  console.warn(`Could not find endYear. Will use fallback`);
  return 0;
}
