export const TITLE_SITE = 'Climate Risk Dashboard';
export const TITLE_PROJECT = 'PROVIDE';

export const ANCHOR_DOCS_SCENARIOS = 'scenarios';
export const ANCHOR_DOCS_MODELS = 'models';
export const ANCHOR_DOCS_DATA_PROCESSING = 'data-processing';

export const PATH_DOCUMENTATION = 'documentation';
export const PATH_EXPLAINERS = 'explainers';
export const PATH_CONTACT = 'contact';
export const PATH_ABOUT = 'about';

export const LABEL_DOCUMENTATION = 'Methodology';
export const LABEL_EXPLAINERS = 'Explainers';
export const LABEL_CONTACT = 'Contact';
export const LABEL_ABOUT = 'About';

// TODO: Should be handled through env variables
export const IS_STAGING_VERSION = true;

export const END_IMPACT_TIME = 'impact-time';
export const END_IMPACT_TIME_ALL = 'impact-time-all';
export const END_DISTRIBUTION = 'impact-time-distribution';
export const END_UN_AVOIDABLE_RISK = 'unavoidable-risk';
export const END_IMPACT_GEO = 'impact-geo';
export const END_GEO_SHAPE = 'geo-shape';
export const END_AVOIDING_IMPACTS = 'avoiding-impacts';

export const STATUS_LOADING = 'loading';
export const STATUS_SUCCESS = 'success';
export const STATUS_FAILED = 'failed';

export const UID_WORLD = 'world'; // TODO: There is no world so far
export const KEY_MODEL = 'model';
export const KEY_SOURCE = 'source';
export const KEY_LABEL = 'label';
export const KEY_LABEL_LONG = 'labelLong';

export const KEY_SCENARIOPRESET_UID = 'uid';

export const KEY_CHARACTERISTICS = 'characteristics';

export const LOCALSTORE_INDICATOR = 'indicator';
export const LOCALSTORE_GEOGRAPHY = 'geography';
export const LOCALSTORE_SCENARIOS = 'scenarios';

export const MEAN_TEMPERATURE_UID = 'terclim-mean-temperature';
export const EMISSIONS_UID = 'emissions';
export const UNAVOIDABLE_UID = 'unavoidable';

export const SCENARIO_DATA_KEYS = [EMISSIONS_UID, MEAN_TEMPERATURE_UID];

export const DEFAULT_INDICATOR_UID = MEAN_TEMPERATURE_UID; // TODO: Not used.
export const DEFAULT_GEOGRAPHY_UID = 'DEU';
export const DEFAULT_SCENARIOS_UID = ['curpol'];
export const DEFAULT_FORMAT_UID = 'float';

export const GEOGRAPHIES_IN_AVOIDING_IMPACTS = ['cities']; // Which geographies are allowed for avoiding impacts?

// Map colors...should come from tokens at some point
export const POSITIVE_RANGE = ['#F9CEA6', '#C91C1C'];
export const NEGATIVE_RANGE = ['#437E8E', '#DACFBF'];
export const DIVERGING_RANGE = ['#437E8E', '#F4E4D6', '#C91C1C'];

export const MAX_NUMBER_SELECTABLE_SCENARIOS = 3;

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
