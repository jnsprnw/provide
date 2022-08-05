export const END_IMPACT_TIME = 'impact-time';
export const END_DISTRIBUTION = 'dist';
export const END_UN_AVOIDABLE_RISK = 'un-avoidable-risk';
export const END_IMPACT_GEO = 'impact-geo';

export const DEFAULT_FORMAT_UID = 'float';

export const OPTIONS = {
  time: {
    options: [
      {
        value: 'annual',
        label: 'Annual',
      },
    ],
  },
  reference: {
    options: [
      {
        value: '2020',
        label: '2020',
      },
      {
        value: 'pre',
        label: '1850–1900',
      },
    ],
  },
  frequency: {
    options: [
      {
        value: '0-1',
        label: '1-in-10',
      },
      {
        value: '0-05',
        label: '1-in-20',
      },
      {
        value: '0-02',
        label: '1-in-50',
      },
    ],
  },
  spatial: {
    options: [
      {
        value: 'area',
        label: 'area-weighted average',
      },
      {
        value: 'gdp',
        label: 'GDP-weighted average',
      },
      {
        value: 'population',
        label: 'population-weighted average',
      },
    ],
  },
};

export const GEOGRAPHY_TYPES = [
  {
    uid: 'admin0',
    label: 'Countries',
    availableIndicators: [
      'tas',
      'wet-bulb-globe-temperature',
      'outlier-days',
      'precipitation',
    ],
    isAvailable: true,
    emoji: '🗺️',
  },
  {
    uid: 'admin1',
    label: 'Regions',
    availableIndicators: [],
    isAvailable: false,
    emoji: '🏞️',
  },
  {
    uid: 'cities',
    label: 'Cities',
    availableIndicators: [],
    isAvailable: false,
    emoji: '🏢',
  },
  {
    uid: 'iconicRegions',
    label: 'Key regions',
    availableIndicators: [],
    isAvailable: false,
    emoji: '📍',
  },
  {
    uid: 'glaciers',
    label: 'Glaciers',
    availableIndicators: [],
    isAvailable: false,
    emoji: '🧊',
  },
  {
    uid: 'breadbaskets',
    label: 'Breadbaskets',
    availableIndicators: [],
    isAvailable: false,
    emoji: '🌾',
  },
];

export const CONTINENTS = [
  {
    uid: 'EU',
    label: 'Europe',
  },
  {
    uid: 'AS',
    label: 'Asia',
  },
  {
    uid: 'AF',
    label: 'Africa',
  },
  {
    uid: 'OC',
    label: 'Oceania',
  },
  {
    uid: 'NA',
    label: 'North America',
  },
  {
    uid: 'SA',
    label: 'South America',
  },
];

export const ADMIN_0 = [
  {
    uid: 'unknown',
    label: 'World',
  },
  {
    label: 'Afghanistan',
    uid: 'AFG',
    region: 'AS',
  },
  {
    label: 'Åland Islands',
    uid: 'ALA',
    region: 'EU',
  },
  {
    label: 'Albania',
    uid: 'ALB',
    region: 'EU',
  },
  {
    label: 'Algeria',
    uid: 'DZA',
    region: 'AF',
  },
  {
    label: 'American Samoa',
    uid: 'ASM',
    region: 'OC',
  },
  {
    label: 'Andorra',
    uid: 'AND',
    region: 'EU',
  },
  {
    label: 'Angola',
    uid: 'AGO',
    region: 'AF',
  },
  {
    label: 'Anguilla',
    uid: 'AIA',
    region: 'NA',
  },
  {
    label: 'Antigua and Barbuda',
    uid: 'ATG',
    region: 'NA',
  },
  {
    label: 'Argentina',
    uid: 'ARG',
    region: 'SA',
  },
  {
    label: 'Armenia',
    uid: 'ARM',
    region: 'AS',
  },
  {
    label: 'Aruba',
    uid: 'ABW',
    region: 'SA',
  },
  {
    label: 'Australia',
    uid: 'AUS',
    region: 'OC',
  },
  {
    label: 'Austria',
    uid: 'AUT',
    region: 'EU',
  },
  {
    label: 'Azerbaijan',
    uid: 'AZE',
    region: 'AS',
  },
  {
    label: 'Bahamas',
    uid: 'BHS',
    region: 'NA',
  },
  {
    label: 'Bahrain',
    uid: 'BHR',
    region: 'AS',
  },
  {
    label: 'Bangladesh',
    uid: 'BGD',
    region: 'AS',
  },
  {
    label: 'Barbados',
    uid: 'BRB',
    region: 'NA',
  },
  {
    label: 'Belarus',
    uid: 'BLR',
    region: 'EU',
  },
  {
    label: 'Belgium',
    uid: 'BEL',
    region: 'EU',
  },
  {
    label: 'Belize',
    uid: 'BLZ',
    region: 'NA',
  },
  {
    label: 'Benin',
    uid: 'BEN',
    region: 'AF',
  },
  {
    label: 'Bermuda',
    uid: 'BMU',
    region: 'NA',
  },
  {
    label: 'Bhutan',
    uid: 'BTN',
    region: 'AS',
  },
  {
    label: 'Bolivia (Plurinational State of)',
    uid: 'BOL',
    region: 'SA',
  },
  {
    label: 'Bonaire, Sint Eustatius and Saba',
    uid: 'BES',
    region: 'SA',
  },
  {
    label: 'Bosnia and Herzegovina',
    uid: 'BIH',
    region: 'EU',
  },
  {
    label: 'Botswana',
    uid: 'BWA',
    region: 'AF',
  },
  {
    label: 'Bouvet Island',
    uid: 'BVT',
    region: 'NA',
  },
  {
    label: 'Brazil',
    uid: 'BRA',
    region: 'SA',
  },
  {
    label: 'British Indian Ocean Territory',
    uid: 'IOT',
    region: 'AF',
  },
  {
    label: 'United States Minor Outlying Islands',
    uid: 'UMI',
    region: 'NA',
  },
  {
    label: 'Virgin Islands (British)',
    uid: 'VGB',
    region: 'NA',
  },
  {
    label: 'Virgin Islands (U.S.)',
    uid: 'VIR',
    region: 'NA',
  },
  {
    label: 'Brunei Darussalam',
    uid: 'BRN',
    region: 'AS',
  },
  {
    label: 'Bulgaria',
    uid: 'BGR',
    region: 'EU',
  },
  {
    label: 'Burkina Faso',
    uid: 'BFA',
    region: 'AF',
  },
  {
    label: 'Burundi',
    uid: 'BDI',
    region: 'AF',
  },
  {
    label: 'Cambodia',
    uid: 'KHM',
    region: 'AS',
  },
  {
    label: 'Cameroon',
    uid: 'CMR',
    region: 'AF',
  },
  {
    label: 'Canada',
    uid: 'CAN',
    region: 'NA',
  },
  {
    label: 'Cabo Verde',
    uid: 'CPV',
    region: 'AF',
  },
  {
    label: 'Cayman Islands',
    uid: 'CYM',
    region: 'NA',
    demonym: 'Caymanian',
  },
  {
    label: 'Central African Republic',
    uid: 'CAF',
    region: 'AF',
  },
  {
    label: 'Chad',
    uid: 'TCD',
    region: 'AF',
  },
  {
    label: 'Chile',
    uid: 'CHL',
    region: 'SA',
  },
  {
    label: 'China',
    uid: 'CHN',
    region: 'AS',
  },
  {
    label: 'Christmas Island',
    uid: 'ISL',
    region: 'OC',
  },
  {
    label: 'Cocos (Keeling) Islands',
    uid: 'CCK',
    region: 'OC',
  },
  {
    label: 'Colombia',
    uid: 'COL',
    region: 'SA',
  },
  {
    label: 'Comoros',
    uid: 'COM',
    region: 'AF',
  },
  {
    label: 'Congo',
    uid: 'COG',
    region: 'AF',
  },
  {
    label: 'Congo (Democratic Republic of the)',
    uid: 'COD',
    region: 'AF',
  },
  {
    label: 'Cook Islands',
    uid: 'COK',
    region: 'OC',
  },
  {
    label: 'Costa Rica',
    uid: 'CRI',
    region: 'NA',
  },
  {
    label: 'Croatia',
    uid: 'HRV',
    region: 'EU',
  },
  {
    label: 'Cuba',
    uid: 'CUB',
    region: 'NA',
  },
  {
    label: 'Curaçao',
    uid: 'CUW',
    region: 'SA',
  },
  {
    label: 'Cyprus',
    uid: 'CYP',
    region: 'EU',
  },
  {
    label: 'Czech Republic',
    uid: 'CZE',
    region: 'EU',
  },
  {
    label: 'Denmark',
    uid: 'DNK',
    region: 'EU',
  },
  {
    label: 'Djibouti',
    uid: 'DJI',
    region: 'AF',
  },
  {
    label: 'Dominica',
    uid: 'DMA',
    region: 'NA',
  },
  {
    label: 'Dominican Republic',
    uid: 'DOM',
    region: 'NA',
  },
  {
    label: 'Ecuador',
    uid: 'ECU',
    region: 'SA',
  },
  {
    label: 'Egypt',
    uid: 'EGY',
    region: 'AF',
  },
  {
    label: 'El Salvador',
    uid: 'SLV',
    region: 'NA',
  },
  {
    label: 'Equatorial Guinea',
    uid: 'GNQ',
    region: 'AF',
  },
  {
    label: 'Eritrea',
    uid: 'ERI',
    region: 'AF',
  },
  {
    label: 'Estonia',
    uid: 'EST',
    region: 'EU',
  },
  {
    label: 'Ethiopia',
    uid: 'ETH',
    region: 'AF',
  },
  {
    label: 'Falkland Islands (Malvinas)',
    uid: 'FLK',
    region: 'SA',
  },
  {
    label: 'Faroe Islands',
    uid: 'FRO',
    region: 'EU',
  },
  {
    label: 'Fiji',
    uid: 'FJI',
    region: 'OC',
  },
  {
    label: 'Finland',
    uid: 'FIN',
    region: 'EU',
  },
  {
    label: 'France',
    uid: 'FRA',
    region: 'EU',
    demonym: 'French',
  },
  {
    label: 'French Guiana',
    uid: 'GUF',
    region: 'SA',
  },
  {
    label: 'French Polynesia',
    uid: 'PYF',
    region: 'OC',
  },
  {
    label: 'French Southern Territories',
    uid: 'ATF',
    region: 'AF',
  },
  {
    label: 'Gabon',
    uid: 'GAB',
    region: 'AF',
  },
  {
    label: 'Gambia',
    uid: 'GMB',
    region: 'AF',
  },
  {
    label: 'Georgia',
    uid: 'GEO',
    region: 'AS',
  },
  {
    label: 'Germany',
    uid: 'DEU',
    region: 'EU',
  },
  {
    label: 'Ghana',
    uid: 'GHA',
    region: 'AF',
  },
  {
    label: 'Gibraltar',
    uid: 'GIB',
    region: 'EU',
  },
  {
    label: 'Greece',
    uid: 'GRC',
    region: 'EU',
  },
  {
    label: 'Greenland',
    uid: 'GRL',
    region: 'NA',
  },
  {
    label: 'Grenada',
    uid: 'GRD',
    region: 'NA',
  },
  {
    label: 'Guadeloupe',
    uid: 'GLP',
    region: 'NA',
  },
  {
    label: 'Guam',
    uid: 'GUM',
    region: 'OC',
  },
  {
    label: 'Guatemala',
    uid: 'GTM',
    region: 'NA',
  },
  {
    label: 'Guernsey',
    uid: 'GGY',
    region: 'EU',
  },
  {
    label: 'Guinea',
    uid: 'GIN',
    region: 'AF',
  },
  {
    label: 'Guinea-Bissau',
    uid: 'GNB',
    region: 'AF',
  },
  {
    label: 'Guyana',
    uid: 'GUY',
    region: 'SA',
  },
  {
    label: 'Haiti',
    uid: 'HTI',
    region: 'Americas',
  },
  {
    label: 'Heard Island and McDonald Islands',
    uid: 'HMD',
    region: 'OC',
  },
  {
    label: 'Holy See',
    uid: 'VAT',
    region: 'EU',
  },
  {
    label: 'Honduras',
    uid: 'HND',
    region: 'NA',
  },
  {
    label: 'Hong Kong',
    uid: 'HKG',
    region: 'AS',
  },
  {
    label: 'Hungary',
    uid: 'HUN',
    region: 'EU',
  },
  {
    label: 'Iceland',
    uid: 'ISL',
    region: 'EU',
  },
  {
    label: 'India',
    uid: 'IND',
    region: 'AS',
  },
  {
    label: 'Indonesia',
    uid: 'IDN',
    region: 'AS',
  },
  {
    label: "Côte d'Ivoire",
    uid: 'CIV',
    region: 'AF',
  },
  {
    label: 'Iran (Islamic Republic of)',
    uid: 'IRN',
    region: 'AS',
  },
  {
    label: 'Iraq',
    uid: 'IRQ',
    region: 'AS',
  },
  {
    label: 'Ireland',
    uid: 'IRL',
    region: 'EU',
  },
  {
    label: 'Isle of Man',
    uid: 'IMN',
    region: 'EU',
  },
  {
    label: 'Israel',
    uid: 'ISR',
    region: 'AS',
  },
  {
    label: 'Italy',
    uid: 'ITA',
    region: 'EU',
  },
  {
    label: 'Jamaica',
    uid: 'JAM',
    region: 'NA',
  },
  {
    label: 'Japan',
    uid: 'JPN',
    region: 'AS',
  },
  {
    label: 'Jersey',
    uid: 'JEY',
    region: 'EU',
  },
  {
    label: 'Jordan',
    uid: 'JOR',
    region: 'AS',
  },
  {
    label: 'Kazakhstan',
    uid: 'KAZ',
    region: 'AS',
  },
  {
    label: 'Kenya',
    uid: 'KEN',
    region: 'AF',
  },
  {
    label: 'Kiribati',
    uid: 'KIR',
    region: 'OC',
  },
  {
    label: 'Kuwait',
    uid: 'KWT',
    region: 'AS',
  },
  {
    label: 'Kyrgyzstan',
    uid: 'KGZ',
    region: 'AS',
  },
  {
    label: "Lao People's Democratic Republic",
    uid: 'LAO',
    region: 'AS',
  },
  {
    label: 'Latvia',
    uid: 'LVA',
    region: 'EU',
  },
  {
    label: 'Lebanon',
    uid: 'LBN',
    region: 'AS',
  },
  {
    label: 'Lesotho',
    uid: 'LSO',
    region: 'AF',
  },
  {
    label: 'Liberia',
    uid: 'LBR',
    region: 'AF',
  },
  {
    label: 'Libya',
    uid: 'LBY',
    region: 'AF',
  },
  {
    label: 'Liechtenstein',
    uid: 'LIE',
    region: 'EU',
  },
  {
    label: 'Lithuania',
    uid: 'LTU',
    region: 'EU',
  },
  {
    label: 'Luxembourg',
    uid: 'LUX',
    region: 'EU',
  },
  {
    label: 'Macao',
    uid: 'MAC',
    region: 'AS',
  },
  {
    label: 'Macedonia (the former Yugoslav Republic of)',
    uid: 'MKD',
    region: 'EU',
  },
  {
    label: 'Madagascar',
    uid: 'MDG',
    region: 'AF',
  },
  {
    label: 'Malawi',
    uid: 'MWI',
    region: 'AF',
  },
  {
    label: 'Malaysia',
    uid: 'MYS',
    region: 'AS',
  },
  {
    label: 'Maldives',
    uid: 'MDV',
    region: 'AS',
  },
  {
    label: 'Mali',
    uid: 'MLI',
    region: 'AF',
  },
  {
    label: 'Malta',
    uid: 'MLT',
    region: 'EU',
  },
  {
    label: 'Marshall Islands',
    uid: 'MHL',
    region: 'OC',
  },
  {
    label: 'Martinique',
    uid: 'MTQ',
    region: 'Americas',
  },
  {
    label: 'Mauritania',
    uid: 'MRT',
    region: 'AF',
  },
  {
    label: 'Mauritius',
    uid: 'MUS',
    region: 'AF',
  },
  {
    label: 'Mayotte',
    uid: 'MYT',
    region: 'AF',
  },
  {
    label: 'Mexico',
    uid: 'MEX',
    region: 'NA',
  },
  {
    label: 'Micronesia (Federated States of)',
    uid: 'FSM',
    region: 'OC',
  },
  {
    label: 'Moldova (Republic of)',
    uid: 'MDA',
    region: 'EU',
  },
  {
    label: 'Monaco',
    uid: 'MCO',
    region: 'EU',
  },
  {
    label: 'Mongolia',
    uid: 'MNG',
    region: 'AS',
  },
  {
    label: 'Montenegro',
    uid: 'MNE',
    region: 'EU',
  },
  {
    label: 'Montserrat',
    uid: 'MSR',
    region: 'NA',
  },
  {
    label: 'Morocco',
    uid: 'MAR',
    region: 'AF',
  },
  {
    label: 'Mozambique',
    uid: 'MOZ',
    region: 'AF',
  },
  {
    label: 'Myanmar',
    uid: 'MMR',
    region: 'AS',
  },
  {
    label: 'Namibia',
    uid: 'NAM',
    region: 'AF',
  },
  {
    label: 'Nauru',
    uid: 'NRU',
    region: 'OC',
  },
  {
    label: 'Nepal',
    uid: 'NPL',
    region: 'AS',
  },
  {
    label: 'Netherlands',
    uid: 'NLD',
    region: 'EU',
  },
  {
    label: 'New Caledonia',
    uid: 'NCL',
    region: 'OC',
  },
  {
    label: 'New Zealand',
    uid: 'NZL',
    region: 'OC',
  },
  {
    label: 'Nicaragua',
    uid: 'NIC',
    region: 'NA',
  },
  {
    label: 'Niger',
    uid: 'NER',
    region: 'AF',
  },
  {
    label: 'Nigeria',
    uid: 'NGA',
    region: 'AF',
  },
  {
    label: 'Niue',
    uid: 'NIU',
    region: 'OC',
  },
  {
    label: 'Norfolk Island',
    uid: 'NFK',
    region: 'OC',
  },
  {
    label: "Korea (Democratic People's Republic of)",
    uid: 'PRK',
    region: 'AS',
  },
  {
    label: 'Northern Mariana Islands',
    uid: 'MNP',
    region: 'OC',
  },
  {
    label: 'Norway',
    uid: 'NOR',
    region: 'EU',
  },
  {
    label: 'Oman',
    uid: 'OMN',
    region: 'AS',
  },
  {
    label: 'Pakistan',
    uid: 'PAK',
    region: 'AS',
  },
  {
    label: 'Palau',
    uid: 'PLW',
    region: 'OC',
  },
  {
    label: 'Palestine, State of',
    uid: 'PSE',
    region: 'AS',
  },
  {
    label: 'Panama',
    uid: 'PAN',
    region: 'NA',
  },
  {
    label: 'Papua New Guinea',
    uid: 'PNG',
    region: 'OC',
  },
  {
    label: 'Paraguay',
    uid: 'PRY',
    region: 'SA',
  },
  {
    label: 'Peru',
    uid: 'PER',
    region: 'SA',
  },
  {
    label: 'Philippines',
    uid: 'PHL',
    region: 'AS',
  },
  {
    label: 'Pitcairn',
    uid: 'PCN',
    region: 'OC',
  },
  {
    label: 'Poland',
    uid: 'POL',
    region: 'EU',
  },
  {
    label: 'Portugal',
    uid: 'PRT',
    region: 'EU',
  },
  {
    label: 'Puerto Rico',
    uid: 'PRI',
    region: 'NA',
  },
  {
    label: 'Qatar',
    uid: 'QAT',
    region: 'AS',
  },
  {
    label: 'Republic of Kosovo',
    uid: 'UNK',
    region: 'EU',
  },
  {
    label: 'Réunion',
    uid: 'REU',
    region: 'AF',
  },
  {
    label: 'Romania',
    uid: 'ROU',
    region: 'EU',
  },
  {
    label: 'Russian Federation',
    uid: 'RUS',
    region: 'EU',
  },
  {
    label: 'Rwanda',
    uid: 'RWA',
    region: 'AF',
  },
  {
    label: 'Saint Barthélemy',
    uid: 'BLM',
    region: 'NA',
  },
  {
    label: 'Saint Helena, Ascension and Tristan da Cunha',
    uid: 'SHN',
    region: 'AF',
  },
  {
    label: 'Saint Kitts and Nevis',
    uid: 'KNA',
    region: 'NA',
  },
  {
    label: 'Saint Lucia',
    uid: 'LCA',
    region: 'NA',
  },
  {
    label: 'Saint Martin (French part)',
    uid: 'MAF',
    region: 'NA',
  },
  {
    label: 'Saint Pierre and Miquelon',
    uid: 'SPM',
    region: 'NA',
  },
  {
    label: 'Saint Vincent and the Grenadines',
    uid: 'VCT',
    region: 'NA',
  },
  {
    label: 'Samoa',
    uid: 'WSM',
    region: 'OC',
  },
  {
    label: 'San Marino',
    uid: 'SMR',
    region: 'EU',
  },
  {
    label: 'Sao Tome and Principe',
    uid: 'STP',
    region: 'AF',
  },
  {
    label: 'Saudi Arabia',
    uid: 'SAU',
    region: 'AS',
  },
  {
    label: 'Senegal',
    uid: 'SEN',
    region: 'AF',
  },
  {
    label: 'Serbia',
    uid: 'SRB',
    region: 'EU',
  },
  {
    label: 'Seychelles',
    uid: 'SYC',
    region: 'AF',
  },
  {
    label: 'Sierra Leone',
    uid: 'SLE',
    region: 'AF',
  },
  {
    label: 'Singapore',
    uid: 'SGP',
    region: 'AS',
  },
  {
    label: 'Sint Maarten (Dutch part)',
    uid: 'SXM',
    region: 'Americas',
  },
  {
    label: 'Slovakia',
    uid: 'SVK',
    region: 'EU',
  },
  {
    label: 'Slovenia',
    uid: 'SVN',
    region: 'EU',
  },
  {
    label: 'Solomon Islands',
    uid: 'SLB',
    region: 'OC',
  },
  {
    label: 'Somalia',
    uid: 'SOM',
    region: 'AF',
  },
  {
    label: 'South Africa',
    uid: 'ZAF',
    region: 'AF',
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    uid: 'SGS',
    region: 'NA',
  },
  {
    label: 'Korea (Republic of)',
    uid: 'KOR',
    region: 'AS',
  },
  {
    label: 'South Sudan',
    uid: 'SSD',
    region: 'AF',
  },
  {
    label: 'Spain',
    uid: 'ESP',
    region: 'EU',
  },
  {
    label: 'Sri Lanka',
    uid: 'LKA',
    region: 'AS',
  },
  {
    label: 'Sudan',
    uid: 'SDN',
    region: 'AF',
  },
  {
    label: 'Surilabel',
    uid: 'unknown',
    region: 'SA',
  },
  {
    label: 'Svalbard and Jan Mayen',
    uid: 'SJM',
    region: 'EU',
  },
  {
    label: 'Swaziland',
    uid: 'SWZ',
    region: 'AF',
  },
  {
    label: 'Sweden',
    uid: 'SWE',
    region: 'EU',
  },
  {
    label: 'Switzerland',
    uid: 'CHE',
    region: 'EU',
  },
  {
    label: 'Syrian Arab Republic',
    uid: 'SYR',
    region: 'AS',
  },
  {
    label: 'Taiwan',
    uid: 'TWN',
    region: 'AS',
  },
  {
    label: 'Tajikistan',
    uid: 'TJK',
    region: 'AS',
  },
  {
    label: 'Tanzania, United Republic of',
    uid: 'TZA',
    region: 'AF',
  },
  {
    label: 'Thailand',
    uid: 'THA',
    region: 'AS',
  },
  {
    label: 'Timor-Leste',
    uid: 'TLS',
    region: 'AS',
  },
  {
    label: 'Togo',
    uid: 'TGO',
    region: 'AF',
  },
  {
    label: 'Tokelau',
    uid: 'TKL',
    region: 'OC',
  },
  {
    label: 'Tonga',
    uid: 'TON',
    region: 'OC',
  },
  {
    label: 'Trinidad and Tobago',
    uid: 'TTO',
    region: 'SA',
  },
  {
    label: 'Tunisia',
    uid: 'TUN',
    region: 'AF',
  },
  {
    label: 'Turkey',
    uid: 'TUR',
    region: 'AS',
  },
  {
    label: 'Turkmenistan',
    uid: 'TKM',
    region: 'AS',
  },
  {
    label: 'Turks and Caicos Islands',
    uid: 'TCA',
    region: 'NA',
  },
  {
    label: 'Tuvalu',
    uid: 'TUV',
    region: 'OC',
  },
  {
    label: 'Uganda',
    uid: 'UGA',
    region: 'AF',
  },
  {
    label: 'Ukraine',
    uid: 'UKR',
    region: 'EU',
  },
  {
    label: 'United Arab Emirates',
    uid: 'ARE',
    region: 'AS',
  },
  {
    label: 'United Kingdom of Great Britain and Northern Ireland',
    uid: 'GBR',
    region: 'EU',
  },
  {
    label: 'United States of America',
    uid: 'USA',
    region: 'NA',
  },
  {
    label: 'Uruguay',
    uid: 'URY',
    region: 'SA',
  },
  {
    label: 'Uzbekistan',
    uid: 'UZB',
    region: 'AS',
  },
  {
    label: 'Vanuatu',
    uid: 'VUT',
    region: 'OC',
  },
  {
    label: 'Venezuela (Bolivarian Republic of)',
    uid: 'VEN',
    region: 'SA',
  },
  {
    label: 'Viet Nam',
    uid: 'VNM',
    region: 'AS',
  },
  {
    label: 'Wallis and Futuna',
    uid: 'WLF',
    region: 'OC',
  },
  {
    label: 'Western Sahara',
    uid: 'ESH',
    region: 'AF',
  },
  {
    label: 'Yemen',
    uid: 'YEM',
    region: 'AS',
  },
  {
    label: 'Zambia',
    uid: 'ZMB',
    region: 'AF',
  },
  {
    label: 'Zimbabwe',
    uid: 'ZWE',
    region: 'AF',
  },
];

export const ADMIN_1 = [
  {
    uid: 'region id',
    label: 'Region label',
    country: 'country id',
    coordinates: [0, 0],
  },
];

export const CITIES = [
  {
    uid: 'city id', // unique id defined by CA
    label: 'Helsinki',
    country: 'FIN', // CCA3 uid
    coordinates: [0, 0], // Centroid of city
  },
];

export const ICONIC_REGIONS = [
  {
    uid: 'region id', // unique id defined by CA
    label: 'Bahamas/Nassau',
    country: 'country id',
    coordinates: [0, 0], // Centroid of region
  },
];

function generateValue(type) {
  let value = Math.random();
  if (type === 'year') {
    value = Math.round(value * 2000);
  } else if (type === 'length') {
    value = Math.round(value * 50);
  }

  return {
    value: value,
    hasWarning: Math.random() < 0.5,
    type: 'celsius',
  };
}

function generateTimeSeries() {
  return {
    yearStart: 2000,
    yearStep: 5,
    data: Array.from({ length: 10 }, () => Math.random() * 1.5),
  };
}

function generateScenarioData() {
  return {
    // "ghg-netzero-year": generateValue('year'),
    // "ghg-2030-absolute": generateValue('celsius'),
    // "ghg-2030-relative": generateValue('percent'),
    // "warming-2100": generateValue('celsius'),
    // "warming-peak-value": generateValue('celsius'),
    // "warming-peak-year": generateValue('year'),
    // "warming-overshoot-magnitude": generateValue('celsius'),
    // "warming-overshoot-length": generateValue('length'),
    temperature: generateTimeSeries(),
    emissions: generateTimeSeries(),
  };
}

export const SCENARIOS = [
  {
    label: 'Current Policies',
    uid: 'cp',
    description:
      'This pathway explores the consequences of continuing along the path of implemented climate policies in 2020 with only mild strengthening after that. The scenario illustrates the outcomes of many scenarios in the literature that project the outcomes of current policies.',
    isPrimary: true,
    scenarioData: {
      "warming2050": {
        "data": 0.26 // DUMMY
      },
      "warming2050-2100": {
        "data": 0.15 // DUMMY
      },
      "temperature": {
        "data": [
          1.2456, 
          1.3416, 
          1.4192, 
          1.5132, 
          1.6074, 
          1.6966, 
          1.7818, 
          1.8819, 
          1.9877, 
          2.1007, 
          2.2175, 
          2.3347, 
          2.4526, 
          2.5694, 
          2.6847, 
          2.8015, 
          2.9206
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          57615.53110072017, 
          62055.39923044584, 
          64712.28907750579, 
          66646.13989194669, 
          69205.41168059764, 
          70592.27561457043, 
          70993.30944692672, 
          69703.14555260717, 
          68309.02780012568
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      }
    }
  },
  {
    label: 'Delayed Action',
    uid: 'da',
    description:
      'Energy demand is reduced in the 2030s and the transition to variable renewable energy accelerates then too. Renewable energy never forces out all fossil fuel use \u2013 carbon dioxide is captured from the air and buried instead, along with reforestation.',
    isPrimary: true,
    scenarioData: {
      "warming2050": {
        "data": 0.7 // DUMMY
      },
      "warming2050-2100": {
        "data": 0.7 // DUMMY
      },
      "temperature": {
        "data": [
          1.2314, 
          1.3313, 
          1.4249, 
          1.5116, 
          1.5828, 
          1.6256, 
          1.6496, 
          1.6637, 
          1.6747, 
          1.6803, 
          1.6851, 
          1.6864, 
          1.6866, 
          1.6806, 
          1.6748, 
          1.6638, 
          1.6571
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          56397.219277746284, 
          43316.11053375207, 
          25793.185379649483, 
          17279.239743693746, 
          12673.173725914789, 
          8242.882235963265, 
          3095.5259172153674, 
          953.2173358968384, 
          -290.09588330653787
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      },
    }
  },
  {
    label: 'Shifting Pathways',
    uid: 'SP',
    description:
      'This pathway explores how a broader shift towards sustainable development can be combined with climate policies consistent with keeping warming to 1.5\u02daC. Energy demand is reduced over time, while renewable energy use grows, squeezing out fossil fuel use.',
    isPrimary: true,
    scenarioData: {
      "warming2050": {
        "data": 0.6 // DUMMY
      },
      "warming2050-2100": {
        "data": 0.6 // DUMMY
      },
      "temperature": {
        "data": [
          1.2386, 
          1.3499, 
          1.4402, 
          1.4971, 
          1.5173, 
          1.5148, 
          1.4909, 
          1.4602, 
          1.4317, 
          1.4076, 
          1.3871, 
          1.3662, 
          1.3488, 
          1.3314, 
          1.3171, 
          1.3014, 
          1.2874
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          56111.428375521034, 
          33339.86719609621, 
          19151.999428983596, 
          10193.376100848398, 
          6165.195159270135, 
          3081.124799579309, 
          1326.0128802203708, 
          423.65101457033506, 
          -604.0758731657097
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      }
    }
  },
  {
    label: 'NDCs Pathway',
    uid: 'ndc',
    description:
      'This pathway explores the impact of countries sticking to their Nationally Determined Contributions (NDCs) as stated in 2020. These are often more ambitious than currently implemented policies, but for most countries do not ratchet up very rapidly. Similar levels of mitigation effort are expected going forwards.',
    isPrimary: false,
    scenarioData: {
      "warming2050": {
        "data": 0.1 // DUMMY
      },
      "warming2050-2100": {
        "data": 0.1 // DUMMY
      },
      "temperature": {
        "data": [
          1.2333, 
          1.3299, 
          1.4358, 
          1.5453, 
          1.649, 
          1.7511, 
          1.8501, 
          1.9506, 
          2.0498, 
          2.1453, 
          2.231, 
          2.3138, 
          2.3852, 
          2.4428, 
          2.4933, 
          2.5288, 
          2.5577
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          60809.478747147085, 
          53775.02191839159, 
          55032.08701233139, 
          57411.01697895689, 
          56734.13826377133, 
          52805.31264527934, 
          41502.83555833753, 
          32026.671545838253, 
          31119.073371116436
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      }
    }
  },
  {
    label: 'High Negative Emissions',
    uid: 'hne',
    description:
      'Pathway with highest negative emissions (carbon-removing technology). Fossil fuel use decreases slowly, replaced about equally by variable renewable energy and biofuels. The carbon from burning the biofuels is captured and buried, offsetting the continued fossil fuel use.',
    isPrimary: false,
    scenarioData: {
      "warming2050": {
        "data": 0.27 // DUMMY
      },
      "warming2050-2100": {
        "data": 0.7 // DUMMY
      },
      "temperature": {
        "data": [
          1.257, 
          1.3647, 
          1.4636, 
          1.5402, 
          1.5904, 
          1.6219, 
          1.6414, 
          1.6558, 
          1.6594, 
          1.6457, 
          1.6245, 
          1.5933, 
          1.5599, 
          1.5309, 
          1.5078, 
          1.4744, 
          1.4419
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          54194.58148808071, 
          38055.219165369286, 
          29161.77541338333, 
          19919.647408809105, 
          8107.657897474299, 
          954.8858372413488, 
          -938.3943972233901, 
          -6024.176887516463, 
          -6066.100180065413
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      }
    }
  },
  {
    label: 'High Renewables',
    uid: 'hr',
    description:
      'Energy demand is reduced rapidly in the short-term, though grows later. Growth in renewables is very rapid and squeezes out most all other types of energy. Some biofuel is used to balance renewable variability, and the emissions from this are captured and buried.',
    isPrimary: false,
    scenarioData: {
      "warming2050": {
        "data": 0.27 // DUMMY
      },
      "warming2050-2100": {
        "data": 0.7 // DUMMY
      },
      "temperature": {
        "data": [
          1.2365, 
          1.3516, 
          1.4487, 
          1.5061, 
          1.5263, 
          1.5294, 
          1.5235, 
          1.5136, 
          1.501, 
          1.4913, 
          1.4819, 
          1.4774, 
          1.4715, 
          1.4664, 
          1.4622, 
          1.4577, 
          1.4556
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          58148.341567720905, 
          29780.0327577802, 
          17343.46578719779, 
          11332.642931053866, 
          8954.370320990092, 
          8000.638807192702, 
          7374.596252917521, 
          6731.223378821369, 
          6577.104404481924
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      }
    }
  },
  {
    label: 'Low Demand',
    uid: 'ld',
    description:
      'Energy demand is massively reduced by implementing energy efficient lifestyles and design, and kept low throughout the century. Renewable energy grows and gradually forces out fossil fuels.',
    isPrimary: false,
    scenarioData: {
      "warming2050": {
        "data": 0.6 // DUMMY
      },
      "warming2050-2100": {
        "data": 0.2 // DUMMY
      },
      "temperature": {
        "data": [
          1.24, 
          1.3505, 
          1.4439, 
          1.4911, 
          1.5104, 
          1.5053, 
          1.4889, 
          1.4701, 
          1.4491, 
          1.4293, 
          1.415, 
          1.3994, 
          1.3846, 
          1.371, 
          1.3612, 
          1.3513, 
          1.3441
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          55219.47344759707, 
          25849.861596248214, 
          15180.130292531689, 
          9256.507601396197, 
          6385.806101692713, 
          4249.500794677756, 
          2606.3779827884528, 
          1887.7104849816878, 
          1421.0726719011536
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      }
    }
  },
  {
    label: 'SSP1-1.9',
    uid: 'ssp119',
    description:
      'Renewable energy is deployed rapidly, energy demand is also limited rapidly. There is general focus on sustainability, but also a significant increase in the amount of biofuel use, with the carbon released by this captured and stored (negative emissions). This pathway was used a lot for climate science research conducted as part of the IPCC Sixth Assessment Report.',
    isPrimary: false,
    scenarioData: {
      "warming2050": {
        "data": 0.1 // DUMMY
      },
      "warming2050-2100": {
        "data": 0.9 // DUMMY
      },
      "temperature": {
        "data": [
          1.2486, 
          1.3586, 
          1.4357, 
          1.4773, 
          1.4894, 
          1.4871, 
          1.4761, 
          1.4556, 
          1.4351, 
          1.4177, 
          1.399, 
          1.3838, 
          1.3661, 
          1.3491, 
          1.3269, 
          1.3035, 
          1.2778
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          53788.79199039185, 
          31513.443405763923, 
          18359.00793218521, 
          9253.093252850646, 
          5300.617314743331, 
          2065.305036933608, 
          -1154.5287244513847, 
          -4678.068893667987, 
          -8217.809548671317
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      }
    }
  },
  {
    label: 'SSP5-3.4-OS',
    uid: 'ssp534',
    description:
      'Carbon emissions rise at an incredibly fast rate in the short term. Then, around 2040 they decline extremely rapidly through the massive use of negative emissions technologies (for example capturing carbon from biofuel burning or directly from the air, and burying it). This pathway was designed to test the sensitivity of the Earth System to such extreme changes in emissions.',
    isPrimary: false,
    scenarioData: {
      "warming2050": {
        "data": 0.3 // DUMMY
      },
      "warming2050-2100": {
        "data": 0.4 // DUMMY
      },
      "temperature": {
        "data": [
          1.2637, 
          1.403, 
          1.5463, 
          1.717, 
          1.9036, 
          2.0958, 
          2.2368, 
          2.3102, 
          2.3261, 
          2.2993, 
          2.2542, 
          2.197, 
          2.1369, 
          2.0743, 
          2.0152, 
          1.9598, 
          1.9039
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          59591.69929557695, 
          72397.35214490144, 
          88516.08824959023, 
          62052.37850541042, 
          24776.15222105634, 
          1841.8054163623528, 
          -7665.976361355216, 
          -11807.339428643802, 
          -13925.445898990689
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      }
    }
  },
  {
    label: 'Stabilisation at 1.5\u00b0C',
    uid: 's1p5',
    description:
      'Temperatures rise as in the demand-limiting case (LD) until the global average reaches 1.5\u00b0C. The temperature is then held constant. This scenario is a simple thought-experiment not driven by economic or climatic considerations.',
    isPrimary: false,
    scenarioData: {
      "warming2050": {
        "data": 0.4
      },
      "warming2050-2100": {
        "data": 0.9
      },
      "temperature": {
        "data": [
          1.24, 
          1.3505, 
          1.4439, 
          1.4911, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006, 
          1.5006
        ], 
        "yearStart": 2020, 
        "yearStep": 1
      },
      "emissions": {
        "data": [
          0, 
          0, 
          0, 
          0, 
          0, 
          0, 
          0, 
          0, 
          0
        ], 
        "yearStart": 2020, 
        "yearStep": 10
      }
    }
  },
];

export const UNITS = [
  {
    uid: 'unit id', // unique id defined by CA
    label: 'g',
    labelLong: 'gramms',
  },
];

export const SECTORS = [
  {
    uid: 'terrestrial-climate', // unique id defined by CA
    label: 'Terrestrial Climate',
    icon: '⛰️',
  },
  {
    uid: 'cryosphere',
    label: 'Cryosphere',
    icon: '❄️',
  },
  {
    uid: 'agriculture',
    label: 'Agriculture',
    icon: '🌾',
  },
  {
    uid: 'freshwater-availability',
    label: 'Freshwater availability',
    icon: '💧',
  },
  {
    uid: 'terrestrial-ecosystems',
    label: 'Terrestrial ecosystems',
    icon: '🍃',
  },
  {
    uid: 'marine-ecosystems',
    label: 'Marine ecosystems',
    icon: '🌊',
  },
];

export const INDICATORS = [
  {
    // Indicators for scenario selection
    uid: 'ghg-netzero-year',
    label: 'Net zero GHG year',
    unit: 'year',
    sector: '',
  },
  {
    uid: 'ghg-2030-absolute',
    label: 'GHG 2030 ',
    unit: 'gty',
    sector: '',
  },
  {
    uid: 'ghg-2030-relative',
    label: 'GHG 2030 relative to 2030',
    unit: 'percent',
    sector: '',
  },
  {
    uid: 'warming-2100',
    label: '2100 Warming',
    unit: 'celsius',
    sector: '',
  },
  {
    uid: 'warming-peak-value',
    label: 'Peak warming value',
    unit: 'celsius',
    sector: '',
  },
  {
    uid: 'warming-peak-year',
    label: 'Peak warming year',
    unit: 'year',
    sector: '',
  },
  {
    uid: 'warming-overshoot-magnitude',
    label: 'Overshoot magnitude',
    unit: 'celsius',
    sector: '',
  },
  {
    uid: 'warming-overshoot-length',
    label: 'Overshoot length',
    unit: 'range-year',
    sector: '',
  },
  {
    // Other indicators
    uid: 'tas',
    label: 'Near-surface air temperature',
    unit: 'celsius',
    sector: 'terrestrial-climate',
    options: [
      ['time', 'annual'],
      ['frequency', '0-1'],
      ['reference', 'pre'],
    ], // DUMMY
  },
  {
    uid: 'wet-bulb-globe-temperature',
    label: 'Wet-bulb globe temperature',
    unit: 'celsius',
    sector: 'terrestrial-climate',
    options: [
      ['time', 'annual'],
      ['reference', '2020'],
    ], // DUMMY
  },
  {
    uid: 'outlier-days',
    label: 'Outlier days',
    unit: 'float',
    sector: 'terrestrial-climate',
    options: [
      ['frequency', '0-02'],
      ['spatial', 'gdp'],
    ], // DUMMY
  },
  {
    uid: 'precipitation',
    label: 'Precipitation',
    unit: 'float',
    sector: 'cryosphere',
    options: [
      ['frequency', '0-05'],
      ['reference', 'pre'],
      ['spatial', 'gdp'],
    ], // DUMMY
  },
];

export const COUNTRIES = [
  {
    label: 'Afghanistan',
    uid: 'AF',
    region: 'AS',
  },
  {
    label: 'Åland Islands',
    uid: 'AX',
    region: 'EU',
  },
  {
    label: 'Albania',
    uid: 'AL',
    region: 'EU',
  },
  {
    label: 'Algeria',
    uid: 'DZ',
    region: 'AF',
  },
  {
    label: 'American Samoa',
    uid: 'AS',
    region: 'OC',
  },
  {
    label: 'Andorra',
    uid: 'AD',
    region: 'EU',
  },
  {
    label: 'Angola',
    uid: 'AO',
    region: 'AF',
  },
  {
    label: 'Anguilla',
    uid: 'AI',
    region: 'NA',
  },
  {
    label: 'Antigua and Barbuda',
    uid: 'AG',
    region: 'NA',
  },
  {
    label: 'Argentina',
    uid: 'AR',
    region: 'SA',
  },
  {
    label: 'Armenia',
    uid: 'AM',
    region: 'AS',
  },
  {
    label: 'Aruba',
    uid: 'AW',
    region: 'SA',
  },
  {
    label: 'Australia',
    uid: 'AU',
    region: 'OC',
  },
  {
    label: 'Austria',
    uid: 'AT',
    region: 'EU',
  },
  {
    label: 'Azerbaijan',
    uid: 'AZ',
    region: 'AS',
  },
  {
    label: 'Bahamas',
    uid: 'BS',
    region: 'NA',
  },
  {
    label: 'Bahrain',
    uid: 'BH',
    region: 'AS',
  },
  {
    label: 'Bangladesh',
    uid: 'BD',
    region: 'AS',
  },
  {
    label: 'Barbados',
    uid: 'BB',
    region: 'NA',
  },
  {
    label: 'Belarus',
    uid: 'BY',
    region: 'EU',
  },
  {
    label: 'Belgium',
    uid: 'BE',
    region: 'EU',
  },
  {
    label: 'Belize',
    uid: 'BZ',
    region: 'NA',
  },
  {
    label: 'Benin',
    uid: 'BJ',
    region: 'AF',
  },
  {
    label: 'Bermuda',
    uid: 'BM',
    region: 'NA',
  },
  {
    label: 'Bhutan',
    uid: 'BT',
    region: 'AS',
  },
  {
    label: 'Bolivia (Plurinational State of)',
    uid: 'BO',
    region: 'SA',
  },
  {
    label: 'Bonaire, Sint Eustatius and Saba',
    uid: 'BQ',
    region: 'SA',
  },
  {
    label: 'Bosnia and Herzegovina',
    uid: 'BA',
    region: 'EU',
  },
  {
    label: 'Botswana',
    uid: 'BW',
    region: 'AF',
  },
  {
    label: 'Bouvet Island',
    uid: 'BV',
    region: 'NA',
  },
  {
    label: 'Brazil',
    uid: 'BR',
    region: 'SA',
  },
  {
    label: 'British Indian Ocean Territory',
    uid: 'IO',
    region: 'AF',
  },
  {
    label: 'United States Minor Outlying Islands',
    uid: 'UM',
    region: 'NA',
  },
  {
    label: 'Virgin Islands (British)',
    uid: 'VG',
    region: 'NA',
  },
  {
    label: 'Virgin Islands (U.S.)',
    uid: 'VI',
    region: 'NA',
  },
  {
    label: 'Brunei Darussalam',
    uid: 'BN',
    region: 'AS',
  },
  {
    label: 'Bulgaria',
    uid: 'BG',
    region: 'EU',
  },
  {
    label: 'Burkina Faso',
    uid: 'BF',
    region: 'AF',
  },
  {
    label: 'Burundi',
    uid: 'BI',
    region: 'AF',
  },
  {
    label: 'Cambodia',
    uid: 'KH',
    region: 'AS',
  },
  {
    label: 'Cameroon',
    uid: 'CM',
    region: 'AF',
  },
  {
    label: 'Canada',
    uid: 'CA',
    region: 'NA',
  },
  {
    label: 'Cabo Verde',
    uid: 'CV',
    region: 'AF',
  },
  {
    label: 'Cayman Islands',
    uid: 'KY',
    region: 'NA',
    demonym: 'Caymanian',
  },
  {
    label: 'Central African Republic',
    uid: 'CF',
    region: 'AF',
  },
  {
    label: 'Chad',
    uid: 'TD',
    region: 'AF',
  },
  {
    label: 'Chile',
    uid: 'CL',
    region: 'SA',
  },
  {
    label: 'China',
    uid: 'CN',
    region: 'AS',
  },
  {
    label: 'Christmas Island',
    uid: 'CX',
    region: 'OC',
  },
  {
    label: 'Cocos (Keeling) Islands',
    uid: 'CC',
    region: 'OC',
  },
  {
    label: 'Colombia',
    uid: 'CO',
    region: 'SA',
  },
  {
    label: 'Comoros',
    uid: 'KM',
    region: 'AF',
  },
  {
    label: 'Congo',
    uid: 'CG',
    region: 'AF',
  },
  {
    label: 'Congo (Democratic Republic of the)',
    uid: 'CD',
    region: 'AF',
  },
  {
    label: 'Cook Islands',
    uid: 'CK',
    region: 'OC',
  },
  {
    label: 'Costa Rica',
    uid: 'CR',
    region: 'NA',
  },
  {
    label: 'Croatia',
    uid: 'HR',
    region: 'EU',
  },
  {
    label: 'Cuba',
    uid: 'CU',
    region: 'NA',
  },
  {
    label: 'Curaçao',
    uid: 'CW',
    region: 'SA',
  },
  {
    label: 'Cyprus',
    uid: 'CY',
    region: 'EU',
  },
  {
    label: 'Czech Republic',
    uid: 'CZ',
    region: 'EU',
  },
  {
    label: 'Denmark',
    uid: 'DK',
    region: 'EU',
  },
  {
    label: 'Djibouti',
    uid: 'DJ',
    region: 'AF',
  },
  {
    label: 'Dominica',
    uid: 'DM',
    region: 'NA',
  },
  {
    label: 'Dominican Republic',
    uid: 'DO',
    region: 'NA',
  },
  {
    label: 'Ecuador',
    uid: 'EC',
    region: 'SA',
  },
  {
    label: 'Egypt',
    uid: 'EG',
    region: 'AF',
  },
  {
    label: 'El Salvador',
    uid: 'SV',
    region: 'NA',
  },
  {
    label: 'Equatorial Guinea',
    uid: 'GQ',
    region: 'AF',
  },
  {
    label: 'Eritrea',
    uid: 'ER',
    region: 'AF',
  },
  {
    label: 'Estonia',
    uid: 'EE',
    region: 'EU',
  },
  {
    label: 'Ethiopia',
    uid: 'ET',
    region: 'AF',
  },
  {
    label: 'Falkland Islands (Malvinas)',
    uid: 'FK',
    region: 'SA',
  },
  {
    label: 'Faroe Islands',
    uid: 'FO',
    region: 'EU',
  },
  {
    label: 'Fiji',
    uid: 'FJ',
    region: 'OC',
  },
  {
    label: 'Finland',
    uid: 'FI',
    region: 'EU',
  },
  {
    label: 'France',
    uid: 'FR',
    region: 'EU',
    demonym: 'French',
  },
  {
    label: 'French Guiana',
    uid: 'GF',
    region: 'SA',
  },
  {
    label: 'French Polynesia',
    uid: 'PF',
    region: 'OC',
  },
  {
    label: 'French Southern Territories',
    uid: 'TF',
    region: 'AF',
  },
  {
    label: 'Gabon',
    uid: 'GA',
    region: 'AF',
  },
  {
    label: 'Gambia',
    uid: 'GM',
    region: 'AF',
  },
  {
    label: 'Georgia',
    uid: 'GE',
    region: 'AS',
  },
  {
    label: 'Germany',
    uid: 'DE',
    region: 'EU',
  },
  {
    label: 'Ghana',
    uid: 'GH',
    region: 'AF',
  },
  {
    label: 'Gibraltar',
    uid: 'GI',
    region: 'EU',
  },
  {
    label: 'Greece',
    uid: 'GR',
    region: 'EU',
  },
  {
    label: 'Greenland',
    uid: 'GL',
    region: 'NA',
  },
  {
    label: 'Grenada',
    uid: 'GD',
    region: 'NA',
  },
  {
    label: 'Guadeloupe',
    uid: 'GP',
    region: 'NA',
  },
  {
    label: 'Guam',
    uid: 'GU',
    region: 'OC',
  },
  {
    label: 'Guatemala',
    uid: 'GT',
    region: 'NA',
  },
  {
    label: 'Guernsey',
    uid: 'GG',
    region: 'EU',
  },
  {
    label: 'Guinea',
    uid: 'GN',
    region: 'AF',
  },
  {
    label: 'Guinea-Bissau',
    uid: 'GW',
    region: 'AF',
  },
  {
    label: 'Guyana',
    uid: 'GY',
    region: 'SA',
  },
  {
    label: 'Haiti',
    uid: 'HT',
    region: 'SA',
  },
  {
    label: 'Heard Island and McDonald Islands',
    uid: 'HM',
    region: 'OC',
  },
  {
    label: 'Holy See',
    uid: 'VA',
    region: 'EU',
  },
  {
    label: 'Honduras',
    uid: 'HN',
    region: 'NA',
  },
  {
    label: 'Hong Kong',
    uid: 'HK',
    region: 'AS',
  },
  {
    label: 'Hungary',
    uid: 'HU',
    region: 'EU',
  },
  {
    label: 'Iceland',
    uid: 'IS',
    region: 'EU',
  },
  {
    label: 'India',
    uid: 'IN',
    region: 'AS',
  },
  {
    label: 'Indonesia',
    uid: 'ID',
    region: 'AS',
  },
  {
    label: "Côte d'Ivoire",
    uid: 'CI',
    region: 'AF',
  },
  {
    label: 'Iran (Islamic Republic of)',
    uid: 'IR',
    region: 'AS',
  },
  {
    label: 'Iraq',
    uid: 'IQ',
    region: 'AS',
  },
  {
    label: 'Ireland',
    uid: 'IE',
    region: 'EU',
  },
  {
    label: 'Isle of Man',
    uid: 'IM',
    region: 'EU',
  },
  {
    label: 'Israel',
    uid: 'IL',
    region: 'AS',
  },
  {
    label: 'Italy',
    uid: 'IT',
    region: 'EU',
  },
  {
    label: 'Jamaica',
    uid: 'JM',
    region: 'NA',
  },
  {
    label: 'Japan',
    uid: 'JP',
    region: 'AS',
  },
  {
    label: 'Jersey',
    uid: 'JE',
    region: 'EU',
  },
  {
    label: 'Jordan',
    uid: 'JO',
    region: 'AS',
  },
  {
    label: 'Kazakhstan',
    uid: 'KZ',
    region: 'AS',
  },
  {
    label: 'Kenya',
    uid: 'KE',
    region: 'AF',
  },
  {
    label: 'Kiribati',
    uid: 'KI',
    region: 'OC',
  },
  {
    label: 'Kuwait',
    uid: 'KW',
    region: 'AS',
  },
  {
    label: 'Kyrgyzstan',
    uid: 'KG',
    region: 'AS',
  },
  {
    label: "Lao People's Democratic Republic",
    uid: 'LA',
    region: 'AS',
  },
  {
    label: 'Latvia',
    uid: 'LV',
    region: 'EU',
  },
  {
    label: 'Lebanon',
    uid: 'LB',
    region: 'AS',
  },
  {
    label: 'Lesotho',
    uid: 'LS',
    region: 'AF',
  },
  {
    label: 'Liberia',
    uid: 'LR',
    region: 'AF',
  },
  {
    label: 'Libya',
    uid: 'LY',
    region: 'AF',
  },
  {
    label: 'Liechtenstein',
    uid: 'LI',
    region: 'EU',
  },
  {
    label: 'Lithuania',
    uid: 'LT',
    region: 'EU',
  },
  {
    label: 'Luxembourg',
    uid: 'LU',
    region: 'EU',
  },
  {
    label: 'Macao',
    uid: 'MO',
    region: 'AS',
  },
  {
    label: 'Macedonia (the former Yugoslav Republic of)',
    uid: 'MK',
    region: 'EU',
  },
  {
    label: 'Madagascar',
    uid: 'MG',
    region: 'AF',
  },
  {
    label: 'Malawi',
    uid: 'MW',
    region: 'AF',
  },
  {
    label: 'Malaysia',
    uid: 'MY',
    region: 'AS',
  },
  {
    label: 'Maldives',
    uid: 'MV',
    region: 'AS',
  },
  {
    label: 'Mali',
    uid: 'ML',
    region: 'AF',
  },
  {
    label: 'Malta',
    uid: 'MT',
    region: 'EU',
  },
  {
    label: 'Marshall Islands',
    uid: 'MH',
    region: 'OC',
  },
  {
    label: 'Martinique',
    uid: 'MQ',
    region: 'Americas',
  },
  {
    label: 'Mauritania',
    uid: 'MR',
    region: 'AF',
  },
  {
    label: 'Mauritius',
    uid: 'MU',
    region: 'AF',
  },
  {
    label: 'Mayotte',
    uid: 'YT',
    region: 'AF',
  },
  {
    label: 'Mexico',
    uid: 'MX',
    region: 'NA',
  },
  {
    label: 'Micronesia (Federated States of)',
    uid: 'FM',
    region: 'OC',
  },
  {
    label: 'Moldova (Republic of)',
    uid: 'MD',
    region: 'EU',
  },
  {
    label: 'Monaco',
    uid: 'MC',
    region: 'EU',
  },
  {
    label: 'Mongolia',
    uid: 'MN',
    region: 'AS',
  },
  {
    label: 'Montenegro',
    uid: 'ME',
    region: 'EU',
  },
  {
    label: 'Montserrat',
    uid: 'MS',
    region: 'NA',
  },
  {
    label: 'Morocco',
    uid: 'MA',
    region: 'AF',
  },
  {
    label: 'Mozambique',
    uid: 'MZ',
    region: 'AF',
  },
  {
    label: 'Myanmar',
    uid: 'MM',
    region: 'AS',
  },
  {
    label: 'Namibia',
    uid: 'NA',
    region: 'AF',
  },
  {
    label: 'Nauru',
    uid: 'NR',
    region: 'OC',
  },
  {
    label: 'Nepal',
    uid: 'NP',
    region: 'AS',
  },
  {
    label: 'Netherlands',
    uid: 'NL',
    region: 'EU',
  },
  {
    label: 'New Caledonia',
    uid: 'NC',
    region: 'OC',
  },
  {
    label: 'New Zealand',
    uid: 'NZ',
    region: 'OC',
  },
  {
    label: 'Nicaragua',
    uid: 'NI',
    region: 'NA',
  },
  {
    label: 'Niger',
    uid: 'NE',
    region: 'AF',
  },
  {
    label: 'Nigeria',
    uid: 'NG',
    region: 'AF',
  },
  {
    label: 'Niue',
    uid: 'NU',
    region: 'OC',
  },
  {
    label: 'Norfolk Island',
    uid: 'NF',
    region: 'OC',
  },
  {
    label: "Korea (Democratic People's Republic of)",
    uid: 'KP',
    region: 'AS',
  },
  {
    label: 'Northern Mariana Islands',
    uid: 'MP',
    region: 'OC',
  },
  {
    label: 'Norway',
    uid: 'NO',
    region: 'EU',
  },
  {
    label: 'Oman',
    uid: 'OM',
    region: 'AS',
  },
  {
    label: 'Pakistan',
    uid: 'PK',
    region: 'AS',
  },
  {
    label: 'Palau',
    uid: 'PW',
    region: 'OC',
  },
  {
    label: 'Palestine, State of',
    uid: 'PS',
    region: 'AS',
  },
  {
    label: 'Panama',
    uid: 'PA',
    region: 'NA',
  },
  {
    label: 'Papua New Guinea',
    uid: 'PG',
    region: 'OC',
  },
  {
    label: 'Paraguay',
    uid: 'PY',
    region: 'SA',
  },
  {
    label: 'Peru',
    uid: 'PE',
    region: 'SA',
  },
  {
    label: 'Philippines',
    uid: 'PH',
    region: 'AS',
  },
  {
    label: 'Pitcairn',
    uid: 'PN',
    region: 'OC',
  },
  {
    label: 'Poland',
    uid: 'PL',
    region: 'EU',
  },
  {
    label: 'Portugal',
    uid: 'PT',
    region: 'EU',
  },
  {
    label: 'Puerto Rico',
    uid: 'PR',
    region: 'NA',
  },
  {
    label: 'Qatar',
    uid: 'QA',
    region: 'AS',
  },
  {
    label: 'Republic of Kosovo',
    uid: 'XK',
    region: 'EU',
  },
  {
    label: 'Réunion',
    uid: 'RE',
    region: 'AF',
  },
  {
    label: 'Romania',
    uid: 'RO',
    region: 'EU',
  },
  {
    label: 'Russian Federation',
    uid: 'RU',
    region: 'EU',
  },
  {
    label: 'Rwanda',
    uid: 'RW',
    region: 'AF',
  },
  {
    label: 'Saint Barthélemy',
    uid: 'BL',
    region: 'NA',
  },
  {
    label: 'Saint Helena, Ascension and Tristan da Cunha',
    uid: 'SH',
    region: 'AF',
  },
  {
    label: 'Saint Kitts and Nevis',
    uid: 'KN',
    region: 'NA',
  },
  {
    label: 'Saint Lucia',
    uid: 'LC',
    region: 'NA',
  },
  {
    label: 'Saint Martin (French part)',
    uid: 'MF',
    region: 'NA',
  },
  {
    label: 'Saint Pierre and Miquelon',
    uid: 'PM',
    region: 'NA',
  },
  {
    label: 'Saint Vincent and the Grenadines',
    uid: 'VC',
    region: 'NA',
  },
  {
    label: 'Samoa',
    uid: 'WS',
    region: 'OC',
  },
  {
    label: 'San Marino',
    uid: 'SM',
    region: 'EU',
  },
  {
    label: 'Sao Tome and Principe',
    uid: 'ST',
    region: 'AF',
  },
  {
    label: 'Saudi Arabia',
    uid: 'SA',
    region: 'AS',
  },
  {
    label: 'Senegal',
    uid: 'SN',
    region: 'AF',
  },
  {
    label: 'Serbia',
    uid: 'RS',
    region: 'EU',
  },
  {
    label: 'Seychelles',
    uid: 'SC',
    region: 'AF',
  },
  {
    label: 'Sierra Leone',
    uid: 'SL',
    region: 'AF',
  },
  {
    label: 'Singapore',
    uid: 'SG',
    region: 'AS',
  },
  {
    label: 'Sint Maarten (Dutch part)',
    uid: 'SX',
    region: 'Americas',
  },
  {
    label: 'Slovakia',
    uid: 'SK',
    region: 'EU',
  },
  {
    label: 'Slovenia',
    uid: 'SI',
    region: 'EU',
  },
  {
    label: 'Solomon Islands',
    uid: 'SB',
    region: 'OC',
  },
  {
    label: 'Somalia',
    uid: 'SO',
    region: 'AF',
  },
  {
    label: 'South Africa',
    uid: 'ZA',
    region: 'AF',
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    uid: 'GS',
    region: 'NA',
  },
  {
    label: 'Korea (Republic of)',
    uid: 'KR',
    region: 'AS',
  },
  {
    label: 'South Sudan',
    uid: 'SS',
    region: 'AF',
  },
  {
    label: 'Spain',
    uid: 'ES',
    region: 'EU',
  },
  {
    label: 'Sri Lanka',
    uid: 'LK',
    region: 'AS',
  },
  {
    label: 'Sudan',
    uid: 'SD',
    region: 'AF',
  },
  {
    label: 'Surilabel',
    uid: 'SR',
    region: 'SA',
  },
  {
    label: 'Svalbard and Jan Mayen',
    uid: 'SJ',
    region: 'EU',
  },
  {
    label: 'Swaziland',
    uid: 'SZ',
    region: 'AF',
  },
  {
    label: 'Sweden',
    uid: 'SE',
    region: 'EU',
  },
  {
    label: 'Switzerland',
    uid: 'CH',
    region: 'EU',
  },
  {
    label: 'Syrian Arab Republic',
    uid: 'SY',
    region: 'AS',
  },
  {
    label: 'Taiwan',
    uid: 'TW',
    region: 'AS',
  },
  {
    label: 'Tajikistan',
    uid: 'TJ',
    region: 'AS',
  },
  {
    label: 'Tanzania, United Republic of',
    uid: 'TZ',
    region: 'AF',
  },
  {
    label: 'Thailand',
    uid: 'TH',
    region: 'AS',
  },
  {
    label: 'Timor-Leste',
    uid: 'TL',
    region: 'AS',
  },
  {
    label: 'Togo',
    uid: 'TG',
    region: 'AF',
  },
  {
    label: 'Tokelau',
    uid: 'TK',
    region: 'OC',
  },
  {
    label: 'Tonga',
    uid: 'TO',
    region: 'OC',
  },
  {
    label: 'Trinidad and Tobago',
    uid: 'TT',
    region: 'SA',
  },
  {
    label: 'Tunisia',
    uid: 'TN',
    region: 'AF',
  },
  {
    label: 'Turkey',
    uid: 'TR',
    region: 'AS',
  },
  {
    label: 'Turkmenistan',
    uid: 'TM',
    region: 'AS',
  },
  {
    label: 'Turks and Caicos Islands',
    uid: 'TC',
    region: 'NA',
  },
  {
    label: 'Tuvalu',
    uid: 'TV',
    region: 'OC',
  },
  {
    label: 'Uganda',
    uid: 'UG',
    region: 'AF',
  },
  {
    label: 'Ukraine',
    uid: 'UA',
    region: 'EU',
  },
  {
    label: 'United Arab Emirates',
    uid: 'AE',
    region: 'AS',
  },
  {
    label: 'United Kingdom of Great Britain and Northern Ireland',
    uid: 'GB',
    region: 'EU',
  },
  {
    label: 'United States of America',
    uid: 'US',
    region: 'NA',
  },
  {
    label: 'Uruguay',
    uid: 'UY',
    region: 'SA',
  },
  {
    label: 'Uzbekistan',
    uid: 'UZ',
    region: 'AS',
  },
  {
    label: 'Vanuatu',
    uid: 'VU',
    region: 'OC',
  },
  {
    label: 'Venezuela (Bolivarian Republic of)',
    uid: 'VE',
    region: 'SA',
  },
  {
    label: 'Viet Nam',
    uid: 'VN',
    region: 'AS',
  },
  {
    label: 'Wallis and Futuna',
    uid: 'WF',
    region: 'OC',
  },
  {
    label: 'Western Sahara',
    uid: 'EH',
    region: 'AF',
  },
  {
    label: 'Yemen',
    uid: 'YE',
    region: 'AS',
  },
  {
    label: 'Zambia',
    uid: 'ZM',
    region: 'AF',
  },
  {
    label: 'Zimbabwe',
    uid: 'ZW',
    region: 'AF',
  },
];

// export const CITIES = [
//  { label: 'Alicante' },
//  { label: 'Amsterdam' },
//  { label: 'Antwerp' },
//  { label: 'Athens' },
//  { label: 'Barcelona' },
//  { label: 'Bari' },
//  { label: 'Basel' },
//  { label: 'Belgrade' },
//  { label: 'Berlin' },
//  { label: 'Bilbao' },
//  { label: 'Birmingham' },
//  { label: 'Bologna' },
//  { label: 'Bordeaux' },
//  { label: 'Brasov' },
//  { label: 'Bratislava' },
//  { label: 'Brussels' },
//  { label: 'Bucharest' },
//  { label: 'Budapest' },
//  { label: 'Charleroi' },
//  { label: 'Cluj Napoca' },
//  { label: 'Cologne' },
//  { label: 'Copenhagen' },
//  { label: 'Debrecen' },
//  { label: 'Dublin' },
//  { label: 'Dusseldorf' },
//  { label: 'Edinburgh' },
//  { label: 'Frankfurt' },
//  { label: 'Gdansk' },
//  { label: 'Geneva' },
//  { label: 'Genoa' },
//  { label: 'Ghent' },
//  { label: 'Glasgow' },
//  { label: 'Goteborg' },
//  { label: 'Graz' },
//  { label: 'Gyor' },
//  { label: 'Hamburg' },
//  { label: 'Helsinki' },
//  { label: 'Klaipeda' },
//  { label: 'Kosice' },
//  { label: 'Cracow' },
//  { label: 'Leeds' },
//  { label: 'Leipzig' },
//  { label: 'Liege' },
//  { label: 'Lille' },
//  { label: 'Lisbon' },
//  { label: 'Ljubljana' },
//  { label: 'Lodz' },
//  { label: 'London' },
//  { label: 'Luxembourg' },
//  { label: 'Lyon' },
//  { label: 'Madrid' },
//  { label: 'Malaga' },
//  { label: 'Marseille' },
//  { label: 'Milan' },
//  { label: 'Miskolc' },
//  { label: 'Montpellier' },
//  { label: 'Munich' },
//  { label: 'Murcia' },
//  { label: 'Nantes' },
//  { label: 'Naples' },
//  { label: 'Newcastle' },
//  { label: 'Nice' },
//  { label: 'Novi Sad' },
//  { label: 'Oslo' },
//  { label: 'Padua' },
//  { label: 'Palermo' },
//  { label: 'Palma de Mallorca' },
//  { label: 'Paris' },
//  { label: 'Pecs' },
//  { label: 'Podgorica' },
//  { label: 'Porto' },
//  { label: 'Prague' },
//  { label: 'Reykjavik' },
//  { label: 'Riga' },
//  { label: 'Rome' },
//  { label: 'Rotterdam' },
//  { label: 'Sarajevo' },
//  { label: 'Sevilla' },
//  { label: 'Skopje' },
//  { label: 'Sofia' },
//  { label: 'Split' },
//  { label: 'Stockholm' },
//  { label: 'Strasbourg' },
//  { label: 'Szeged' },
//  { label: 'Tallinn' },
//  { label: 'Tartu' },
//  { label: 'Thessaloniki' },
//  { label: 'Tirana' },
//  { label: 'Toulouse' },
//  { label: 'Trieste' },
//  { label: 'Turin' },
//  { label: 'Utrecht' },
//  { label: 'Valencia' },
//  { label: 'Varna' },
//  { label: 'Vienna' },
//  { label: 'Vilnius' },
//  { label: 'Warsaw' },
//  { label: 'Wroclaw' },
//  { label: 'Zagreb' },
//  { label: 'Zurich' }
// ]

// export const SCENARIOS = [{
//   "label": "NDC",
//   "uid": "unique identifier",
//   "scenarioData": {
//     "hasCDR": true,
//     "hasLateNetZero": true,
//     "overshootMagnitude": {
//       "value": 0.15,
//       "hasWarning": false
//     },
//     "overshootLength": {
//       "value": [2050, 2070],
//       "hasWarning": false
//     },
//     "peakWarming": {
//       "value": 1.76,
//       "hasWarning": false
//     },
//     "peakYear": {
//       "value": 2044,
//       "hasWarning": false
//     },
//     "GMT2100": {
//       "value": 1.54,
//       "hasWarning": false
//     },
//     "netZero": {
//       "value": 2046,
//       "hasWarning": false
//     },
//     "netZeroGHG": {
//       "value": 2047,
//       "hasWarning": false
//     },
//     "emissions2030": {
//       "value": 2000,
//       "hasWarning": false
//     },
//     "CDRLevel": {
//       "value": 2044,
//       "hasWarning": false
//     },
//     "noCO2Mitigation": {
//       "value": 50,
//       "hasWarning": false
//     },
//     "temperature": {
//       "startYear": 2000,
//       "yearStep": 5,
//       "data": [1.5, 2.0, 2.0, 2.0]
//     },
//     "emissions": {
//       "startYear": 2000,
//       "yearStep": 5,
//       "data": [1.5, 2.0, 2.0, 2.0]
//     }
//   }
// },
// {
//   "label": "Current policy",
//   "uid": "unique identifier",
//   "scenarioData": {
//     "hasCDR": true,
//     "hasLateNetZero": true,
//     "overshootMagnitude": {
//       "value": 0.15,
//       "hasWarning": false
//     },
//     "overshootLength": {
//       "value": [2050, 2070],
//       "hasWarning": false
//     },
//     "peakWarming": {
//       "value": 1.76,
//       "hasWarning": false
//     },
//     "peakYear": {
//       "value": 2044,
//       "hasWarning": false
//     },
//     "GMT2100": {
//       "value": 1.54,
//       "hasWarning": false
//     },
//     "netZero": {
//       "value": 2046,
//       "hasWarning": false
//     },
//     "netZeroGHG": {
//       "value": 2047,
//       "hasWarning": false
//     },
//     "emissions2030": {
//       "value": 2000,
//       "hasWarning": false
//     },
//     "CDRLevel": {
//       "value": 2044,
//       "hasWarning": false
//     },
//     "noCO2Mitigation": {
//       "value": 50,
//       "hasWarning": false
//     },
//     "temperature": {
//       "startYear": 2000,
//       "yearStep": 5,
//       "data": [1.5, 2.0, 2.0, 2.0]
//     },
//     "emissions": {
//       "startYear": 2000,
//       "yearStep": 5,
//       "data": [1.5, 2.0, 2.0, 2.0]
//     }
//   }
// }]
