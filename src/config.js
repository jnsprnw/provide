console.log(
  `VITE_MAPBOX_ACCESS_TOKEN: ${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}\n`,
  `VITE_MAPBOX_STYLE_LIGHT: ${import.meta.env.VITE_MAPBOX_STYLE_LIGHT}\n`,
  `VITE_DATA_API_URL: ${import.meta.env.VITE_DATA_API_URL}\n`,
  `VITE_STRAPI_LOCALE: ${import.meta.env.VITE_STRAPI_LOCALE}\n`,
  `VITE_HEROKU_URL: ${import.meta.env.VITE_HEROKU_URL}\n`,
  `VITE_SCREENSHOT_URL: ${import.meta.env.VITE_SCREENSHOT_URL}\n`,
  `VITE_APP_URL: ${import.meta.env.VITE_APP_URL}\n`
);

export const TITLE_SITE = 'Climate Risk Dashboard';
export const TITLE_PROJECT = 'PROVIDE';

export const IS_STAGING_VERSION = true;

export const END_IMPACT_TIME = 'impact-time';
export const END_IMPACT_TIME_ALL = 'impact-time-all';
export const END_DISTRIBUTION = 'impact-time-distribution';
export const END_UN_AVOIDABLE_RISK = 'unavoidable-risk';
export const END_IMPACT_GEO = 'impact-geo';
export const END_GEO_SHAPE = 'geo-shape';
export const SCENARIO_DATA_KEYS = ['emissions', 'mean-temperature'];
export const STATUS_LOADING = 'loading';
export const STATUS_SUCCESS = 'success';
export const STATUS_FAILED = 'failed';
export const UID_WORLD = 'world'; // TODO: There is no world so far
export const KEY_MODEL = 'model';
export const KEY_SOURCE = 'source';
export const KEY_PARAMETERS = 'parameters';
export const KEY_LABEL = 'label';
export const KEY_LABEL_LONG = 'labelLong';

export const DEFAULT_FORMAT_UID = 'float';

export const SHIFTING_PATHWAYS_UID = 'sp';
export const CURRENT_POLICY_UID = 'curpol';
export const MEAN_TEMPERATURE_UID = 'mean-temperature';
export const HOT_EXTREME_UID = 'hot-extreme';
export const PRESENT_DAY_UID = 'present-day';
export const UNAVOIDABLE_UID = 'unavoidable';

export const DEFAULT_INDICATOR_UID = 'mean-temperature';
export const DEFAULT_GEOGRAPHY_UID = 'DEU';
export const DEFAULT_SCENARIOS_UID = ['curpol'];

// Map colors...should come from tokens at some point
export const POSITIVE_RANGE = ['#F9CEA6', '#C91C1C'];
export const NEGATIVE_RANGE = ['#437E8E', '#DACFBF'];
export const DIVERGING_RANGE = ['#437E8E', '#F4E4D6', '#C91C1C'];

// TODO: Not sure if this is the best place for these options since they are not global
export const DEFAULT_IMPACT_GEO_YEAR = 2030;
export const IMPACT_GEO_YEARS = [
  {
    uid: 2030,
    label: '2030',
  },
  {
    uid: 2050,
    label: '2050',
  },
  {
    uid: 2100,
    label: '2100',
  },
  {
    uid: 2200,
    label: '2200',
  },
  {
    uid: 2300,
    label: '2300',
  },
];

export const IMPACT_GEO_DISPLAY_OPTIONS = [
  {
    label: 'Difference',
    uid: 'difference',
  },
  {
    label: 'Side by side',
    uid: 'side-by-side',
  },
];
