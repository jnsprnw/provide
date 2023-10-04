<script>
  import { buildURL } from '$utils/url.js';
  export let selectedScenarios = [];
  import Arrow from '$lib/helper/icons/Arrow.svelte';
  $: isDisabled = !selectedScenarios.length;

  $: url = buildURL('impacts', { scenarios: selectedScenarios });
</script>

<a
  role="link"
  aria-disabled={String(isDisabled)}
  class:text-theme-weaker={isDisabled}
  class:pointer-events-none={isDisabled}
  class="bg-surface-weaker hover:bg-surface-weakest transition-color flex gap-x-3 justify-center items-center text-theme-base px-6 py-5 text-center rounded-sm inline"
  href={isDisabled ? undefined : url}
>
  {#if isDisabled}
    Select scenarios to view them in the explorer
  {:else}
    <span>View {selectedScenarios.length} selected scenario{selectedScenarios.length === 1 ? '' : 's'} in explorer</span>
    <Arrow />
  {/if}
</a>
