import { writable, derived } from 'svelte/store';
import { get, compact, groupBy, keyBy, map, isUndefined, isEmpty } from "lodash-es";
import { OPTIONS, DEFAULT_FORMAT_UID } from "$lib/../config.js";

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

export const CURRENT_INDICATOR_UNIT = derived(
	CURRENT_INDICATOR,
	$indicator => get($indicator, 'unit', DEFAULT_FORMAT_UID)
);

export const CURRENT_INDICATOR_OPTIONS_SELECTION = writable({});

export const CURRENT_INDICATOR_OPTIONS = derived(
	CURRENT_INDICATOR,
	$indicator => {
		const defs = {};
		const list = compact(get($indicator, 'options', []).map(([option, def]) => {
			defs[option] = def; // Setting the default value;
			const options = get(OPTIONS, option);
			if (!options) {
				console.warn(`Option ${option} was not found. Please check the config file.`);
				return false;
			}
			return {
				...options,
				key: option // TODO: Maybe we should write that directly into the options so we safe some time here.
			};
		}))
		CURRENT_INDICATOR_OPTIONS_SELECTION.update(old => ({ ...old, ...defs })); // Updating the current option selection with the default values.
		// TODO: Maybe we should overwrite the previously selection options with the new default values.
		return list;
	}
);

export const IMPACT_TIME_DATA = writable({});

/* SECTOR */
// We are using Index here because Tabs and TabContent
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
