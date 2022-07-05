function formatValue (value, unit) {
	if (unit === 'celsius') {
		return `${value} °C`;
	} else if (unit === 'year') {
		return value
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
	return obj['uid'];
}
