<script>
	import { CURRENT_INDICATOR } from '$lib/../stores/store.js';
</script>

<svelte:head>
	<title>Explore</title>
</svelte:head>

<h1>Explore</h1>

<span>Indicator: { $CURRENT_INDICATOR }</span>

<button on:click={() => CURRENT_INDICATOR.set('Temperature')}>Temperature</button>
<button on:click={() => CURRENT_INDICATOR.set('CO2')}>CO2</button>

<style lang="scss">
	@import '../styles/global.scss';

	span {
		display: block;
	}
</style>