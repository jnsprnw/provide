import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { groupBy, kebabCase } from 'lodash-es';
import { parse } from 'marked';

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('glossaries', fetch);
  const entries = data.map((d) => {
    const { Title, Category, Link, UID, Description, Abbreviation } =
      d.attributes;
    return {
      title: Title,
      category: Category,
      footnote: Link,
      slug: UID || kebabCase(Title),
      content: parse(Description ?? ''),
      abbreviation: Abbreviation,
    };
  });

  const content = Object.entries(groupBy(entries, 'category')).map(
    ([label, sections]) => {
      return {
        title: label,
        slug: kebabCase(label),
        sections,
      };
    }
  );

  const title = generatePageTitle('Glossary');

  return {
    entries: [],
    categories: [],
    title,
    content,
  };
};
