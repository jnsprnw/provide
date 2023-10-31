import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { groupBy, kebabCase } from 'lodash-es';
import { parse } from 'marked';
import { LABEL_EXPLAINERS, KEY_SCENARIOPRESET_UID } from '$config';
import { extractTimeframe } from '$utils/meta.js';
import _ from 'lodash-es';

function filterUniqueObjects(value, index, array) {
  return array.indexOf(value) === index;
}

function processScenarioPresets(list) {
  return list.map((preset) => {
    const { Description, Scenarios, Timeframe, Title } = preset.attributes;
    return {
      [KEY_SCENARIOPRESET_UID]: kebabCase(Title),
      description: Description ?? '',
      scenarios: (Scenarios?.data ?? []).map(({ attributes }) => attributes.UID).filter(filterUniqueObjects),
      timeframe: parseInt(Timeframe.slice(1)), // Note: this needs to be the same variable type as the selectable timeframe uids.
      title: Title,
    };
  });
}

export const load = async ({ fetch, parent }) => {
  const { meta } = await parent();

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

  // Scenario Presets
  const scenarioPresetsRaw = await loadFromStrapi('scenario-presets', fetch);
  const scenarioPresets = processScenarioPresets(scenarioPresetsRaw);

  // Selectable timeframes
  const selectableTimeframes = _(meta.scenarios)
    .map(extractTimeframe)
    .uniq()
    .sort()
    .map((uid) => ({ uid: parseInt(uid), label: uid })) // The uid should already be a int, but let’s make sure. Note: This needs to be the same type as the scenario presets’ timeframe
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
    scenarioPresets,
  };
};
