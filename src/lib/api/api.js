import { get as take } from 'svelte/store';
import get from 'lodash/get';
import { check, hasInObject } from "$lib/utils.js";
import isArray from "lodash/isArray";
import { END_IMPACT_TIME, END_DISTRIBUTION } from '$lib/../config.js';
import { IMPACT_TIME_CACHE } from "$lib/../stores/impact-time.js";
import { CURRENT_GEOGRAPHY_UID, CURRENT_SCENARIOS_UID, CURRENT_INDICATOR_UID } from "$lib/../stores/store.js";

export function handle(
	endpoint,
	callback,
	params = {},
	trigger // This is used for the custom requests. Since the need to be reactive, we need the store to be used in the function call. We basically through it away and don‘t use it.
) {
	let addr;
	let data;
	let store;
	let param;
	let url;

	const geography = params.geography || take(CURRENT_GEOGRAPHY_UID);
	const indicator = params.indicator || take(CURRENT_INDICATOR_UID);
	let scenarios = params.scenarios || take(CURRENT_SCENARIOS_UID);
	scenarios = isArray(scenarios) ? scenarios : [scenarios];

	if (!geography || !indicator || scenarios.length === 0) {
		return undefined;
	}
	
	switch (endpoint) {
		case END_IMPACT_TIME:
			addr = scenarios.map(scenario => [geography, scenario, indicator]);
			param = scenarios.map(scenario => ({ geography, indicator, scenarios: [scenario] })) // We need this for the load function
			data = take(IMPACT_TIME_CACHE);
			store = IMPACT_TIME_CACHE;
			url = "/api/impact-time";
			break;
			// case END_DISTRIBUTION:
			// …
			// 	break;
	}
	if (addr && data && store && url) {
		let missing;
		if (callback === "get" || callback === "has") {
			missing = hasInObject(data, addr, param);
		}
		if (callback === "get") {
			// We always check if the data is available to trigger a load.
			// We could probably make this faster by not letting check call handle again, but instead call the load function from here directly with the list of missing data points.
			if (missing.length) {
				check(endpoint, store, missing, url);
			}
			// We could also just return the array and let the component extract the first (and only) value
			// return addr.map(a => get(data, a));
			const values = addr.map(a => get(data, a));
			return values.length > 1 ? values : values[0];
		} else if (callback === "has") {
			// We return a list of missing data points
			return missing;
		} else if (callback === "addr") {
			return addr;
		}
	}
	return undefined;
}
