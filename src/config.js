export const TITLE_SITE = 'Climate Risk Dashboard';
export const TITLE_PROJECT = 'PROVIDE';

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

// TODO: Not sure if this is the best place for these options since they are not global
export const IMPACT_GEO_YEARS = [
  {
    uid: '2030',
    label: '2030',
  },
  {
    uid: '2050',
    label: '2050',
  },
  {
    uid: '2100',
    label: '2100',
  },
];

export const IMPACT_GEO_DISPLAY_OPTIONS = [
  {
    label: 'Difference',
    value: 'difference',
  },
  {
    label: 'Side by side',
    value: 'side-by-side',
  },
];
