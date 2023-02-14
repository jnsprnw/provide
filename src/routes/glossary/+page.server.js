import { parse } from 'marked';
import _, { groupBy, kebabCase, sortBy } from 'lodash-es';
import { loadFromStrapi } from '$utils/apis.js';

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

  return {
    entries,
    categories,
  };
};
