import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { groupBy, kebabCase } from 'lodash-es';
import { parse } from 'marked';
import { LABEL_KEY_CONCEPTS, KEY_SCENARIOPRESET_UID } from '$config';
import _ from 'lodash-es';
import { extractEndYear } from '$utils/meta.js';

function filterUniqueObjects(value, index, array) {
  return array.indexOf(value) === index;
}

function processScenarioPresets(list) {
  return list.map((preset) => {
    const { Description, scenarios, Timeframe, Title } = preset.attributes;

    const scenarioList = scenarios?.data ?? [];
    if (scenarioList.length === 0) {
      console.warn(`No scenarios for preset ${Title}.`);
    }

    return {
      [KEY_SCENARIOPRESET_UID]: kebabCase(Title),
      description: Description ?? '',
      scenarios: scenarioList.map(({ attributes }) => attributes.UID).filter(filterUniqueObjects),
      timeframe: parseInt(Timeframe.slice(1)), // Note: this needs to be the same variable type as the selectable timeframe uids.
      title: Title,
    };
  });
}

const loadExplainer = async ({ fetch, parent }) => {
  const { meta } = await parent();

  // Scenario Presets
  const scenarioPresetsRaw = await loadFromStrapi('scenario-presets', fetch);
  const scenarioPresets = processScenarioPresets(scenarioPresetsRaw);

  // Selectable timeframes
  const selectableTimeframes = _(meta.scenarios)
    .map(extractEndYear)
    .uniq()
    .sort()
    .map((uid) => ({ uid: parseInt(uid), label: uid })) // The uid should already be a int, but let’s make sure. Note: This needs to be the same type as the scenario presets’ timeframe
    .value();

  const defaultTimeframe = selectableTimeframes[0].uid;

  return {
    entries: [],
    categories: [],
    scenarios: meta.scenarios,
    selectableTimeframes,
    defaultTimeframe,
    scenarioPresets,
  };
};

const loadGlossary = async ({ fetch }) => {
  const data = await loadFromStrapi('glossaries', fetch, undefined, 'sort[0]=id');
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

  return {
    entries: [],
    categories: [],
    content,
    raw: entries,
  };
};

export const load = async (params) => {
  const [glossary, explainers] = await Promise.all([loadGlossary(params), loadExplainer(params)]);

  const title = generatePageTitle(LABEL_KEY_CONCEPTS);

  return {
    entries: [],
    categories: [],
    title,
    ...glossary,
    ...explainers,
  };
};
