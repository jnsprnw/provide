import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { kebabCase } from 'lodash-es';
import { parse } from 'marked';
import { LABEL_ABOUT } from '$config'

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('about', fetch);
  const { Section } = data.attributes;

  const title = generatePageTitle(LABEL_ABOUT);

  return {
    content: Section.map(({ Title, Text }) => ({
      title: Title,
      content: parse(Text || ''),
      slug: kebabCase(Title),
    })),
    title,
  };
};
