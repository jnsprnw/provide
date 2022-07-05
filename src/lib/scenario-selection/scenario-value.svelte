<script>
	import { formatValues, getUID } from '$lib/utils.js';
	import { getContext } from 'svelte';
	export let key = null;
	export let scenarioHover = null;

	const { getScenarios, getIndicators } = getContext('meta');
  const scenarios = getScenarios();
  const indicators = getIndicators();

  const indicator = indicators.find(({ uid }) => uid === key);
  const label = indicator?.label || key;
  const unit = indicator?.unit || 'number';

  const values = scenarios.map(({ scenarioData }) => {
  	return scenarioData[key]['value'];
  });

  $: value = scenarioHover['scenarioData'][key]['value'];
  $: hasWarning = scenarioHover['scenarioData'][key]['hasWarning'];
</script>

<dt>{ label }</dt>
<aside>{ values }</aside>
<dd>{ formatValues(value, unit) } <i aria-hidden="true">{#if hasWarning === true }⚠️{/if}</i></dd>
