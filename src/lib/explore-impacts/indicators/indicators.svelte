<script>
	import { CURRENT_INDICATOR } from '$lib/../stores/store.js';
	import { INDICATOR_LABELS } from '$lib/../config.js';
	import RadioButton from "./radio-button.svelte";
	import RadioButtonGroup from "./radio-button-group.svelte";

	export let indicators = [];

	$: options = indicators.map(value => {
		return {
			value,
			labelText: INDICATOR_LABELS[value]?.label || value
		}
	})
</script>

<div class="indicator-selection">
	<RadioButtonGroup bind:selected={$CURRENT_INDICATOR} legendText="Indicators">
		{#each options as { value, labelText }}
	  <RadioButton {labelText} {value} />
	  {/each}
	</RadioButtonGroup>
</div>

<style lang="scss">
	.indicator-selection {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
</style>