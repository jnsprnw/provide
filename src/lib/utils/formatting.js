import { formatDefaultLocale, formatLocale } from "d3-format";

export const NA_STRING = "—";
export const FORMAT_CURRENCY = "$,.0f";
export const FORMAT_INTEGER = ",.0f";
export const FORMAT_TON = ".0s";
export const FORMAT_FLOAT = ",.1f";
export const FORMAT_YEAR = ".0f";
export const FORMAT_CELSIUS = ".1f";
export const FORMAT_PERCENT = ".0%";

// the basic formatting function sued
const f = formatLocale({
  ...formatDefaultLocale,
  decimal: ".",
  currency: ["", "  €"],
  percent: " %",
  nan: NA_STRING,
  thousands: ",",
  grouping: [3],
}).format;

// functions based on indicator type
const indicatorFormats = {
  integer: f(FORMAT_INTEGER),
  currency: f(FORMAT_CURRENCY),
  float: f(FORMAT_FLOAT),
  percent: f(FORMAT_PERCENT),
  year: f(FORMAT_YEAR),
  celsius: f(FORMAT_CELSIUS),
  'degrees-celsius': f(FORMAT_CELSIUS), // Do we want to have degrees twice?
  ton: f(FORMAT_TON),

  // format for anything else
  default: f(FORMAT_INTEGER),
};

const suffixes = {
  celsius: ' °C',
  'degrees-celsius': ' °C', // Do we want to have degrees twice?
  gty: ' Gt/y'
}

export const formatValue = (d, indicatorId) => {
  const formatter = indicatorFormats[indicatorId] || indicatorFormats["default"];
  const value = formatter(d);
  const suffix = suffixes[indicatorId];
  return suffix ? value + suffix : value;
};
