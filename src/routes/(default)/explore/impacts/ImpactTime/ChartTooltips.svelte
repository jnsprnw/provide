<script>
  import ChartTooltip from '$lib/charts/tooltip/ChartTooltip.svelte';

  export let data;
  export let formatValue;
  export let formatGmt;
</script>

{#each data as d}
  <ChartTooltip data={d}>
    <div class="bg-background-base p-3 shadow-md">
      <div
        class="flex gap-2 items-end justify-between text-lg border-b border-foreground-weakest py-1"
      >
        <span class="font-bold">{formatValue(d.value)}</span><span
          class="text-foreground-weak text-md">{d.year}</span
        >
      </div>
      <div class="flex gap-2 items-center py-1 text-foreground-weak text-sm">
        <span class=" leading-tight">Global mean<br /> temperature</span><span
          >{formatGmt(d.gmt)}</span
        >
      </div>
    </div>
  </ChartTooltip>
{/each}
