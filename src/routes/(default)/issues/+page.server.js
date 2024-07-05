import { parse } from 'marked';
import { loadFromStrapi } from '$utils/apis.js';
import { kebabCase } from 'lodash-es';

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('issue', fetch);
  const { Issues } = data.attributes;

  return {
    issues: Issues.map((section) => ({
      title: (section.Title || '').trim(),
      text: parse(section.Description || ''),
      slug: kebabCase(section.Title),
    })).filter((d) => d.title && d.text),
  };
};
