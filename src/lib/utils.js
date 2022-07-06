import { format } from 'd3-format';

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

export const getUID = function (obj) {
	return obj?.uid || null;
}
