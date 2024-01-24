import { DEFAULT_FORMAT_UID, UID_NO_UNIT } from '$src/config';
import { formatDefaultLocale, formatLocale } from 'd3-format';
import { maxBy } from 'lodash-es';

export const NA_STRING = '—';
export const FORMAT_CURRENCY = '$,.0f';
export const FORMAT_INTEGER = ',.0f';
export const FORMAT_EMISSION = '.0s';
export const FORMAT_FLOAT = ',.1f';
export const FORMAT_YEAR = '.0f';
export const FORMAT_CELSIUS = '.1f';
export const FORMAT_WARMING = '+.2f';
export const FORMAT_PERCENT = '.0%';
export const FORMAT_DEGREE = '.3~f';

export const FORMAT_PERCENT_DECIMALS = (d = 0) => f(`.${d}%`);
export const FORMAT_DEFAULT_DECIMALS = (d = 1) => f(`.${d}f`);

export const KEY_DEGREES_CELSIUS = 'degrees-celsius';
export const KEY_DEGREES_WARMING = 'degrees-warming';

// the basic formatting function sued
const f = formatLocale({
  ...formatDefaultLocale,
  decimal: '.',
  currency: ['', ' €'],
  percent: ' %',
  nan: NA_STRING,
  thousands: ',',
  grouping: [3],
}).format;

// functions based on indicator type
const indicatorFormats = {
  integer: f(FORMAT_INTEGER),
  currency: f(FORMAT_CURRENCY),
  float: f(FORMAT_FLOAT),
  percent: f(FORMAT_PERCENT),
  'percent-in-range': f('.0f'),
  year: f(FORMAT_YEAR),
  [KEY_DEGREES_CELSIUS]: f(FORMAT_CELSIUS),
  [KEY_DEGREES_WARMING]: f(FORMAT_WARMING),
  'gigaton-co2eq-year': f(FORMAT_EMISSION),
  degree: f(FORMAT_DEGREE),

  // format for anything else
  default: f(FORMAT_INTEGER),
};

const suffixes = {
  [KEY_DEGREES_CELSIUS]: ' °C',
  [KEY_DEGREES_WARMING]: ' °C',
  degree: ' °',
};

export const formatValue = (value, indicatorId = DEFAULT_FORMAT_UID, { addSuffix = true, formatter: customFormatter = undefined, decimals, matchDecimals = false } = {}) => {
  if (matchDecimals) {
    decimals = getDecimals(value);
  }
  if (typeof decimals !== 'undefined' && typeof customFormatter === 'undefined') {
    customFormatter = getFormatter(indicatorId, decimals);
  }
  const formatter = customFormatter || indicatorFormats[indicatorId] || indicatorFormats['default'];
  const str = formatter(value);
  const suffix = addSuffix && suffixes[indicatorId];
  return suffix ? str + suffix : str;
};

function getFormatter(unit, decimals) {
  switch (unit) {
    case 'percent':
      return FORMAT_PERCENT_DECIMALS(decimals);
    default:
      return FORMAT_DEFAULT_DECIMALS(decimals);
  }
}

export function formatRange(range, unit, minDecimals = 0) {
  // This function formats a range of values with all resulting strings to be unique
  const decimalsMax = 4;
  let decimals = minDecimals;
  let formatter = getFormatter(unit, decimals);
  let values = range.map((d) => formatValue(d, unit, { formatter }));
  while (
    values.some((value, index) => values.indexOf(value) !== index) && // Check if values have any dublicates
    decimals < decimalsMax
  ) {
    decimals += 1;
    formatter = getFormatter(unit, decimals);
    values = range.map((d) => formatValue(d, unit, { formatter })); // Reformat values with one more decimal
  }
  return {
    decimals,
    values,
  };
}

export function findDecimalsForDistinctValues(values, unit, minDecimals = 0, maxDecimals = 4) {
  // This function formats a values of values with all resulting strings to be unique
  const decimalsMax = maxDecimals;
  let decimals = minDecimals;
  let formatter = getFormatter(unit, decimals);
  let strings = values.map((d) => formatValue(d, unit, { formatter }));
  while (
    strings.some((value, index) => strings.indexOf(value) !== index) && // Check if strings have any dublicates
    decimals < decimalsMax
  ) {
    decimals += 1;
    formatter = getFormatter(unit, decimals);
    strings = values.map((d) => formatValue(d, unit, { formatter })); // Reformat values with one more decimal
  }
  return decimals;
}

function getDecimals(value) {
  if (typeof value !== 'undefined') {
    if (value % 1 != 0) {
      return value.toString().split('.')[1].length;
    }
  }
  return 0;
}

export function findMostDecimals(values) {
  return getDecimals(maxBy(values, (v) => getDecimals(v)));
}

export function formatUnit(unit, { inSentence = false, isLabelLong = false } = {}) {
  if (unit?.label && ((unit?.uid !== KEY_DEGREES_CELSIUS && unit?.uid !== KEY_DEGREES_WARMING) || inSentence)) {
    if (unit.uid !== UID_NO_UNIT) {
      const label = isLabelLong || inSentence ? unit.labelLong ?? unit.label : unit.label;
      if (inSentence) {
        return ` in ${label}`;
      }
      return `&#8239;${label}`;
    }
  }
  return '';
}
