<script>
  import tooltipTemplate from './tooltip-template.html?raw';
  import ChartTooltip from '$lib/charts/tooltip/ChartTooltip.svelte';
  import renderTemplate from '$utils/renderTemplate';

  export let data;
</script>

{#each data as d}
  <ChartTooltip data={d} content={renderTemplate(tooltipTemplate, d)} />
{/each}
