import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { kebabCase } from 'lodash-es';
import { LABEL_EXPLAINERS, KEY_SCENARIOPRESET_UID } from '$config';
import { extractTimeframe } from '$utils/meta.js';
import _ from 'lodash-es';

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

export const load = async ({ fetch, parent }) => {
  const { meta } = await parent();
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
    scenarios: meta.scenarios,
    selectableTimeframes,
    defaultTimeframe,
    scenarioPresets,
  };
};
