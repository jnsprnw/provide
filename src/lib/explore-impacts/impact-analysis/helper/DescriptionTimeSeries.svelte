<script>
	import { formatObjArr } from '$lib/utils.js';

	export let indicator;
	export let geography;
	export let scenarios;

	$: scenarioList = formatObjArr(scenarios, 'label');
</script>

<p>
  This graph shows how absolute changes in {indicator.label} (expressed in {indicator.unit} (TODO)) will play out over time in {geography.label} at different global warming levels compared to the reference period 1986-2006 (TODO), based on the
  {#each scenarioList as { type, value }}
  	{#if type === 'element'}
  	<em class="text-scenario-label" style={`text-decoration-color: ${value.color}`}>{ value.label }</em>
  	{:else}
  	{ value }
  	{/if}
  {/each}
  scenario{#if scenarioList.length > 1}s{/if}.
</p>

<style lang="scss">

</style>