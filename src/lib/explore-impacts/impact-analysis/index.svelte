<script>
	import qs from 'qs';
	import { set, has, forEach } from "lodash-es";
	import { CURRENT_INDICATOR, IMPACT_TIME_DATA, CURRENT_INDICATOR_UID, CURRENT_GEOGRAPHY_UID, CURRENT_SCENARIOS_UID } from '$lib/../stores/store.js';

	let indicator = null;
	CURRENT_INDICATOR_UID.subscribe(value => {
		indicator = value;
	});

	let geography = null;
	CURRENT_GEOGRAPHY_UID.subscribe(value => {
		geography = value;
	});

	let scenarios = null;
	CURRENT_SCENARIOS_UID.subscribe(value => {
		scenarios = value;
	});

	let data = null;
	IMPACT_TIME_DATA.subscribe(value => {
		data = value;
	});

	function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
	}

	const fetchImpactTime = async (scenarios, geography, indicator) => {
		await timeout(3000);
	  let obj = {};
		scenarios.forEach(scenario => {
			set(obj, [scenario, geography, indicator], {
        "median": [
          1.619659819712243,
          1.7061330314344039,
          1.8307585100355925,
          2.012203230223465,
          2.037618561251202,
          2.209585568229226,
          2.308453546479945,
          2.522737092601511,
          2.5772948541280494,
          2.7977473026484545,
          3.023837502051285,
          3.042532935325224,
          3.3232587534535494,
          3.46846074315072,
          3.5876774368800746,
          3.6852841214743064,
          3.991280702755384
        ],
        "p10": [
          0.6963328050136922,
          0.753595938651078,
          0.8127030296378194,
          1.0074601563213286,
          0.9762255165061141,
          1.1390575887013452,
          1.2360488017448459,
          1.4166443423784463,
          1.432477300444495,
          1.6119026998711659,
          1.7990518141207557,
          1.7794410476003866,
          2.0072264623795966,
          2.114838043734469,
          2.189463750936992,
          2.247275285811243,
          2.482281533124103
        ],
        "p90": [
          3.0583177166858313,
          3.1981456877785472,
          3.437144389386084,
          3.6310517718986604,
          3.742075677101333,
          3.8848098648853355,
          4.0361300202273656,
          4.3290446659346165,
          4.454482253013366,
          4.742451161472461,
          5.018356318575376,
          5.084394405104069,
          5.5151324913614665,
          5.716986351392172,
          5.928472755371228,
          6.081519846461259,
          6.498672006585426
        ]
      })
		})

		return {
	    "yearStart": 2020,
	    "yearStep": 5,
	    "data": obj,
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "model": "MESMER"
	  }
	}

	const requestData = async (indicator, geography, scenarios) => {
		console.log({ data })
		console.group('Requesting Impact Time');
		console.info({ indicator, geography, scenarios })
		console.group('Checking for scenarios in Cache.');
		const requests = scenarios.filter(scenario => {
			const hasRequestInCache = has(data, [scenario, geography, indicator])
			if (hasRequestInCache) {
				console.info(`Scenario ${scenario} is in Cache.`);
				return false;
			} else {
				console.info(`Scenario ${scenario} is NOT in Cache.`);
				return true;
			}
		})
		console.groupEnd();
		
		if (requests.length) {
			console.log(`Building request with ${requests.length} scenarios`);
			IMPACT_TIME_DATA.update(OLD_DATA => {
		  	let obj = OLD_DATA;
		  	forEach(requests, (_scenario) => {
		  		set(obj, [_scenario, geography, indicator], { status: 'loading' });
		  	})
		  	return obj;
		  });
			const query = qs.stringify({
		    scenarios: requests,
		    geography,
		    indicator
		  }, {
		    encodeValuesOnly: true,
		  });
		  const datum = await fetchImpactTime(requests, geography, indicator, query);
		  console.log({ datum })
		  IMPACT_TIME_DATA.update(OLD_DATA => {
		  	let obj = OLD_DATA;
		  	forEach(datum.data, (_geographies, _scenario) => {
		  		forEach(_geographies, (_indicators, _geography) => {
		  			forEach(_indicators, (_data, _indicator) => {
		  				console.log(`Adding ${_scenario}, ${_geography}, ${_indicator}`, data)
		  				set(obj, [_scenario, _geography, _indicator], _data);
		  			})
		  		})
		  	})
		  	return obj;
		  });
		} else {
			console.log(`All requests are in cache.`);
		}
	  console.groupEnd();
	}

	$: requestData(indicator, geography, scenarios);
</script>

<h2>{ $CURRENT_INDICATOR?.label }</h2>
<h3>{ JSON.stringify($IMPACT_TIME_DATA) }</h3>
