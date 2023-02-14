import { parse } from 'marked';
import { loadFromStrapi } from '$utils/apis.js';
import { kebabCase } from 'lodash-es';

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('about', fetch);
  const { Section } = data.attributes;

  return {
    sections: Section.map((section) => ({
      title: section.Title,
      text: parse(section.Text || ''),
      slug: kebabCase(section.Title),
    })),
  };
};
