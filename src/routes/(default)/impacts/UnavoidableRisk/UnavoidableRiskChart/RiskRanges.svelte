<script>
  import { UNAVOIDABLE_UID } from '$src/config';
  import { getContext } from 'svelte';
  import { groupBy } from 'lodash-es';
  import { extent } from 'd3-array';

  const { data, xScale, yScale, yGet, height } = getContext('LayerCake');

  $: years = $xScale.domain();

  $: console.log({ years });

  // Sort array to have active scenarios at top
  $: scenarios = $data.filter((d) => d.uid !== UNAVOIDABLE_UID).sort((a, b) => Boolean(a.color) - Boolean(b.color));
  $: unavoidable = $data.filter((d) => d.uid === UNAVOIDABLE_UID)[0];

  function getRangeByYear(scenarios) {
    // Get all values from all scenarios in one array
    const values = scenarios.map(({ values }) => values).flat();
    // Group values by year
    const valuesByYear = groupBy(values, 'year');
    // Loop over each year
    return Object.keys(valuesByYear).map((year) => {
      // Use value from objects
      const thisYearsValues = valuesByYear[year].map(({ value }) => value);
      return [parseInt(year), ...extent(thisYearsValues)];
    });
  }

  $: scenariosRange = getRangeByYear(scenarios);

  $: bandwidth = $xScale.bandwidth();
</script>

<g>
  <!-- Unavoidable risks -->
  <g>
    {#each years as year, yearIndex}
      <rect
        x={$xScale(year)}
        y={$height - ($height - $yGet(unavoidable.values[yearIndex]))}
        height={$height - $yGet(unavoidable.values[yearIndex])}
        width={bandwidth}
        style:fill-opacity={0.5}
        class="fill-theme-stronger"
      />
    {/each}
  </g>
  <!-- Avoidable risks -->
  <g>
    {#each scenariosRange as [year, min, max]}
      {@const y1 = $yScale(min)}
      {@const y2 = $yScale(max)}
      {@const heightBar = y1 - y2}
      {#if heightBar > 0}
      <g transform={`translate(${$xScale(year)} ,${$height - ($height - y2)})`}>
        <rect
          style:fill-opacity={0.2}
          class="fill-theme-stronger"
          height={heightBar}
          width={bandwidth}
        />
        <line
          transform={`translate(0 ,${heightBar})`}
          x2={bandwidth}
          class="stroke-white stroke-2"
        />
      </g>
      {/if}
    {/each}
  </g>
</g>
