import { formatDefaultLocale, formatLocale } from "d3-format";

export const NA_STRING = "—";
export const CURRENCY_FORMAT = "$,.0f";
export const PERCENT_FORMAT = ".1%";
export const INTEGER_FORMAT = ",.0f";
export const FLOAT_FORMAT = ",.1f";

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
  integer: f(INTEGER_FORMAT),
  currency: f(CURRENCY_FORMAT),
  float: f(FLOAT_FORMAT),
  roce: f(PERCENT_FORMAT),
  returnOnSales: f(PERCENT_FORMAT),
  capitalTurnOver: f(PERCENT_FORMAT),

  // format for anything else
  default: f(INTEGER_FORMAT),
};

export const formatValue = (value, indicatorId) => {
  const formatter =
    indicatorFormats[indicatorId] || indicatorFormats["default"];
  return formatter(value);
};
