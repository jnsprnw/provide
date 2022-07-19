import { writable, derived } from 'svelte/store';
import { get } from "lodash-es";

export const CURRENT_INDICATOR = writable(null);
export const CURRENT_SECTOR = writable(null);
export const CURRENT_GEOGRAPHY = writable(null);
export const CURRENT_SCENARIOS = writable([]);
export const CURRENT_GEOGRAPHY_INDEX = writable(0);
export const GEOGRAPHY_TYPES = writable({});

export const CURRENT_GEOGRAPHY_TYPE = derived(
	[CURRENT_GEOGRAPHY_INDEX, GEOGRAPHY_TYPES],
	([$index, $types]) => get($types, [$index])
);
