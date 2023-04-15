import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { kebabCase } from 'lodash-es';
import { parse } from 'marked';

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('about', fetch);
  const { Section } = data.attributes;

  const title = generatePageTitle('About');

  return {
    sections: Section.map((section) => ({
      title: section.Title,
      text: parse(section.Text || ''),
      slug: kebabCase(section.Title),
    })),
    title,
  };
};
