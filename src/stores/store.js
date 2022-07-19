import { writable, derived } from 'svelte/store';
import { get, compact, groupBy, keyBy, map, isUndefined, isEmpty } from "lodash-es";

export const INDICATORS = writable([]);
export const SECTORS = writable([]);

export const CURRENT_INDICATOR = writable(null);
export const CURRENT_GEOGRAPHY = writable(null);
export const CURRENT_SCENARIOS = writable([]);

export const DICTIONARY_INDICATORS = derived(INDICATORS, $indicators => keyBy($indicators, 'uid'));
export const DICTIONARY_SECTORS = derived(SECTORS, $sectors => keyBy($sectors, 'uid'));

/* GEOGRAPHIES */
export const CURRENT_GEOGRAPHY_INDEX = writable(0);
export const GEOGRAPHY_TYPES = writable({});
export const CURRENT_GEOGRAPHY_TYPE = derived(
	[CURRENT_GEOGRAPHY_INDEX, GEOGRAPHY_TYPES],
	([$index, $types]) => get($types, [$index])
);

/* SECTOR */
export const CURRENT_SECTOR_INDEX = writable(0);

export const AVAILABLE_INDICATORS = derived(
	[CURRENT_GEOGRAPHY_TYPE, DICTIONARY_INDICATORS],
	([$type, $indicators]) => {
		return compact(get($type, 'availableIndicators', []).map(indicator => {
			const item = get($indicators, indicator);
			if (isUndefined(item)) {
				if (!isEmpty($indicators)) {
					console.warn(`Indicator with id ${indicator} was not found.`);
				}
				return null
			}
			return item;
		}))
	}
);

export const AVAILABLE_INDICATOR_GROUPS = derived(
	[AVAILABLE_INDICATORS, DICTIONARY_SECTORS],
	([$indicators, $sectors]) => compact(map(groupBy($indicators, 'sector'), (indicators, key) => {
		const sector = get($sectors, key);
		if (isUndefined(sector)) {
			if (!isEmpty($sectors)) {
				console.warn(`Sector with id ${key} was not found.`);
			}
			return null;
		}
		return {
			sector,
			indicators
		}
	}))
);
