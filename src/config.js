export const TITLE_SITE = 'Climate Risk Dashboard';
export const TITLE_PROJECT = 'PROVIDE';

export const ANCHOR_DOCS_SCENARIOS = 'scenarios';
export const ANCHOR_DOCS_MODELS = 'models';
export const ANCHOR_DOCS_DATA_PROCESSING = 'data-processing';
export const ANCHOR_EXPLAINER_SCENARIOS = 'scenarios';

// NOTE: You also need to change the corresponding folder name!
export const PATH_DOCUMENTATION = 'methodology';
export const PATH_CONTACT = 'contact';
export const PATH_ABOUT = 'about';
export const PATH_EXPLORE = 'impacts';
export const PATH_AVOID = 'avoid';
export const PATH_IMPACT = 'explore';
export const PATH_GLOSSARY = 'glossary';
export const PATH_ADAPTATION = 'adaptation';

// These will also be used for page titles
export const LABEL_DOCUMENTATION = 'Methodology';
export const LABEL_CONTACT = 'Contact';
export const LABEL_ABOUT = 'About';
export const LABEL_EXPLORE = 'Explore';
export const LABEL_GLOSSARY = 'Glossary';
export const LABEL_FUTURE_IMPACTS = 'Future impacts';
export const LABEL_AVOID_IMPACTS = 'Avoiding future impacts';
export const LABEL_ADAPTATION = 'Adaptation';

export const LABEL_SCENARIOS_INTRO = 'Scenarios';
export const LABEL_SCENARIOS_TIMEFRAMES = 'Timeframes';
export const LABEL_SCENARIOS_PRESETS = 'Scenario presets';
export const LABEL_SCENARIOS_LIST = 'Scenario list';
export const LABEL_SCENARIOS_TIMELINES = 'Scenario timelines';

export const LABEL_ADAPTATION_PLANNING = 'Using the climate risk dashboard for adaptation planning';
export const LABEL_ADAPTATION_ASSESSMENT = 'Overshoot Proofing self-assessment tool';
export const LABEL_ADAPTATION_LONG_TERM = 'Integrating limits on long-term adaptation planning';
export const LABEL_ADAPTATION_PATHWAYS = 'Adaptation Pathways ';
export const LABEL_ADAPTATION_RESOURCES = 'Complimentary resources';
export const LABEL_ADAPTATION_STUDIES = 'Further studies';

export const END_IMPACT_TIME = 'impact-time';
export const END_IMPACT_TIME_ALL = 'impact-time-all';
export const END_DISTRIBUTION = 'impact-time-distribution';
export const END_UN_AVOIDABLE_RISK = 'unavoidable-risk';
export const END_IMPACT_GEO = 'impact-geo';
export const END_GEO_SHAPE = 'geo-shape';
export const END_AVOIDING_IMPACTS = 'avoiding-impacts';
export const END_AVOIDING_REFERENCE = 'avoiding-reference';

export const STATUS_LOADING = 'loading';
export const STATUS_SUCCESS = 'success';
export const STATUS_PROCESSING = 'processing';
export const STATUS_FAILED = 'failed';
export const STATUS_IDLE = 'idle';
export const STATUS_FINISHED = 'finished';

export const UID_WORLD = 'world'; // TODO: There is no world so far
export const KEY_MODEL = 'model';
export const KEY_SOURCE = 'source';
export const KEY_LABEL = 'label';
export const KEY_LABEL_LONG = 'labelLong';

export const KEY_PARAMETER_INDICATOR_VALUE = 'indicator_value';
export const KEY_SCENARIO_TIMEFRAME = 'endYear';

export const KEY_SCENARIOPRESET_UID = 'uid';

export const KEY_CHARACTERISTICS = 'characteristics';
export const KEY_SCENARIO_YEAR_DESCRIPTION = 'descriptionYears';

export const LOCALSTORE_INDICATOR = 'indicator';
export const LOCALSTORE_GEOGRAPHY = 'geography';
export const LOCALSTORE_SCENARIOS = 'scenarios';
export const LOCALSTORE_LIKELIHOOD = 'likelihood';
export const LOCALSTORE_STUDY_LOCATION = 'study_location';
export const LOCALSTORE_LEVEL_OF_IMACT = 'level_of_impact';
export const LOCALSTORE_PARAMETERS = 'parameters';

export const URL_PATH_INDICATOR = 'indicator';
export const URL_PATH_GEOGRAPHY = 'geography';
export const URL_PATH_SCENARIOS = 'scenarios';
export const URL_PATH_TIME = 'time';
export const URL_PATH_REFERENCE = 'reference';
export const URL_PATH_FREQUENCY = 'frequency';
export const URL_PATH_SPATIAL = 'spatial';
export const URL_PATH_INDICATOR_VALUE = 'indicator_value';
export const URL_PATH_LEVEL_OF_IMPACT = 'level_of_impact';
export const URL_PATH_CERTAINTY_LEVEL = 'certainty_level';
export const URL_PATH_GEOGRAPHY_TYPE = 'geography-type'; // Impact Geo endpoint
export const URL_PATH_SCENARIO = 'scenario';
export const URL_PATH_YEAR = 'year';
export const URL_PATH_STUDY_LOCATION = 'study-location';

export const UID_STUDY_LOCATION_AVERAGE = 'city-average';

export const MEAN_TEMPERATURE_UID = 'gmt';
export const EMISSIONS_UID = 'emissions';
export const UNAVOIDABLE_UID = 'unavoidable';

export const UID_NO_UNIT = 'no unit';

export const SCENARIO_DATA_KEYS = [EMISSIONS_UID, MEAN_TEMPERATURE_UID];

export const DEFAULT_INDICATOR_UID = MEAN_TEMPERATURE_UID; // TODO: Not used.
export const DEFAULT_GEOGRAPHY_UID = 'DEU';
export const DEFAULT_SCENARIOS_UID = ['curpol'];
export const DEFAULT_FORMAT_UID = 'float';

export const GEOGRAPHY_TYPE_CITY = 'cities';
export const GEOGRAPHY_TYPES_IN_AVOIDING_IMPACTS = [GEOGRAPHY_TYPE_CITY]; // Which geographies are allowed for avoiding impacts?
export const SCENARIOS_IN_AVOIDING_IMPACTS = ['gs', 'sp', 'curpol']; // This order also corresponds to the colors set in the design token’s categories

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

export const IMPACT_GEO_KEY_DIFFERENCE = 'difference';
export const IMPACT_GEO_KEY_SIDE_BY_SIDE = 'side-by-side';

export const IMPACT_GEO_DISPLAY_OPTIONS = [
  {
    label: 'Difference',
    uid: IMPACT_GEO_KEY_DIFFERENCE,
  },
  {
    label: 'Side by side',
    uid: IMPACT_GEO_KEY_SIDE_BY_SIDE,
  },
];

export const WORKER_MESSAGE_START = 'worker_start';
