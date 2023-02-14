import { parse } from 'marked';
import { loadFromStrapi } from '$utils/apis.js';

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('contact', fetch);
  const { Contact } = data.attributes;

  return {
    text: parse(Contact),
  };
};
