import { TITLE_PROJECT, TITLE_SITE, KEY_CHARACTERISTICS } from '$config';

export function generatePageTitle(title_page) {
  return [title_page, TITLE_SITE, TITLE_PROJECT].filter(Boolean).join(' – ');
}

export function extractTimeframe(scenario) {
  // TODO: This will not be needed when the API provides the correct data
  if (scenario.hasOwnProperty('endYear')) {
    return scenario.endYear;
  } else if (scenario[KEY_CHARACTERISTICS].hasOwnProperty('endYear')) {
    console.warn(`End year of the scenario should be placed at the top level.`);
    return scenario[KEY_CHARACTERISTICS].endYear;
  } else if (Array.isArray(scenario.timeframe) && scenario.timeframe.length == 2) {
    console.warn(`End year of the scenario should be placed in endYear.`);
    return scenario.timeframe[1];
  }
  console.warn(`Could not find endYear. Will use fallback`);
  return 0;
}
