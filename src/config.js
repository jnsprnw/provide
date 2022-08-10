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
      'surface-air-temperature',
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
    uid: 'eu',
    label: 'Europe',
  },
  {
    uid: 'as',
    label: 'Asia',
  },
  {
    uid: 'af',
    label: 'Africa',
  },
  {
    uid: 'oc',
    label: 'Oceania',
  },
  {
    uid: 'na',
    label: 'North America',
  },
  {
    uid: 'sa',
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
    continent: 'as',
  },
  {
    label: 'Åland Islands',
    uid: 'ALA',
    continent: 'eu',
  },
  {
    label: 'Albania',
    uid: 'ALB',
    continent: 'eu',
  },
  {
    label: 'Algeria',
    uid: 'DZA',
    continent: 'af',
  },
  {
    label: 'American Samoa',
    uid: 'ASM',
    continent: 'oc',
  },
  {
    label: 'Andorra',
    uid: 'AND',
    continent: 'eu',
  },
  {
    label: 'Angola',
    uid: 'AGO',
    continent: 'af',
  },
  {
    label: 'Anguilla',
    uid: 'AIA',
    continent: 'na',
  },
  {
    label: 'Antigua and Barbuda',
    uid: 'ATG',
    continent: 'na',
  },
  {
    label: 'Argentina',
    uid: 'ARG',
    continent: 'sa',
  },
  {
    label: 'Armenia',
    uid: 'ARM',
    continent: 'as',
  },
  {
    label: 'Aruba',
    uid: 'ABW',
    continent: 'sa',
  },
  {
    label: 'Australia',
    uid: 'AUS',
    continent: 'oc',
  },
  {
    label: 'Austria',
    uid: 'AUT',
    continent: 'eu',
  },
  {
    label: 'Azerbaijan',
    uid: 'AZE',
    continent: 'as',
  },
  {
    label: 'Bahamas',
    uid: 'BHS',
    continent: 'na',
  },
  {
    label: 'Bahrain',
    uid: 'BHR',
    continent: 'as',
  },
  {
    label: 'Bangladesh',
    uid: 'BGD',
    continent: 'as',
  },
  {
    label: 'Barbados',
    uid: 'BRB',
    continent: 'na',
  },
  {
    label: 'Belarus',
    uid: 'BLR',
    continent: 'eu',
  },
  {
    label: 'Belgium',
    uid: 'BEL',
    continent: 'eu',
  },
  {
    label: 'Belize',
    uid: 'BLZ',
    continent: 'na',
  },
  {
    label: 'Benin',
    uid: 'BEN',
    continent: 'af',
  },
  {
    label: 'Bermuda',
    uid: 'BMU',
    continent: 'na',
  },
  {
    label: 'Bhutan',
    uid: 'BTN',
    continent: 'as',
  },
  {
    label: 'Bolivia (Plurinational State of)',
    uid: 'BOL',
    continent: 'sa',
  },
  {
    label: 'Bonaire, Sint Eustatius and Saba',
    uid: 'BES',
    continent: 'sa',
  },
  {
    label: 'Bosnia and Herzegovina',
    uid: 'BIH',
    continent: 'eu',
  },
  {
    label: 'Botswana',
    uid: 'BWA',
    continent: 'af',
  },
  {
    label: 'Bouvet Island',
    uid: 'BVT',
    continent: 'na',
  },
  {
    label: 'Brazil',
    uid: 'BRA',
    continent: 'sa',
  },
  {
    label: 'British Indian Ocean Territory',
    uid: 'IOT',
    continent: 'af',
  },
  {
    label: 'United States Minor Outlying Islands',
    uid: 'UMI',
    continent: 'na',
  },
  {
    label: 'Virgin Islands (British)',
    uid: 'VGB',
    continent: 'na',
  },
  {
    label: 'Virgin Islands (U.S.)',
    uid: 'VIR',
    continent: 'na',
  },
  {
    label: 'Brunei Darussalam',
    uid: 'BRN',
    continent: 'as',
  },
  {
    label: 'Bulgaria',
    uid: 'BGR',
    continent: 'eu',
  },
  {
    label: 'Burkina Faso',
    uid: 'BFA',
    continent: 'af',
  },
  {
    label: 'Burundi',
    uid: 'BDI',
    continent: 'af',
  },
  {
    label: 'Cambodia',
    uid: 'KHM',
    continent: 'as',
  },
  {
    label: 'Cameroon',
    uid: 'CMR',
    continent: 'af',
  },
  {
    label: 'Canada',
    uid: 'CAN',
    continent: 'na',
  },
  {
    label: 'Cabo Verde',
    uid: 'CPV',
    continent: 'af',
  },
  {
    label: 'Cayman Islands',
    uid: 'CYM',
    continent: 'na',
    demonym: 'Caymanian',
  },
  {
    label: 'Central African Republic',
    uid: 'CAF',
    continent: 'af',
  },
  {
    label: 'Chad',
    uid: 'TCD',
    continent: 'af',
  },
  {
    label: 'Chile',
    uid: 'CHL',
    continent: 'sa',
  },
  {
    label: 'China',
    uid: 'CHN',
    continent: 'as',
  },
  {
    label: 'Christmas Island',
    uid: 'ISL',
    continent: 'oc',
  },
  {
    label: 'Cocos (Keeling) Islands',
    uid: 'CCK',
    continent: 'oc',
  },
  {
    label: 'Colombia',
    uid: 'COL',
    continent: 'sa',
  },
  {
    label: 'Comoros',
    uid: 'COM',
    continent: 'af',
  },
  {
    label: 'Congo',
    uid: 'COG',
    continent: 'af',
  },
  {
    label: 'Congo (Democratic Republic of the)',
    uid: 'COD',
    continent: 'af',
  },
  {
    label: 'Cook Islands',
    uid: 'COK',
    continent: 'oc',
  },
  {
    label: 'Costa Rica',
    uid: 'CRI',
    continent: 'na',
  },
  {
    label: 'Croatia',
    uid: 'HRV',
    continent: 'eu',
  },
  {
    label: 'Cuba',
    uid: 'CUB',
    continent: 'na',
  },
  {
    label: 'Curaçao',
    uid: 'CUW',
    continent: 'sa',
  },
  {
    label: 'Cyprus',
    uid: 'CYP',
    continent: 'eu',
  },
  {
    label: 'Czech Republic',
    uid: 'CZE',
    continent: 'eu',
  },
  {
    label: 'Denmark',
    uid: 'DNK',
    continent: 'eu',
  },
  {
    label: 'Djibouti',
    uid: 'DJI',
    continent: 'af',
  },
  {
    label: 'Dominica',
    uid: 'DMA',
    continent: 'na',
  },
  {
    label: 'Dominican Republic',
    uid: 'DOM',
    continent: 'na',
  },
  {
    label: 'Ecuador',
    uid: 'ECU',
    continent: 'sa',
  },
  {
    label: 'Egypt',
    uid: 'EGY',
    continent: 'af',
  },
  {
    label: 'El Salvador',
    uid: 'SLV',
    continent: 'na',
  },
  {
    label: 'Equatorial Guinea',
    uid: 'GNQ',
    continent: 'af',
  },
  {
    label: 'Eritrea',
    uid: 'ERI',
    continent: 'af',
  },
  {
    label: 'Estonia',
    uid: 'EST',
    continent: 'eu',
  },
  {
    label: 'Ethiopia',
    uid: 'ETH',
    continent: 'af',
  },
  {
    label: 'Falkland Islands (Malvinas)',
    uid: 'FLK',
    continent: 'sa',
  },
  {
    label: 'Faroe Islands',
    uid: 'FRO',
    continent: 'eu',
  },
  {
    label: 'Fiji',
    uid: 'FJI',
    continent: 'oc',
  },
  {
    label: 'Finland',
    uid: 'FIN',
    continent: 'eu',
  },
  {
    label: 'France',
    uid: 'FRA',
    continent: 'eu',
    demonym: 'French',
  },
  {
    label: 'French Guiana',
    uid: 'GUF',
    continent: 'sa',
  },
  {
    label: 'French Polynesia',
    uid: 'PYF',
    continent: 'oc',
  },
  {
    label: 'French Southern Territories',
    uid: 'ATF',
    continent: 'af',
  },
  {
    label: 'Gabon',
    uid: 'GAB',
    continent: 'af',
  },
  {
    label: 'Gambia',
    uid: 'GMB',
    continent: 'af',
  },
  {
    label: 'Georgia',
    uid: 'GEO',
    continent: 'as',
  },
  {
    label: 'Germany',
    uid: 'DEU',
    continent: 'eu',
  },
  {
    label: 'Ghana',
    uid: 'GHA',
    continent: 'af',
  },
  {
    label: 'Gibraltar',
    uid: 'GIB',
    continent: 'eu',
  },
  {
    label: 'Greece',
    uid: 'GRC',
    continent: 'eu',
  },
  {
    label: 'Greenland',
    uid: 'GRL',
    continent: 'na',
  },
  {
    label: 'Grenada',
    uid: 'GRD',
    continent: 'na',
  },
  {
    label: 'Guadeloupe',
    uid: 'GLP',
    continent: 'na',
  },
  {
    label: 'Guam',
    uid: 'GUM',
    continent: 'oc',
  },
  {
    label: 'Guatemala',
    uid: 'GTM',
    continent: 'na',
  },
  {
    label: 'Guernsey',
    uid: 'GGY',
    continent: 'eu',
  },
  {
    label: 'Guinea',
    uid: 'GIN',
    continent: 'af',
  },
  {
    label: 'Guinea-Bissau',
    uid: 'GNB',
    continent: 'af',
  },
  {
    label: 'Guyana',
    uid: 'GUY',
    continent: 'sa',
  },
  {
    label: 'Haiti',
    uid: 'HTI',
    continent: 'Americas',
  },
  {
    label: 'Heard Island and McDonald Islands',
    uid: 'HMD',
    continent: 'oc',
  },
  {
    label: 'Holy See',
    uid: 'VAT',
    continent: 'eu',
  },
  {
    label: 'Honduras',
    uid: 'HND',
    continent: 'na',
  },
  {
    label: 'Hong Kong',
    uid: 'HKG',
    continent: 'as',
  },
  {
    label: 'Hungary',
    uid: 'HUN',
    continent: 'eu',
  },
  {
    label: 'Iceland',
    uid: 'ISL',
    continent: 'eu',
  },
  {
    label: 'India',
    uid: 'IND',
    continent: 'as',
  },
  {
    label: 'Indonesia',
    uid: 'IDN',
    continent: 'as',
  },
  {
    label: "Côte d'Ivoire",
    uid: 'CIV',
    continent: 'af',
  },
  {
    label: 'Iran (Islamic Republic of)',
    uid: 'IRN',
    continent: 'as',
  },
  {
    label: 'Iraq',
    uid: 'IRQ',
    continent: 'as',
  },
  {
    label: 'Ireland',
    uid: 'IRL',
    continent: 'eu',
  },
  {
    label: 'Isle of Man',
    uid: 'IMN',
    continent: 'eu',
  },
  {
    label: 'Israel',
    uid: 'ISR',
    continent: 'as',
  },
  {
    label: 'Italy',
    uid: 'ITA',
    continent: 'eu',
  },
  {
    label: 'Jamaica',
    uid: 'JAM',
    continent: 'na',
  },
  {
    label: 'Japan',
    uid: 'JPN',
    continent: 'as',
  },
  {
    label: 'Jersey',
    uid: 'JEY',
    continent: 'eu',
  },
  {
    label: 'Jordan',
    uid: 'JOR',
    continent: 'as',
  },
  {
    label: 'Kazakhstan',
    uid: 'KAZ',
    continent: 'as',
  },
  {
    label: 'Kenya',
    uid: 'KEN',
    continent: 'af',
  },
  {
    label: 'Kiribati',
    uid: 'KIR',
    continent: 'oc',
  },
  {
    label: 'Kuwait',
    uid: 'KWT',
    continent: 'as',
  },
  {
    label: 'Kyrgyzstan',
    uid: 'KGZ',
    continent: 'as',
  },
  {
    label: "Lao People's Democratic Republic",
    uid: 'LAO',
    continent: 'as',
  },
  {
    label: 'Latvia',
    uid: 'LVA',
    continent: 'eu',
  },
  {
    label: 'Lebanon',
    uid: 'LBN',
    continent: 'as',
  },
  {
    label: 'Lesotho',
    uid: 'LSO',
    continent: 'af',
  },
  {
    label: 'Liberia',
    uid: 'LBR',
    continent: 'af',
  },
  {
    label: 'Libya',
    uid: 'LBY',
    continent: 'af',
  },
  {
    label: 'Liechtenstein',
    uid: 'LIE',
    continent: 'eu',
  },
  {
    label: 'Lithuania',
    uid: 'LTU',
    continent: 'eu',
  },
  {
    label: 'Luxembourg',
    uid: 'LUX',
    continent: 'eu',
  },
  {
    label: 'Macao',
    uid: 'MAC',
    continent: 'as',
  },
  {
    label: 'Macedonia (the former Yugoslav Republic of)',
    uid: 'MKD',
    continent: 'eu',
  },
  {
    label: 'Madagascar',
    uid: 'MDG',
    continent: 'af',
  },
  {
    label: 'Malawi',
    uid: 'MWI',
    continent: 'af',
  },
  {
    label: 'Malaysia',
    uid: 'MYS',
    continent: 'as',
  },
  {
    label: 'Maldives',
    uid: 'MDV',
    continent: 'as',
  },
  {
    label: 'Mali',
    uid: 'MLI',
    continent: 'af',
  },
  {
    label: 'Malta',
    uid: 'MLT',
    continent: 'eu',
  },
  {
    label: 'Marshall Islands',
    uid: 'MHL',
    continent: 'oc',
  },
  {
    label: 'Martinique',
    uid: 'MTQ',
    continent: 'Americas',
  },
  {
    label: 'Mauritania',
    uid: 'MRT',
    continent: 'af',
  },
  {
    label: 'Mauritius',
    uid: 'MUS',
    continent: 'af',
  },
  {
    label: 'Mayotte',
    uid: 'MYT',
    continent: 'af',
  },
  {
    label: 'Mexico',
    uid: 'MEX',
    continent: 'na',
  },
  {
    label: 'Micronesia (Federated States of)',
    uid: 'FSM',
    continent: 'oc',
  },
  {
    label: 'Moldova (Republic of)',
    uid: 'MDA',
    continent: 'eu',
  },
  {
    label: 'Monaco',
    uid: 'MCO',
    continent: 'eu',
  },
  {
    label: 'Mongolia',
    uid: 'MNG',
    continent: 'as',
  },
  {
    label: 'Montenegro',
    uid: 'MNE',
    continent: 'eu',
  },
  {
    label: 'Montserrat',
    uid: 'MSR',
    continent: 'na',
  },
  {
    label: 'Morocco',
    uid: 'MAR',
    continent: 'af',
  },
  {
    label: 'Mozambique',
    uid: 'MOZ',
    continent: 'af',
  },
  {
    label: 'Myanmar',
    uid: 'MMR',
    continent: 'as',
  },
  {
    label: 'Namibia',
    uid: 'NAM',
    continent: 'af',
  },
  {
    label: 'Nauru',
    uid: 'NRU',
    continent: 'oc',
  },
  {
    label: 'Nepal',
    uid: 'NPL',
    continent: 'as',
  },
  {
    label: 'Netherlands',
    uid: 'NLD',
    continent: 'eu',
  },
  {
    label: 'New Caledonia',
    uid: 'NCL',
    continent: 'oc',
  },
  {
    label: 'New Zealand',
    uid: 'NZL',
    continent: 'oc',
  },
  {
    label: 'Nicaragua',
    uid: 'NIC',
    continent: 'na',
  },
  {
    label: 'Niger',
    uid: 'NER',
    continent: 'af',
  },
  {
    label: 'Nigeria',
    uid: 'NGA',
    continent: 'af',
  },
  {
    label: 'Niue',
    uid: 'NIU',
    continent: 'oc',
  },
  {
    label: 'Norfolk Island',
    uid: 'NFK',
    continent: 'oc',
  },
  {
    label: "Korea (Democratic People's Republic of)",
    uid: 'PRK',
    continent: 'as',
  },
  {
    label: 'Northern Mariana Islands',
    uid: 'MNP',
    continent: 'oc',
  },
  {
    label: 'Norway',
    uid: 'NOR',
    continent: 'eu',
  },
  {
    label: 'Oman',
    uid: 'OMN',
    continent: 'as',
  },
  {
    label: 'Pakistan',
    uid: 'PAK',
    continent: 'as',
  },
  {
    label: 'Palau',
    uid: 'PLW',
    continent: 'oc',
  },
  {
    label: 'Palestine, State of',
    uid: 'PSE',
    continent: 'as',
  },
  {
    label: 'Panama',
    uid: 'PAN',
    continent: 'na',
  },
  {
    label: 'Papua New Guinea',
    uid: 'PNG',
    continent: 'oc',
  },
  {
    label: 'Paraguay',
    uid: 'PRY',
    continent: 'sa',
  },
  {
    label: 'Peru',
    uid: 'PER',
    continent: 'sa',
  },
  {
    label: 'Philippines',
    uid: 'PHL',
    continent: 'as',
  },
  {
    label: 'Pitcairn',
    uid: 'PCN',
    continent: 'oc',
  },
  {
    label: 'Poland',
    uid: 'POL',
    continent: 'eu',
  },
  {
    label: 'Portugal',
    uid: 'PRT',
    continent: 'eu',
  },
  {
    label: 'Puerto Rico',
    uid: 'PRI',
    continent: 'na',
  },
  {
    label: 'Qatar',
    uid: 'QAT',
    continent: 'as',
  },
  {
    label: 'Republic of Kosovo',
    uid: 'UNK',
    continent: 'eu',
  },
  {
    label: 'Réunion',
    uid: 'REU',
    continent: 'af',
  },
  {
    label: 'Romania',
    uid: 'ROU',
    continent: 'eu',
  },
  {
    label: 'Russian Federation',
    uid: 'RUS',
    continent: 'eu',
  },
  {
    label: 'Rwanda',
    uid: 'RWA',
    continent: 'af',
  },
  {
    label: 'Saint Barthélemy',
    uid: 'BLM',
    continent: 'na',
  },
  {
    label: 'Saint Helena, Ascension and Tristan da Cunha',
    uid: 'SHN',
    continent: 'af',
  },
  {
    label: 'Saint Kitts and Nevis',
    uid: 'KNA',
    continent: 'na',
  },
  {
    label: 'Saint Lucia',
    uid: 'LCA',
    continent: 'na',
  },
  {
    label: 'Saint Martin (French part)',
    uid: 'MAF',
    continent: 'na',
  },
  {
    label: 'Saint Pierre and Miquelon',
    uid: 'SPM',
    continent: 'na',
  },
  {
    label: 'Saint Vincent and the Grenadines',
    uid: 'VCT',
    continent: 'na',
  },
  {
    label: 'Samoa',
    uid: 'WSM',
    continent: 'oc',
  },
  {
    label: 'San Marino',
    uid: 'SMR',
    continent: 'eu',
  },
  {
    label: 'Sao Tome and Principe',
    uid: 'STP',
    continent: 'af',
  },
  {
    label: 'Saudi Arabia',
    uid: 'SAU',
    continent: 'as',
  },
  {
    label: 'Senegal',
    uid: 'SEN',
    continent: 'af',
  },
  {
    label: 'Serbia',
    uid: 'SRB',
    continent: 'eu',
  },
  {
    label: 'Seychelles',
    uid: 'SYC',
    continent: 'af',
  },
  {
    label: 'Sierra Leone',
    uid: 'SLE',
    continent: 'af',
  },
  {
    label: 'Singapore',
    uid: 'SGP',
    continent: 'as',
  },
  {
    label: 'Sint Maarten (Dutch part)',
    uid: 'SXM',
    continent: 'Americas',
  },
  {
    label: 'Slovakia',
    uid: 'SVK',
    continent: 'eu',
  },
  {
    label: 'Slovenia',
    uid: 'SVN',
    continent: 'eu',
  },
  {
    label: 'Solomon Islands',
    uid: 'SLB',
    continent: 'oc',
  },
  {
    label: 'Somalia',
    uid: 'SOM',
    continent: 'af',
  },
  {
    label: 'South Africa',
    uid: 'ZAF',
    continent: 'af',
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    uid: 'SGS',
    continent: 'na',
  },
  {
    label: 'Korea (Republic of)',
    uid: 'KOR',
    continent: 'as',
  },
  {
    label: 'South Sudan',
    uid: 'SSD',
    continent: 'af',
  },
  {
    label: 'Spain',
    uid: 'ESP',
    continent: 'eu',
  },
  {
    label: 'Sri Lanka',
    uid: 'LKA',
    continent: 'as',
  },
  {
    label: 'Sudan',
    uid: 'SDN',
    continent: 'af',
  },
  {
    label: 'Surilabel',
    uid: 'unknown',
    continent: 'sa',
  },
  {
    label: 'Svalbard and Jan Mayen',
    uid: 'SJM',
    continent: 'eu',
  },
  {
    label: 'Swaziland',
    uid: 'SWZ',
    continent: 'af',
  },
  {
    label: 'Sweden',
    uid: 'SWE',
    continent: 'eu',
  },
  {
    label: 'Switzerland',
    uid: 'CHE',
    continent: 'eu',
  },
  {
    label: 'Syrian Arab Republic',
    uid: 'SYR',
    continent: 'as',
  },
  {
    label: 'Taiwan',
    uid: 'TWN',
    continent: 'as',
  },
  {
    label: 'Tajikistan',
    uid: 'TJK',
    continent: 'as',
  },
  {
    label: 'Tanzania, United Republic of',
    uid: 'TZA',
    continent: 'af',
  },
  {
    label: 'Thailand',
    uid: 'THA',
    continent: 'as',
  },
  {
    label: 'Timor-Leste',
    uid: 'TLS',
    continent: 'as',
  },
  {
    label: 'Togo',
    uid: 'TGO',
    continent: 'af',
  },
  {
    label: 'Tokelau',
    uid: 'TKL',
    continent: 'oc',
  },
  {
    label: 'Tonga',
    uid: 'TON',
    continent: 'oc',
  },
  {
    label: 'Trinidad and Tobago',
    uid: 'TTO',
    continent: 'sa',
  },
  {
    label: 'Tunisia',
    uid: 'TUN',
    continent: 'af',
  },
  {
    label: 'Turkey',
    uid: 'TUR',
    continent: 'as',
  },
  {
    label: 'Turkmenistan',
    uid: 'TKM',
    continent: 'as',
  },
  {
    label: 'Turks and Caicos Islands',
    uid: 'TCA',
    continent: 'na',
  },
  {
    label: 'Tuvalu',
    uid: 'TUV',
    continent: 'oc',
  },
  {
    label: 'Uganda',
    uid: 'UGA',
    continent: 'af',
  },
  {
    label: 'Ukraine',
    uid: 'UKR',
    continent: 'eu',
  },
  {
    label: 'United Arab Emirates',
    uid: 'ARE',
    continent: 'as',
  },
  {
    label: 'United Kingdom of Great Britain and Northern Ireland',
    uid: 'GBR',
    continent: 'eu',
  },
  {
    label: 'United States of America',
    uid: 'USA',
    continent: 'na',
  },
  {
    label: 'Uruguay',
    uid: 'URY',
    continent: 'sa',
  },
  {
    label: 'Uzbekistan',
    uid: 'UZB',
    continent: 'as',
  },
  {
    label: 'Vanuatu',
    uid: 'VUT',
    continent: 'oc',
  },
  {
    label: 'Venezuela (Bolivarian Republic of)',
    uid: 'VEN',
    continent: 'sa',
  },
  {
    label: 'Viet Nam',
    uid: 'VNM',
    continent: 'as',
  },
  {
    label: 'Wallis and Futuna',
    uid: 'WLF',
    continent: 'oc',
  },
  {
    label: 'Western Sahara',
    uid: 'ESH',
    continent: 'af',
  },
  {
    label: 'Yemen',
    uid: 'YEM',
    continent: 'as',
  },
  {
    label: 'Zambia',
    uid: 'ZMB',
    continent: 'af',
  },
  {
    label: 'Zimbabwe',
    uid: 'ZWE',
    continent: 'af',
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
      warming2050: {
        data: 0.26, // DUMMY
      },
      'warming2050-2100': {
        data: 0.15, // DUMMY
      },
      temperature: {
        data: [
          1.2456, 1.3416, 1.4192, 1.5132, 1.6074, 1.6966, 1.7818, 1.8819,
          1.9877, 2.1007, 2.2175, 2.3347, 2.4526, 2.5694, 2.6847, 2.8015,
          2.9206,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [
          57615.53110072017, 62055.39923044584, 64712.28907750579,
          66646.13989194669, 69205.41168059764, 70592.27561457043,
          70993.30944692672, 69703.14555260717, 68309.02780012568,
        ],
        yearStart: 2020,
        yearStep: 10,
      },
    },
  },
  {
    label: 'Delayed Action',
    uid: 'da',
    description:
      'Energy demand is reduced in the 2030s and the transition to variable renewable energy accelerates then too. Renewable energy never forces out all fossil fuel use \u2013 carbon dioxide is captured from the air and buried instead, along with reforestation.',
    isPrimary: true,
    scenarioData: {
      warming2050: {
        data: 0.7, // DUMMY
      },
      'warming2050-2100': {
        data: 0.7, // DUMMY
      },
      temperature: {
        data: [
          1.2314, 1.3313, 1.4249, 1.5116, 1.5828, 1.6256, 1.6496, 1.6637,
          1.6747, 1.6803, 1.6851, 1.6864, 1.6866, 1.6806, 1.6748, 1.6638,
          1.6571,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [
          56397.219277746284, 43316.11053375207, 25793.185379649483,
          17279.239743693746, 12673.173725914789, 8242.882235963265,
          3095.5259172153674, 953.2173358968384, -290.09588330653787,
        ],
        yearStart: 2020,
        yearStep: 10,
      },
    },
  },
  {
    label: 'Shifting Pathways',
    uid: 'sp',
    description:
      'This pathway explores how a broader shift towards sustainable development can be combined with climate policies consistent with keeping warming to 1.5\u02daC. Energy demand is reduced over time, while renewable energy use grows, squeezing out fossil fuel use.',
    isPrimary: true,
    scenarioData: {
      warming2050: {
        data: 0.6, // DUMMY
      },
      'warming2050-2100': {
        data: 0.6, // DUMMY
      },
      temperature: {
        data: [
          1.2386, 1.3499, 1.4402, 1.4971, 1.5173, 1.5148, 1.4909, 1.4602,
          1.4317, 1.4076, 1.3871, 1.3662, 1.3488, 1.3314, 1.3171, 1.3014,
          1.2874,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [
          56111.428375521034, 33339.86719609621, 19151.999428983596,
          10193.376100848398, 6165.195159270135, 3081.124799579309,
          1326.0128802203708, 423.65101457033506, -604.0758731657097,
        ],
        yearStart: 2020,
        yearStep: 10,
      },
    },
  },
  {
    label: 'NDCs Pathway',
    uid: 'ndc',
    description:
      'This pathway explores the impact of countries sticking to their Nationally Determined Contributions (NDCs) as stated in 2020. These are often more ambitious than currently implemented policies, but for most countries do not ratchet up very rapidly. Similar levels of mitigation effort are expected going forwards.',
    isPrimary: false,
    scenarioData: {
      warming2050: {
        data: 0.1, // DUMMY
      },
      'warming2050-2100': {
        data: 0.1, // DUMMY
      },
      temperature: {
        data: [
          1.2333, 1.3299, 1.4358, 1.5453, 1.649, 1.7511, 1.8501, 1.9506, 2.0498,
          2.1453, 2.231, 2.3138, 2.3852, 2.4428, 2.4933, 2.5288, 2.5577,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [
          60809.478747147085, 53775.02191839159, 55032.08701233139,
          57411.01697895689, 56734.13826377133, 52805.31264527934,
          41502.83555833753, 32026.671545838253, 31119.073371116436,
        ],
        yearStart: 2020,
        yearStep: 10,
      },
    },
  },
  {
    label: 'High Negative Emissions',
    uid: 'hne',
    description:
      'Pathway with highest negative emissions (carbon-removing technology). Fossil fuel use decreases slowly, replaced about equally by variable renewable energy and biofuels. The carbon from burning the biofuels is captured and buried, offsetting the continued fossil fuel use.',
    isPrimary: false,
    scenarioData: {
      warming2050: {
        data: 0.27, // DUMMY
      },
      'warming2050-2100': {
        data: 0.7, // DUMMY
      },
      temperature: {
        data: [
          1.257, 1.3647, 1.4636, 1.5402, 1.5904, 1.6219, 1.6414, 1.6558, 1.6594,
          1.6457, 1.6245, 1.5933, 1.5599, 1.5309, 1.5078, 1.4744, 1.4419,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [
          54194.58148808071, 38055.219165369286, 29161.77541338333,
          19919.647408809105, 8107.657897474299, 954.8858372413488,
          -938.3943972233901, -6024.176887516463, -6066.100180065413,
        ],
        yearStart: 2020,
        yearStep: 10,
      },
    },
  },
  {
    label: 'High Renewables',
    uid: 'hr',
    description:
      'Energy demand is reduced rapidly in the short-term, though grows later. Growth in renewables is very rapid and squeezes out most all other types of energy. Some biofuel is used to balance renewable variability, and the emissions from this are captured and buried.',
    isPrimary: false,
    scenarioData: {
      warming2050: {
        data: 0.27, // DUMMY
      },
      'warming2050-2100': {
        data: 0.7, // DUMMY
      },
      temperature: {
        data: [
          1.2365, 1.3516, 1.4487, 1.5061, 1.5263, 1.5294, 1.5235, 1.5136, 1.501,
          1.4913, 1.4819, 1.4774, 1.4715, 1.4664, 1.4622, 1.4577, 1.4556,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [
          58148.341567720905, 29780.0327577802, 17343.46578719779,
          11332.642931053866, 8954.370320990092, 8000.638807192702,
          7374.596252917521, 6731.223378821369, 6577.104404481924,
        ],
        yearStart: 2020,
        yearStep: 10,
      },
    },
  },
  {
    label: 'Low Demand',
    uid: 'ld',
    description:
      'Energy demand is massively reduced by implementing energy efficient lifestyles and design, and kept low throughout the century. Renewable energy grows and gradually forces out fossil fuels.',
    isPrimary: false,
    scenarioData: {
      warming2050: {
        data: 0.6, // DUMMY
      },
      'warming2050-2100': {
        data: 0.2, // DUMMY
      },
      temperature: {
        data: [
          1.24, 1.3505, 1.4439, 1.4911, 1.5104, 1.5053, 1.4889, 1.4701, 1.4491,
          1.4293, 1.415, 1.3994, 1.3846, 1.371, 1.3612, 1.3513, 1.3441,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [
          55219.47344759707, 25849.861596248214, 15180.130292531689,
          9256.507601396197, 6385.806101692713, 4249.500794677756,
          2606.3779827884528, 1887.7104849816878, 1421.0726719011536,
        ],
        yearStart: 2020,
        yearStep: 10,
      },
    },
  },
  {
    label: 'SSP1-1.9',
    uid: 'ssp119',
    description:
      'Renewable energy is deployed rapidly, energy demand is also limited rapidly. There is general focus on sustainability, but also a significant increase in the amount of biofuel use, with the carbon released by this captured and stored (negative emissions). This pathway was used a lot for climate science research conducted as part of the IPCC Sixth Assessment Report.',
    isPrimary: false,
    scenarioData: {
      warming2050: {
        data: 0.1, // DUMMY
      },
      'warming2050-2100': {
        data: 0.9, // DUMMY
      },
      temperature: {
        data: [
          1.2486, 1.3586, 1.4357, 1.4773, 1.4894, 1.4871, 1.4761, 1.4556,
          1.4351, 1.4177, 1.399, 1.3838, 1.3661, 1.3491, 1.3269, 1.3035, 1.2778,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [
          53788.79199039185, 31513.443405763923, 18359.00793218521,
          9253.093252850646, 5300.617314743331, 2065.305036933608,
          -1154.5287244513847, -4678.068893667987, -8217.809548671317,
        ],
        yearStart: 2020,
        yearStep: 10,
      },
    },
  },
  {
    label: 'SSP5-3.4-OS',
    uid: 'ssp534',
    description:
      'Carbon emissions rise at an incredibly fast rate in the short term. Then, around 2040 they decline extremely rapidly through the massive use of negative emissions technologies (for example capturing carbon from biofuel burning or directly from the air, and burying it). This pathway was designed to test the sensitivity of the Earth System to such extreme changes in emissions.',
    isPrimary: false,
    scenarioData: {
      warming2050: {
        data: 0.3, // DUMMY
      },
      'warming2050-2100': {
        data: 0.4, // DUMMY
      },
      temperature: {
        data: [
          1.2637, 1.403, 1.5463, 1.717, 1.9036, 2.0958, 2.2368, 2.3102, 2.3261,
          2.2993, 2.2542, 2.197, 2.1369, 2.0743, 2.0152, 1.9598, 1.9039,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [
          59591.69929557695, 72397.35214490144, 88516.08824959023,
          62052.37850541042, 24776.15222105634, 1841.8054163623528,
          -7665.976361355216, -11807.339428643802, -13925.445898990689,
        ],
        yearStart: 2020,
        yearStep: 10,
      },
    },
  },
  {
    label: 'Stabilisation at 1.5\u00b0C',
    uid: 's1p5',
    description:
      'Temperatures rise as in the demand-limiting case (LD) until the global average reaches 1.5\u00b0C. The temperature is then held constant. This scenario is a simple thought-experiment not driven by economic or climatic considerations.',
    isPrimary: false,
    scenarioData: {
      warming2050: {
        data: 0.4,
      },
      'warming2050-2100': {
        data: 0.9,
      },
      temperature: {
        data: [
          1.24, 1.3505, 1.4439, 1.4911, 1.5006, 1.5006, 1.5006, 1.5006, 1.5006,
          1.5006, 1.5006, 1.5006, 1.5006, 1.5006, 1.5006, 1.5006, 1.5006,
        ],
        yearStart: 2020,
        yearStep: 1,
      },
      emissions: {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        yearStart: 2020,
        yearStep: 10,
      },
    },
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
    uid: 'surface-air-temperature',
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
    uid: 'af',
    continent: 'as',
  },
  {
    label: 'Åland Islands',
    uid: 'AX',
    continent: 'eu',
  },
  {
    label: 'Albania',
    uid: 'AL',
    continent: 'eu',
  },
  {
    label: 'Algeria',
    uid: 'DZ',
    continent: 'af',
  },
  {
    label: 'American Samoa',
    uid: 'as',
    continent: 'oc',
  },
  {
    label: 'Andorra',
    uid: 'AD',
    continent: 'eu',
  },
  {
    label: 'Angola',
    uid: 'AO',
    continent: 'af',
  },
  {
    label: 'Anguilla',
    uid: 'AI',
    continent: 'na',
  },
  {
    label: 'Antigua and Barbuda',
    uid: 'AG',
    continent: 'na',
  },
  {
    label: 'Argentina',
    uid: 'AR',
    continent: 'sa',
  },
  {
    label: 'Armenia',
    uid: 'AM',
    continent: 'as',
  },
  {
    label: 'Aruba',
    uid: 'AW',
    continent: 'sa',
  },
  {
    label: 'Australia',
    uid: 'AU',
    continent: 'oc',
  },
  {
    label: 'Austria',
    uid: 'AT',
    continent: 'eu',
  },
  {
    label: 'Azerbaijan',
    uid: 'AZ',
    continent: 'as',
  },
  {
    label: 'Bahamas',
    uid: 'BS',
    continent: 'na',
  },
  {
    label: 'Bahrain',
    uid: 'BH',
    continent: 'as',
  },
  {
    label: 'Bangladesh',
    uid: 'BD',
    continent: 'as',
  },
  {
    label: 'Barbados',
    uid: 'BB',
    continent: 'na',
  },
  {
    label: 'Belarus',
    uid: 'BY',
    continent: 'eu',
  },
  {
    label: 'Belgium',
    uid: 'BE',
    continent: 'eu',
  },
  {
    label: 'Belize',
    uid: 'BZ',
    continent: 'na',
  },
  {
    label: 'Benin',
    uid: 'BJ',
    continent: 'af',
  },
  {
    label: 'Bermuda',
    uid: 'BM',
    continent: 'na',
  },
  {
    label: 'Bhutan',
    uid: 'BT',
    continent: 'as',
  },
  {
    label: 'Bolivia (Plurinational State of)',
    uid: 'BO',
    continent: 'sa',
  },
  {
    label: 'Bonaire, Sint Eustatius and Saba',
    uid: 'BQ',
    continent: 'sa',
  },
  {
    label: 'Bosnia and Herzegovina',
    uid: 'BA',
    continent: 'eu',
  },
  {
    label: 'Botswana',
    uid: 'BW',
    continent: 'af',
  },
  {
    label: 'Bouvet Island',
    uid: 'BV',
    continent: 'na',
  },
  {
    label: 'Brazil',
    uid: 'BR',
    continent: 'sa',
  },
  {
    label: 'British Indian Ocean Territory',
    uid: 'IO',
    continent: 'af',
  },
  {
    label: 'United States Minor Outlying Islands',
    uid: 'UM',
    continent: 'na',
  },
  {
    label: 'Virgin Islands (British)',
    uid: 'VG',
    continent: 'na',
  },
  {
    label: 'Virgin Islands (U.S.)',
    uid: 'VI',
    continent: 'na',
  },
  {
    label: 'Brunei Darussalam',
    uid: 'BN',
    continent: 'as',
  },
  {
    label: 'Bulgaria',
    uid: 'BG',
    continent: 'eu',
  },
  {
    label: 'Burkina Faso',
    uid: 'BF',
    continent: 'af',
  },
  {
    label: 'Burundi',
    uid: 'BI',
    continent: 'af',
  },
  {
    label: 'Cambodia',
    uid: 'KH',
    continent: 'as',
  },
  {
    label: 'Cameroon',
    uid: 'CM',
    continent: 'af',
  },
  {
    label: 'Canada',
    uid: 'CA',
    continent: 'na',
  },
  {
    label: 'Cabo Verde',
    uid: 'CV',
    continent: 'af',
  },
  {
    label: 'Cayman Islands',
    uid: 'KY',
    continent: 'na',
    demonym: 'Caymanian',
  },
  {
    label: 'Central African Republic',
    uid: 'CF',
    continent: 'af',
  },
  {
    label: 'Chad',
    uid: 'TD',
    continent: 'af',
  },
  {
    label: 'Chile',
    uid: 'CL',
    continent: 'sa',
  },
  {
    label: 'China',
    uid: 'CN',
    continent: 'as',
  },
  {
    label: 'Christmas Island',
    uid: 'CX',
    continent: 'oc',
  },
  {
    label: 'Cocos (Keeling) Islands',
    uid: 'CC',
    continent: 'oc',
  },
  {
    label: 'Colombia',
    uid: 'CO',
    continent: 'sa',
  },
  {
    label: 'Comoros',
    uid: 'KM',
    continent: 'af',
  },
  {
    label: 'Congo',
    uid: 'CG',
    continent: 'af',
  },
  {
    label: 'Congo (Democratic Republic of the)',
    uid: 'CD',
    continent: 'af',
  },
  {
    label: 'Cook Islands',
    uid: 'CK',
    continent: 'oc',
  },
  {
    label: 'Costa Rica',
    uid: 'CR',
    continent: 'na',
  },
  {
    label: 'Croatia',
    uid: 'HR',
    continent: 'eu',
  },
  {
    label: 'Cuba',
    uid: 'CU',
    continent: 'na',
  },
  {
    label: 'Curaçao',
    uid: 'CW',
    continent: 'sa',
  },
  {
    label: 'Cyprus',
    uid: 'CY',
    continent: 'eu',
  },
  {
    label: 'Czech Republic',
    uid: 'CZ',
    continent: 'eu',
  },
  {
    label: 'Denmark',
    uid: 'DK',
    continent: 'eu',
  },
  {
    label: 'Djibouti',
    uid: 'DJ',
    continent: 'af',
  },
  {
    label: 'Dominica',
    uid: 'DM',
    continent: 'na',
  },
  {
    label: 'Dominican Republic',
    uid: 'DO',
    continent: 'na',
  },
  {
    label: 'Ecuador',
    uid: 'EC',
    continent: 'sa',
  },
  {
    label: 'Egypt',
    uid: 'EG',
    continent: 'af',
  },
  {
    label: 'El Salvador',
    uid: 'SV',
    continent: 'na',
  },
  {
    label: 'Equatorial Guinea',
    uid: 'GQ',
    continent: 'af',
  },
  {
    label: 'Eritrea',
    uid: 'ER',
    continent: 'af',
  },
  {
    label: 'Estonia',
    uid: 'EE',
    continent: 'eu',
  },
  {
    label: 'Ethiopia',
    uid: 'ET',
    continent: 'af',
  },
  {
    label: 'Falkland Islands (Malvinas)',
    uid: 'FK',
    continent: 'sa',
  },
  {
    label: 'Faroe Islands',
    uid: 'FO',
    continent: 'eu',
  },
  {
    label: 'Fiji',
    uid: 'FJ',
    continent: 'oc',
  },
  {
    label: 'Finland',
    uid: 'FI',
    continent: 'eu',
  },
  {
    label: 'France',
    uid: 'FR',
    continent: 'eu',
    demonym: 'French',
  },
  {
    label: 'French Guiana',
    uid: 'GF',
    continent: 'sa',
  },
  {
    label: 'French Polynesia',
    uid: 'PF',
    continent: 'oc',
  },
  {
    label: 'French Southern Territories',
    uid: 'TF',
    continent: 'af',
  },
  {
    label: 'Gabon',
    uid: 'GA',
    continent: 'af',
  },
  {
    label: 'Gambia',
    uid: 'GM',
    continent: 'af',
  },
  {
    label: 'Georgia',
    uid: 'GE',
    continent: 'as',
  },
  {
    label: 'Germany',
    uid: 'DE',
    continent: 'eu',
  },
  {
    label: 'Ghana',
    uid: 'GH',
    continent: 'af',
  },
  {
    label: 'Gibraltar',
    uid: 'GI',
    continent: 'eu',
  },
  {
    label: 'Greece',
    uid: 'GR',
    continent: 'eu',
  },
  {
    label: 'Greenland',
    uid: 'GL',
    continent: 'na',
  },
  {
    label: 'Grenada',
    uid: 'GD',
    continent: 'na',
  },
  {
    label: 'Guadeloupe',
    uid: 'GP',
    continent: 'na',
  },
  {
    label: 'Guam',
    uid: 'GU',
    continent: 'oc',
  },
  {
    label: 'Guatemala',
    uid: 'GT',
    continent: 'na',
  },
  {
    label: 'Guernsey',
    uid: 'GG',
    continent: 'eu',
  },
  {
    label: 'Guinea',
    uid: 'GN',
    continent: 'af',
  },
  {
    label: 'Guinea-Bissau',
    uid: 'GW',
    continent: 'af',
  },
  {
    label: 'Guyana',
    uid: 'GY',
    continent: 'sa',
  },
  {
    label: 'Haiti',
    uid: 'HT',
    continent: 'sa',
  },
  {
    label: 'Heard Island and McDonald Islands',
    uid: 'HM',
    continent: 'oc',
  },
  {
    label: 'Holy See',
    uid: 'VA',
    continent: 'eu',
  },
  {
    label: 'Honduras',
    uid: 'HN',
    continent: 'na',
  },
  {
    label: 'Hong Kong',
    uid: 'HK',
    continent: 'as',
  },
  {
    label: 'Hungary',
    uid: 'HU',
    continent: 'eu',
  },
  {
    label: 'Iceland',
    uid: 'IS',
    continent: 'eu',
  },
  {
    label: 'India',
    uid: 'IN',
    continent: 'as',
  },
  {
    label: 'Indonesia',
    uid: 'ID',
    continent: 'as',
  },
  {
    label: "Côte d'Ivoire",
    uid: 'CI',
    continent: 'af',
  },
  {
    label: 'Iran (Islamic Republic of)',
    uid: 'IR',
    continent: 'as',
  },
  {
    label: 'Iraq',
    uid: 'IQ',
    continent: 'as',
  },
  {
    label: 'Ireland',
    uid: 'IE',
    continent: 'eu',
  },
  {
    label: 'Isle of Man',
    uid: 'IM',
    continent: 'eu',
  },
  {
    label: 'Israel',
    uid: 'IL',
    continent: 'as',
  },
  {
    label: 'Italy',
    uid: 'IT',
    continent: 'eu',
  },
  {
    label: 'Jamaica',
    uid: 'JM',
    continent: 'na',
  },
  {
    label: 'Japan',
    uid: 'JP',
    continent: 'as',
  },
  {
    label: 'Jersey',
    uid: 'JE',
    continent: 'eu',
  },
  {
    label: 'Jordan',
    uid: 'JO',
    continent: 'as',
  },
  {
    label: 'Kazakhstan',
    uid: 'KZ',
    continent: 'as',
  },
  {
    label: 'Kenya',
    uid: 'KE',
    continent: 'af',
  },
  {
    label: 'Kiribati',
    uid: 'KI',
    continent: 'oc',
  },
  {
    label: 'Kuwait',
    uid: 'KW',
    continent: 'as',
  },
  {
    label: 'Kyrgyzstan',
    uid: 'KG',
    continent: 'as',
  },
  {
    label: "Lao People's Democratic Republic",
    uid: 'LA',
    continent: 'as',
  },
  {
    label: 'Latvia',
    uid: 'LV',
    continent: 'eu',
  },
  {
    label: 'Lebanon',
    uid: 'LB',
    continent: 'as',
  },
  {
    label: 'Lesotho',
    uid: 'LS',
    continent: 'af',
  },
  {
    label: 'Liberia',
    uid: 'LR',
    continent: 'af',
  },
  {
    label: 'Libya',
    uid: 'LY',
    continent: 'af',
  },
  {
    label: 'Liechtenstein',
    uid: 'LI',
    continent: 'eu',
  },
  {
    label: 'Lithuania',
    uid: 'LT',
    continent: 'eu',
  },
  {
    label: 'Luxembourg',
    uid: 'LU',
    continent: 'eu',
  },
  {
    label: 'Macao',
    uid: 'MO',
    continent: 'as',
  },
  {
    label: 'Macedonia (the former Yugoslav Republic of)',
    uid: 'MK',
    continent: 'eu',
  },
  {
    label: 'Madagascar',
    uid: 'MG',
    continent: 'af',
  },
  {
    label: 'Malawi',
    uid: 'MW',
    continent: 'af',
  },
  {
    label: 'Malaysia',
    uid: 'MY',
    continent: 'as',
  },
  {
    label: 'Maldives',
    uid: 'MV',
    continent: 'as',
  },
  {
    label: 'Mali',
    uid: 'ML',
    continent: 'af',
  },
  {
    label: 'Malta',
    uid: 'MT',
    continent: 'eu',
  },
  {
    label: 'Marshall Islands',
    uid: 'MH',
    continent: 'oc',
  },
  {
    label: 'Martinique',
    uid: 'MQ',
    continent: 'Americas',
  },
  {
    label: 'Mauritania',
    uid: 'MR',
    continent: 'af',
  },
  {
    label: 'Mauritius',
    uid: 'MU',
    continent: 'af',
  },
  {
    label: 'Mayotte',
    uid: 'YT',
    continent: 'af',
  },
  {
    label: 'Mexico',
    uid: 'MX',
    continent: 'na',
  },
  {
    label: 'Micronesia (Federated States of)',
    uid: 'FM',
    continent: 'oc',
  },
  {
    label: 'Moldova (Republic of)',
    uid: 'MD',
    continent: 'eu',
  },
  {
    label: 'Monaco',
    uid: 'MC',
    continent: 'eu',
  },
  {
    label: 'Mongolia',
    uid: 'MN',
    continent: 'as',
  },
  {
    label: 'Montenegro',
    uid: 'ME',
    continent: 'eu',
  },
  {
    label: 'Montserrat',
    uid: 'MS',
    continent: 'na',
  },
  {
    label: 'Morocco',
    uid: 'MA',
    continent: 'af',
  },
  {
    label: 'Mozambique',
    uid: 'MZ',
    continent: 'af',
  },
  {
    label: 'Myanmar',
    uid: 'MM',
    continent: 'as',
  },
  {
    label: 'Namibia',
    uid: 'na',
    continent: 'af',
  },
  {
    label: 'Nauru',
    uid: 'NR',
    continent: 'oc',
  },
  {
    label: 'Nepal',
    uid: 'NP',
    continent: 'as',
  },
  {
    label: 'Netherlands',
    uid: 'NL',
    continent: 'eu',
  },
  {
    label: 'New Caledonia',
    uid: 'NC',
    continent: 'oc',
  },
  {
    label: 'New Zealand',
    uid: 'NZ',
    continent: 'oc',
  },
  {
    label: 'Nicaragua',
    uid: 'NI',
    continent: 'na',
  },
  {
    label: 'Niger',
    uid: 'NE',
    continent: 'af',
  },
  {
    label: 'Nigeria',
    uid: 'NG',
    continent: 'af',
  },
  {
    label: 'Niue',
    uid: 'NU',
    continent: 'oc',
  },
  {
    label: 'Norfolk Island',
    uid: 'NF',
    continent: 'oc',
  },
  {
    label: "Korea (Democratic People's Republic of)",
    uid: 'KP',
    continent: 'as',
  },
  {
    label: 'Northern Mariana Islands',
    uid: 'MP',
    continent: 'oc',
  },
  {
    label: 'Norway',
    uid: 'NO',
    continent: 'eu',
  },
  {
    label: 'Oman',
    uid: 'OM',
    continent: 'as',
  },
  {
    label: 'Pakistan',
    uid: 'PK',
    continent: 'as',
  },
  {
    label: 'Palau',
    uid: 'PW',
    continent: 'oc',
  },
  {
    label: 'Palestine, State of',
    uid: 'PS',
    continent: 'as',
  },
  {
    label: 'Panama',
    uid: 'PA',
    continent: 'na',
  },
  {
    label: 'Papua New Guinea',
    uid: 'PG',
    continent: 'oc',
  },
  {
    label: 'Paraguay',
    uid: 'PY',
    continent: 'sa',
  },
  {
    label: 'Peru',
    uid: 'PE',
    continent: 'sa',
  },
  {
    label: 'Philippines',
    uid: 'PH',
    continent: 'as',
  },
  {
    label: 'Pitcairn',
    uid: 'PN',
    continent: 'oc',
  },
  {
    label: 'Poland',
    uid: 'PL',
    continent: 'eu',
  },
  {
    label: 'Portugal',
    uid: 'PT',
    continent: 'eu',
  },
  {
    label: 'Puerto Rico',
    uid: 'PR',
    continent: 'na',
  },
  {
    label: 'Qatar',
    uid: 'QA',
    continent: 'as',
  },
  {
    label: 'Republic of Kosovo',
    uid: 'XK',
    continent: 'eu',
  },
  {
    label: 'Réunion',
    uid: 'RE',
    continent: 'af',
  },
  {
    label: 'Romania',
    uid: 'RO',
    continent: 'eu',
  },
  {
    label: 'Russian Federation',
    uid: 'RU',
    continent: 'eu',
  },
  {
    label: 'Rwanda',
    uid: 'RW',
    continent: 'af',
  },
  {
    label: 'Saint Barthélemy',
    uid: 'BL',
    continent: 'na',
  },
  {
    label: 'Saint Helena, Ascension and Tristan da Cunha',
    uid: 'SH',
    continent: 'af',
  },
  {
    label: 'Saint Kitts and Nevis',
    uid: 'KN',
    continent: 'na',
  },
  {
    label: 'Saint Lucia',
    uid: 'LC',
    continent: 'na',
  },
  {
    label: 'Saint Martin (French part)',
    uid: 'MF',
    continent: 'na',
  },
  {
    label: 'Saint Pierre and Miquelon',
    uid: 'PM',
    continent: 'na',
  },
  {
    label: 'Saint Vincent and the Grenadines',
    uid: 'VC',
    continent: 'na',
  },
  {
    label: 'Samoa',
    uid: 'WS',
    continent: 'oc',
  },
  {
    label: 'San Marino',
    uid: 'SM',
    continent: 'eu',
  },
  {
    label: 'Sao Tome and Principe',
    uid: 'ST',
    continent: 'af',
  },
  {
    label: 'Saudi Arabia',
    uid: 'sa',
    continent: 'as',
  },
  {
    label: 'Senegal',
    uid: 'SN',
    continent: 'af',
  },
  {
    label: 'Serbia',
    uid: 'RS',
    continent: 'eu',
  },
  {
    label: 'Seychelles',
    uid: 'SC',
    continent: 'af',
  },
  {
    label: 'Sierra Leone',
    uid: 'SL',
    continent: 'af',
  },
  {
    label: 'Singapore',
    uid: 'SG',
    continent: 'as',
  },
  {
    label: 'Sint Maarten (Dutch part)',
    uid: 'SX',
    continent: 'Americas',
  },
  {
    label: 'Slovakia',
    uid: 'SK',
    continent: 'eu',
  },
  {
    label: 'Slovenia',
    uid: 'SI',
    continent: 'eu',
  },
  {
    label: 'Solomon Islands',
    uid: 'SB',
    continent: 'oc',
  },
  {
    label: 'Somalia',
    uid: 'SO',
    continent: 'af',
  },
  {
    label: 'South Africa',
    uid: 'ZA',
    continent: 'af',
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    uid: 'GS',
    continent: 'na',
  },
  {
    label: 'Korea (Republic of)',
    uid: 'KR',
    continent: 'as',
  },
  {
    label: 'South Sudan',
    uid: 'SS',
    continent: 'af',
  },
  {
    label: 'Spain',
    uid: 'ES',
    continent: 'eu',
  },
  {
    label: 'Sri Lanka',
    uid: 'LK',
    continent: 'as',
  },
  {
    label: 'Sudan',
    uid: 'SD',
    continent: 'af',
  },
  {
    label: 'Surilabel',
    uid: 'SR',
    continent: 'sa',
  },
  {
    label: 'Svalbard and Jan Mayen',
    uid: 'SJ',
    continent: 'eu',
  },
  {
    label: 'Swaziland',
    uid: 'SZ',
    continent: 'af',
  },
  {
    label: 'Sweden',
    uid: 'SE',
    continent: 'eu',
  },
  {
    label: 'Switzerland',
    uid: 'CH',
    continent: 'eu',
  },
  {
    label: 'Syrian Arab Republic',
    uid: 'SY',
    continent: 'as',
  },
  {
    label: 'Taiwan',
    uid: 'TW',
    continent: 'as',
  },
  {
    label: 'Tajikistan',
    uid: 'TJ',
    continent: 'as',
  },
  {
    label: 'Tanzania, United Republic of',
    uid: 'TZ',
    continent: 'af',
  },
  {
    label: 'Thailand',
    uid: 'TH',
    continent: 'as',
  },
  {
    label: 'Timor-Leste',
    uid: 'TL',
    continent: 'as',
  },
  {
    label: 'Togo',
    uid: 'TG',
    continent: 'af',
  },
  {
    label: 'Tokelau',
    uid: 'TK',
    continent: 'oc',
  },
  {
    label: 'Tonga',
    uid: 'TO',
    continent: 'oc',
  },
  {
    label: 'Trinidad and Tobago',
    uid: 'TT',
    continent: 'sa',
  },
  {
    label: 'Tunisia',
    uid: 'TN',
    continent: 'af',
  },
  {
    label: 'Turkey',
    uid: 'TR',
    continent: 'as',
  },
  {
    label: 'Turkmenistan',
    uid: 'TM',
    continent: 'as',
  },
  {
    label: 'Turks and Caicos Islands',
    uid: 'TC',
    continent: 'na',
  },
  {
    label: 'Tuvalu',
    uid: 'TV',
    continent: 'oc',
  },
  {
    label: 'Uganda',
    uid: 'UG',
    continent: 'af',
  },
  {
    label: 'Ukraine',
    uid: 'UA',
    continent: 'eu',
  },
  {
    label: 'United Arab Emirates',
    uid: 'AE',
    continent: 'as',
  },
  {
    label: 'United Kingdom of Great Britain and Northern Ireland',
    uid: 'GB',
    continent: 'eu',
  },
  {
    label: 'United States of America',
    uid: 'US',
    continent: 'na',
  },
  {
    label: 'Uruguay',
    uid: 'UY',
    continent: 'sa',
  },
  {
    label: 'Uzbekistan',
    uid: 'UZ',
    continent: 'as',
  },
  {
    label: 'Vanuatu',
    uid: 'VU',
    continent: 'oc',
  },
  {
    label: 'Venezuela (Bolivarian Republic of)',
    uid: 'VE',
    continent: 'sa',
  },
  {
    label: 'Viet Nam',
    uid: 'VN',
    continent: 'as',
  },
  {
    label: 'Wallis and Futuna',
    uid: 'WF',
    continent: 'oc',
  },
  {
    label: 'Western Sahara',
    uid: 'EH',
    continent: 'af',
  },
  {
    label: 'Yemen',
    uid: 'YE',
    continent: 'as',
  },
  {
    label: 'Zambia',
    uid: 'ZM',
    continent: 'af',
  },
  {
    label: 'Zimbabwe',
    uid: 'ZW',
    continent: 'af',
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
