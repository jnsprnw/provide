import { derived } from 'svelte/store';
import {
  AVAILABLE_SCENARIOS,
  CURRENT_SCENARIOS_UID,
} from "./store.js";

export const SCENARIOS_TIMESERIES_TEMPERATURE_DATA = derived(
  [
    AVAILABLE_SCENARIOS,
    CURRENT_SCENARIOS_UID,
  ],
  ([data, $scenarios]) => {
    return data.map(scenario => {
      const { data, yearStart, yearStep } = scenario.scenarioData.temperature;
      const index = $scenarios.indexOf(scenario.uid);
      return {
        scenario: scenario.uid,
        stroke: `category-${index >= 0 ? index : 'disabled'}`,
        values: data.map((value, i) => {
          return {
            value,
            year: yearStart + yearStep * i,
            scenario: scenario.uid
          }
        })
      }
    }).sort((a, b) => a.stroke < b.stroke)
  }
);
