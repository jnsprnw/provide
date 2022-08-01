import { format } from 'd3-format';
import has from 'lodash/has';
import set from "lodash/set";
import compact from "lodash/compact";
import { handle } from "$lib/api/api.js";
import qs from "qs";
import { browser } from "$app/env";

const formatCelius = format(".1f");
const formatPercent = format(".0%");
const formatGt = format(".1f");

function formatValue (value, unit) {
	if (unit === 'celsius') {
		return `${formatCelius(value)} °C`;
	} else if (unit === 'percent') {
		return formatPercent(value)
	} else if (unit === 'year') {
		return value
	} else if (unit === 'gty') {
		return `${formatGt(value)} Gt/y`;
	}
	return value;
}

export const formatValues = function (value, unit, isRange = false) {
	if (typeof value === 'undefined') {
		return '—'
	}
	if (isRange) {
		return value.map(d => formatValue(d, unit)).join('—');
	} else {
		return formatValue(value, unit);
	}
}

export const loadFromAPI = function (url, fetch) {
	return new Promise(async (resolve) => {
		const res = await fetch(`https://provide-cms.herokuapp.com/api/${url}?populate=*`);
	  const data = await res.json();
	  resolve(data.data);
	});
}

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
	console.log("loading:", { params, url, query }, `${url}?${query}`);
	const response = await fetch(`${url}?${query}`);
  const body = await response.json();
  console.log({ body })
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