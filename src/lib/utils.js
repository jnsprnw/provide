function formatValue (value, unit) {
	if (unit === 'celsius') {
		return `${value} °C`;
	} else if (unit === 'year') {
		return value
	}
	return value;
}

export const formatValues = function (value, unit, isRange = false) {
	if (isRange) {
		return value.map(d => formatValue(d, unit)).join('—');
	} else {
		return formatValue(value, unit);
	}
}
