<script>
	import { UNITS } from '$lib/../stores/store.js';
	export let unit;

	$: label = $UNITS[unit]?.label || unit;
</script>

{ label }