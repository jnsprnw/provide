<script>
  import popoverTemplate from './popover-template.html?raw';
  import TriggerPoints from '$lib/charts/popover/TriggerPoints.svelte';
  import renderTemplate from '$utils/renderTemplate';

  export let data;
</script>

{#each data as d}
  <TriggerPoints data={d} content={renderTemplate(popoverTemplate, d)} />
{/each}
