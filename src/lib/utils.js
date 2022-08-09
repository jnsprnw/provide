import { format } from 'd3-format';
import { has, set, compact } from "lodash-es";
import { handle } from "$lib/api/api.js";
import qs from "qs";
import { browser } from "$app/env";

export const getUID = function (obj) {
	return obj?.uid || null;
}

// export const buildDataImpactTime = function (data, year, step) {
// 	const datum = [];
// 	const length = data['median'].length;
// 	for (let i = 0; i < length; i++) {
// 		datum.push([year + i * step, data['median'][i], data['p10'][i], data['p90'][i]])
// 	}
// 	return datum;
// }

async function request (params, url) {
	if (!browser) return undefined;
	const query = qs.stringify(
    params,
    {
      encodeValuesOnly: true,
    }
  );
	// console.log("loading:", { params, url, query }, `${url}?${query}`);
	const response = await fetch(`${url}?${query}`);
  const body = await response.json();
	return body;
}

export function hasInObject (data, addr, param) {
	return compact(addr.map((a, i) => {
		return has(data, a) ? false : param[i];
	}))
}

function updateDate (old, addr, newData) {
	const obj = old;
	set(obj, addr, newData);
	return obj;
}

async function load (cache, endpoint, params, url) {
	// addr will always returns an array of scenarios, but it is only one element long given the params
	const addr = handle(endpoint, "addr", params)[0];
	cache.update((old) => updateDate(old, addr, { status: "loading", data: {} }))
	const newData = await request(params, url);
	cache.update((old) => updateDate(old, addr, { status: "success", data: newData }))
}

export function check (endpoint, store, missing, url) {
	// "has" returns an array with all the missing data.
	// const missing = handle(endpoint, "has", params);
	missing.forEach(request => {
		// We load each missing data point. In our case, a list of scenarios with other parameters
		load(store, endpoint, request, url);
	})
}