<script>
  import { CURRENT_SCENARIOS_UID } from '$stores/state';
  import { PATH_IMPACT, PATH_EXPLORE } from '$config';
  import { getContext } from 'svelte';
  export let slug;
  export let scenarios;
  const { query } = getContext('scrollContent');
</script>

<fieldset id={slug} class={`flex flex-col my-4 bg-surface-weaker ${query}`}>
  {#each scenarios as scenario}
    <label class="py-1">
      <input
        type="checkbox"
        bind:group={$CURRENT_SCENARIOS_UID}
        name="scenarios"
        value={scenario.uid}
      />
      {scenario.label}
    </label>
  {/each}
  <a href={`/${PATH_EXPLORE}/${PATH_IMPACT}`}>View in Explorer</a>
</fieldset>
