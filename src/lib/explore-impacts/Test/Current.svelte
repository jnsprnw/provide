<script>
	import { IMPACT_TIME_DATA } from "$lib/../stores/impact-time.js";
	import { CURRENT_GEOGRAPHY_UID } from "$lib/../stores/store.js";
</script>

<strong>Current Impact Time</strong><br />
Impact-time CURRENT ({ $CURRENT_GEOGRAPHY_UID }): { JSON.stringify($IMPACT_TIME_DATA) }