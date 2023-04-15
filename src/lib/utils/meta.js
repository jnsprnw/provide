import { TITLE_PROJECT, TITLE_SITE } from '$config';

export function generatePageTitle(title_page) {
  return [title_page, TITLE_SITE, TITLE_PROJECT].filter(Boolean).join(' – ');
}
