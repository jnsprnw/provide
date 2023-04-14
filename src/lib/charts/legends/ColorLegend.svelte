<script>
  export let scenarios;

  function generateLegend(scenarios) {
    const legend = []
    scenarios.forEach(({ label, color, uid }) => {
      legend.push({ label, color, uid })
    })
    legend.push({ label: 'Other scenarios', uid: 'others' })
    return legend;
  }

  $: legend = generateLegend(scenarios)
</script>

<dl class="flex gap-x-6 my-4">
  {#each legend as { label, color, uid }}
  <div class="grid grid-cols-[0.75rem_1fr] gap-x-2 items-center" id={uid}>
    <dt><i title={label} class="w-3 h-3 block rounded-sm bg-background-weakest" style:background-color={color} /></dt>
    <dd><span class="font-semibold text-sm">{label}</span></dd>
  </div>
  {/each}
</dl>
