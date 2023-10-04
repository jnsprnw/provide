import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { groupBy, kebabCase } from 'lodash-es';
import { parse } from 'marked';
import { LABEL_EXPLAINERS } from '$config';
import { extractTimeframe } from '$utils/meta.js';
import _ from 'lodash-es';

export const load = async ({ fetch, parent }) => {
  const { meta } = await parent();
  console.log({ meta });
  const data = await loadFromStrapi('glossaries', fetch);
  const entries = data.map((d) => {
    const { Title, Category, Link, UID, Description, Abbreviation } = d.attributes;
    return {
      title: Title,
      category: Category,
      footnote: Link,
      slug: UID || kebabCase(Title),
      content: parse(Description ?? ''),
      abbreviation: Abbreviation,
    };
  });

  const content = Object.entries(groupBy(entries, 'category')).map(([label, sections]) => {
    return {
      title: label,
      slug: kebabCase(label),
      sections,
    };
  });

  const title = generatePageTitle(LABEL_EXPLAINERS);

  const selectableTimeframes = _(meta.scenarios)
    .map(extractTimeframe)
    .uniq()
    .sort()
    .map((uid) => ({ uid, label: uid }))
    .value();

  const defaultTimeframe = selectableTimeframes[0].uid;

  return {
    entries: [],
    categories: [],
    title,
    content,
    scenarios: meta.scenarios,
    selectableTimeframes,
    defaultTimeframe,
  };
};
