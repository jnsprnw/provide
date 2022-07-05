<script>
	import { CURRENT_INDICATOR } from '$lib/../stores/store.js';
	import { INDICATOR_LABELS } from '$lib/../config.js';
	import RadioButton from "./radio-button.svelte";
	import RadioButtonGroup from "./radio-button-group.svelte";

	export let indicators = [];
</script>

<div class="indicator-selection">
	<RadioButtonGroup bind:selected={$CURRENT_INDICATOR} legendText="Indicators">
		{#each indicators as { value, label: labelText }}
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