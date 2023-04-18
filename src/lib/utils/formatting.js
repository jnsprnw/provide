import { formatDefaultLocale, formatLocale } from 'd3-format';
import { DEFAULT_FORMAT_UID } from '$src/config';

export const NA_STRING = '—';
export const FORMAT_CURRENCY = '$,.0f';
export const FORMAT_INTEGER = ',.0f';
export const FORMAT_EMISSION = '.0s';
export const FORMAT_FLOAT = ',.1f';
export const FORMAT_YEAR = '.0f';
export const FORMAT_CELSIUS = '.1f';
export const FORMAT_PERCENT = '.0%';
export const FORMAT_DEGREE = '.1f';

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
  year: f(FORMAT_YEAR),
  'degrees-celsius': f(FORMAT_CELSIUS),
  'gigaton-co2eq-year': f(FORMAT_EMISSION),
  degree: f(FORMAT_DEGREE),

  // format for anything else
  default: f(FORMAT_INTEGER),
};

const suffixes = {
  'degrees-celsius': ' °C',
  degree: ' °',
};

export const formatValue = (
  d,
  indicatorId = DEFAULT_FORMAT_UID,
  { addSuffix } = { addSuffix: true }
) => {
  let indicator = indicatorId;
  if (indicator === 'celsius') {
    // Fixed for now. TODO
    indicator = 'degrees-celsius';
  }
  const formatter = indicatorFormats[indicator] || indicatorFormats['default'];
  const value = formatter(d);
  const suffix = addSuffix && suffixes[indicator];
  return suffix ? value + suffix : value;
};
