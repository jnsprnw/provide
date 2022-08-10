<script>
	import { CURRENT_INDICATOR, CURRENT_GEOGRAPHY, CURRENT_SCENARIOS } from '$lib/../stores/store.js';

	const formatter = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' });

	$: listScenarios = formatter.formatToParts($CURRENT_SCENARIOS.map(d => d.label))
</script>

<div role="dialog" class="selection-message">
	{#if !Boolean($CURRENT_GEOGRAPHY)}
	Please select a geography, at least one scenario and an indicator.
	{:else if !Boolean($CURRENT_SCENARIOS.length)}
	Please select at least one scenario and an indicator.
	{:else if !Boolean($CURRENT_INDICATOR)}
	Please select an indicator.
	{:else}
	You are currently exploring <strong>{ $CURRENT_INDICATOR?.label }</strong> in <strong>{ $CURRENT_GEOGRAPHY?.label }</strong> ({$CURRENT_GEOGRAPHY?.continent?.label}) for {#each listScenarios as { type, value }}{#if type === 'element'}<strong>{value}</strong>{:else}{value}{/if}{/each}.
	{/if}
</div>

<style lang="scss">
	.selection-message {
		background-color: var(--color-light-blue100); // TODO
		padding: 1rem; // TODO
		margin: 1rem 0;
	}
</style>