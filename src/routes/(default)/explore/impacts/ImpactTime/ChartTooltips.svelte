<script>
  import tooltipTemplate from './tooltip-template.html?raw';
  import TriggerPoints from '$lib/charts/tooltip/TriggerPoints.svelte';
  import renderTemplate from '$utils/renderTemplate';

  export let data;
</script>

{#each data as d}
  <TriggerPoints data={d} content={`<strong>Test</strong>`} />
{/each}
