<script>
	import { END_IMPACT_TIME, END_DISTRIBUTION } from "$lib/../config.js";
	import { IMPACT_TIME_CACHE } from "$lib/../stores/impact-time.js";
	import { handle } from "$lib/api/api.js";
	
	$: timeGeo = handle(END_IMPACT_TIME, "get", { geo: "USA" }, $IMPACT_TIME_CACHE);
	$: timeGeoScenario = handle(END_IMPACT_TIME, "get", { geo: "USA", scenarios: "Other" }, $IMPACT_TIME_CACHE);
	$: timeGeoScenarioIndicator = handle(END_IMPACT_TIME, "get", { geo: "USA", scenarios: "Other", indicator: "Something" }, $IMPACT_TIME_CACHE);
</script>

<strong>Custom</strong><br />
Impact-time Geo: { JSON.stringify(timeGeo) }<br />
Impact-time Geo Scenario: { JSON.stringify(timeGeoScenario) }<br />
Impact-time Geo Scenario Indicator: { JSON.stringify(timeGeoScenarioIndicator) }<br /><br />