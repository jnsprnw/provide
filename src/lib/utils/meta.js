import { TITLE_PROJECT, TITLE_SITE } from '$config';

export function generatePageTitle(title_page) {
  return [title_page, TITLE_SITE, TITLE_PROJECT].filter(Boolean).join(' – ');
}

export function extractTimeframe(scenario) {
  return scenario.endYear ?? scenario.timeframe[1]; // TODO: This will not be needed when the API provides the correct data
}
