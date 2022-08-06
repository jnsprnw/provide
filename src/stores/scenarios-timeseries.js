import { derived, get } from 'svelte/store';
import {
  AVAILABLE_SCENARIOS,
  CURRENT_SCENARIOS_UID,
  HOVER_SCENARIO_UID,
} from './store.js';
import THEME from '$styles/theme-store.js';

function processData(data, currentScenarios, hoveredScenario, key) {
  console.log(get(THEME));
  return data
    .map((scenario) => {
      const { data, yearStart, yearStep } = scenario.scenarioData[key];
      const index = currentScenarios.indexOf(scenario.uid);
      const hovered = hoveredScenario == scenario.uid;
      let stroke = 'category-';
      if (hovered) {
        stroke += '1-hovered';
      } else if (index >= 0) {
        stroke += `2-${index}`;
      } else {
        stroke += '3-disabled';
      }
      return {
        scenario: scenario.uid,
        stroke,
        values: data.map((value, i) => {
          return {
            value,
            year: yearStart + yearStep * i,
          };
        }),
      };
    })
    .sort((a, b) => a.stroke < b.stroke);
}

export const SCENARIOS_TIMESERIES_TEMPERATURE_DATA = derived(
  [AVAILABLE_SCENARIOS, CURRENT_SCENARIOS_UID, HOVER_SCENARIO_UID],
  ([data, $scenarios, $hover]) =>
    processData(data, $scenarios, $hover, 'temperature')
);

export const SCENARIOS_TIMESERIES_EMISSIONS_DATA = derived(
  [AVAILABLE_SCENARIOS, CURRENT_SCENARIOS_UID, HOVER_SCENARIO_UID],
  ([data, $scenarios, $hover]) =>
    processData(data, $scenarios, $hover, 'emissions')
);
