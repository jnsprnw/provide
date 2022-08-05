<script>
	import { createEventDispatcher } from "svelte";
	export let key;
	export let options;
	export let selected;

	const dispatch = createEventDispatcher();

	function handleChange() {
		dispatch("change", { [key]: selected });
	}
</script>

<select bind:value={selected} on:change={handleChange}>
	{#each options as { value, label }}
		<option {value}>
			{ label }
		</option>
	{/each}
</select>
