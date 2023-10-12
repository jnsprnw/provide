<script>
  import { MAX_NUMBER_SELECTABLE_SCENARIOS } from '$config';
  import { buildURL } from '$utils/url.js';
  export let selectedScenarios = [];
  import Arrow from '$lib/helper/icons/Arrow.svelte';
  $: noScenarioSelected = !selectedScenarios.length;
  $: tooManyScenariosSelected = selectedScenarios.length > MAX_NUMBER_SELECTABLE_SCENARIOS;
  $: isDisabled = noScenarioSelected || tooManyScenariosSelected;

  $: url = buildURL('impacts', { scenarios: selectedScenarios.sort().slice(0, MAX_NUMBER_SELECTABLE_SCENARIOS) });
</script>

<!-- We keep this because we remove href (https://www.scottohara.me/blog/2021/05/28/disabled-links.html) -->
<a
  role="link"
  aria-disabled={String(isDisabled)}
  class:text-theme-weaker={isDisabled}
  class:pointer-events-none={isDisabled}
  class="bg-surface-weaker hover:bg-surface-weakest transition-color flex gap-x-3 justify-center items-center text-theme-base px-6 py-5 text-center rounded-sm inline"
  href={isDisabled ? undefined : url}
>
  {#if noScenarioSelected}
    Select scenarios to view them in the explorer
  {:else if tooManyScenariosSelected}
    You can only select {MAX_NUMBER_SELECTABLE_SCENARIOS} at most for comparison.
  {:else}
    <span>View {selectedScenarios.length} selected scenario{selectedScenarios.length === 1 ? '' : 's'} in explorer</span>
    <Arrow />
  {/if}
</a>
