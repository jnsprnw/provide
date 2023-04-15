import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { parse } from 'marked';

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('contact', fetch);
  const { Contact } = data.attributes;

  const title = generatePageTitle('Contact');

  return {
    text: parse(Contact),
    title,
  };
};
