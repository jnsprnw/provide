import { writable, derived } from 'svelte/store';
import { get, compact, groupBy, keyBy, map, isUndefined, isEmpty } from "lodash-es";

export const INDICATORS = writable([]);
export const SECTORS = writable([]);

export const CURRENT_INDICATOR = writable(null);
export const DICTIONARY_INDICATORS = derived(INDICATORS, $indicators => keyBy($indicators, 'uid'));

export const CURRENT_GEOGRAPHY = writable(null);
export const HOVER_GEOGRAPHY_UID = writable(null);
export const CURRENT_SCENARIOS = writable([]);

export const DICTIONARY_SECTORS = derived(SECTORS, $sectors => keyBy($sectors, 'uid'));

/* GEOGRAPHIES */
export const GEOGRAPHY_TYPES = writable({});
export const CURRENT_GEOGRAPHY_TYPE_INDEX = writable(0);
export const CURRENT_GEOGRAPHY_TYPE = derived(
	[CURRENT_GEOGRAPHY_TYPE_INDEX, GEOGRAPHY_TYPES],
	([$index, $types]) => get($types, [$index])
);

export const CURRENT_GEOGRAPHY_UID = derived(
	CURRENT_GEOGRAPHY,
	$geography => get($geography, 'uid')
);

export const CURRENT_SCENARIOS_UID = derived(
	CURRENT_SCENARIOS,
	$scenarios => $scenarios.map(({ uid }) => uid)
);

export const CURRENT_INDICATOR_UID = derived(
	CURRENT_INDICATOR,
	$indicator => get($indicator, 'uid')
);

export const IMPACT_TIME_DATA = writable({});

/* SECTOR */
export const CURRENT_SECTOR_INDEX = writable(0);

export const AVAILABLE_INDICATORS = derived(
	[CURRENT_GEOGRAPHY_TYPE, DICTIONARY_INDICATORS],
	([$type, $indicators]) => {
		return compact(get($type, 'availableIndicators', []).map(indicator => {
			const item = get($indicators, indicator);
			if (isUndefined(item)) {
				if (!isEmpty($indicators)) { // TODO: Check for null?
					console.warn(`Indicator with id ${indicator} was not found.`);
				}
				return null
			}
			return item;
		}))
	}
);

export const AVAILABLE_INDICATOR_GROUPS = derived(
	[AVAILABLE_INDICATORS, SECTORS],
	([$indicators, $sectors]) => {
		const groups = groupBy($indicators, 'sector');
		return $sectors.map(sector => {
			const { uid } = sector;
			const indicators = get(groups, uid);
			return {
				sector,
				indicators,
				isAvailable: Boolean(indicators)
			}
		})
});
