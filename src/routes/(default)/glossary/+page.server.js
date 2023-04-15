import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import _, { kebabCase, sortBy } from 'lodash-es';
import { parse } from 'marked';

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('glossaries', fetch);
  let entries = data.map((d) => {
    const { Title, Category, Link, UID, Description, Abbreviation } =
      d.attributes;
    return {
      title: Title,
      category: kebabCase(Category),
      footnote: Link,
      uid: UID || kebabCase(Title),
      description: parse(Description),
      abbreviation: Abbreviation,
    };
  });

  entries = sortBy(entries, 'title');

  const categories = _(data)
    .map('attributes.Category')
    .uniq()
    .map((d) => ({ label: d, slug: kebabCase(d) }))
    .value();

  const title = generatePageTitle('Glossary');

  return {
    entries,
    categories,
    title,
  };
};
