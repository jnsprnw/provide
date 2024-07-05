import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { parse } from 'marked';
import { LABEL_CONTACT } from '$config';

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('contact', fetch);
  const { Contact } = data.attributes;

  const title = generatePageTitle(LABEL_CONTACT);

  return {
    text: parse(Contact),
    title,
  };
};

export const prerender = true;
export const csr = false;
