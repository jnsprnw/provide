<script>
  import { getContext } from 'svelte';
  import { UNAVOIDABLE_UID } from '$src/config';
  import { extent, max } from 'd3-array';
  import { groupBy } from 'lodash-es';
  import Bar from './Bar.svelte';
  import Label from './Label.svelte';

  const { data, yScale } = getContext('LayerCake');
  $: unavoidable = $data.find((d) => d.uid === UNAVOIDABLE_UID);
  $: avoidable = $data.filter((d) => d.uid !== UNAVOIDABLE_UID);

  function getRangeByYear(scenarios) {
    // Get all values from all scenarios in one array
    const values = scenarios.map(({ values }) => values).flat();
    // Group values by year
    const valuesByYear = groupBy(values, 'year');
    // Loop over each year
    return Object.keys(valuesByYear).map((year) => {
      // Use value from objects
      const thisYearsValues = valuesByYear[year].map(({ value }) => value);
      const avoidableRange = extent(thisYearsValues);
      const unavoidableRange = [0, avoidableRange[0]];
      const hasAvoidable = avoidableRange[0] !== avoidableRange[1];
      const hasUnavoidable = avoidableRange[0] > 0;
      return { year: parseInt(year), avoidableRange, unavoidableRange, hasAvoidable, hasUnavoidable };
    });
  }

  $: scenariosRange = getRangeByYear(avoidable);

  $: lastIndex = unavoidable.values.length - 1;
  $: lastItem = unavoidable.values[lastIndex];

  $: lastYear = lastItem.year;

  $: lastYearUnavoidableValue = lastItem.value;
  $: lastYearAvoidableValue = max($data, (d) => d.values[d.values.length - 1]?.value);

  $: lastYearWithAvoidableRisk = unavoidable.values.findLast(({ value }, i) => value < max($data, (d) => d.values[i]?.value));

  $: latestAvoidable = scenariosRange.findLast(({ hasAvoidable }) => hasAvoidable);
  $: latestUnavoidable = scenariosRange.findLast(({ hasUnavoidable }) => hasUnavoidable);

  $: noScenariosAtAll = lastYearUnavoidableValue === 0 && lastYearAvoidableValue === 0;

  $: ticks = [
    {
      label: 'Unavoidable risk, even in a highest ambition scenario',
      labelFallback: 'No unavoidable risk in any year',
      min: 0,
      max: lastYearUnavoidableValue,
      bar: 'border-theme-stronger/50',
      text: 'text-theme-stronger/90',
      hasRange: lastYearUnavoidableValue > 0,
      lastAvailableYear: lastYearWithAvoidableRisk,
      baseY: 0,
      latest: latestUnavoidable
        ? {
            year: latestUnavoidable.year,
            range: latestUnavoidable.unavoidableRange,
          }
        : undefined,
    },
    {
      label: 'Avoidable risk, i.e. what we can avoid through mitigation action',
      labelFallback: 'No avoidable risk in any year',
      min: lastYearUnavoidableValue,
      max: lastYearAvoidableValue,
      bar: 'border-theme-stronger/20',
      text: 'text-theme-stronger/60',
      hasRange: lastYearUnavoidableValue !== lastYearAvoidableValue,
      baseY: 1,
      latest: latestAvoidable
        ? {
            year: latestAvoidable.year,
            range: latestAvoidable.avoidableRange,
          }
        : undefined,
    },
  ].map((tick) => {
    const min = tick.latest?.range[0] ?? tick.baseY;
    const max = tick.latest?.range[1] ?? tick.baseY;
    const y1 = $yScale(min);
    const y2 = $yScale(max);
    const height = Math.max(y1 - y2, 0);
    const hasNoRange = typeof tick.latest === 'undefined';
    return {
      ...tick,
      y1,
      y2,
      height,
      hasNoRange,
      label: hasNoRange ? tick.labelFallback : tick.label,
      min,
      max,
      latest: hasNoRange ? { range: [0, 0], year: lastYear } : tick.latest
    };
  });

  $: fullHeight = $yScale.range()[0];

  $: differentYears = ticks[0].latest?.year !== ticks[1].latest?.year && typeof ticks[0].latest?.year !== 'undefined' && typeof ticks[1].latest?.year !== 'undefined';

  $: sameYearGap = differentYears ? 0 : 1; // This gets added and subtracted from the bar size to have a small gap if the years are the same.

  $: ([unavoidableTick, avoidableTick] = ticks);

  function calculatePositions(ticks) {
    const [unavoidableTick, avoidableTick] = ticks;
    const unavoidableLeft = avoidableTick.min < 0.2 && avoidableTick.max > 0.5 ? 10 : 0;
    const unavoidableAlignment = unavoidableTick.hasNoRange && !avoidableTick.hasNoRange ? 'items-start' : 'items-end';
    const avoidableAlignment = avoidableTick.max > 0.5 ? 'items-start' : 'items-end';
    return {
      left: [unavoidableLeft, 0],
      alignment: [unavoidableAlignment, avoidableAlignment]
    }
  }

  $: positions = calculatePositions(ticks)

  let avoidableHeight;
</script>

<div class="ml-2 w-full relative">
  <!-- Unavoidable risk -->
  {#if !unavoidableTick.hasNoRange || noScenariosAtAll}
    {#if !noScenariosAtAll}
    <Bar
        color={unavoidableTick.bar}
        y2={unavoidableTick.y2 + sameYearGap}
        totalHeight={unavoidableTick.height}
        hasNoRange={unavoidableTick.hasNoRange}
    />
    {/if}
    <Label
        fullHeight={avoidableTick.max < 0.5 && !unavoidableTick.hasNoRange ? fullHeight - avoidableHeight - 20 : fullHeight}
        hasNoRange={unavoidableTick.hasNoRange && avoidableTick.max > 0.8}
        {differentYears}
        latest={noScenariosAtAll ? undefined : unavoidableTick.latest}
        label={noScenariosAtAll ? 'The risk of this event happening remains zero in all scenarios' : unavoidableTick.label}
        text={unavoidableTick.text}
        alignment={positions.alignment[0]}
        y={0}
        left={positions.left[0]}
        displayRange={false}
    />
  {/if}
  <!-- Avoidable risk -->
  {#if !avoidableTick.hasNoRange}
    <Bar
        color={avoidableTick.bar}
        y2={avoidableTick.y2}
        totalHeight={avoidableTick.height - sameYearGap}
        hasNoRange={avoidableTick.hasNoRange}
        left={differentYears ? 10 : 0}
    />
    <Label
        bind:height={avoidableHeight}
        fullHeight={avoidableTick.height}
        hasNoRange={avoidableTick.hasNoRange}
        {differentYears}
        latest={avoidableTick.latest}
        label={avoidableTick.label}
        text={avoidableTick.text}
        alignment={positions.alignment[1]}
        y={avoidableTick.y2}
        left={differentYears ? 10 : 0}
    />
  {/if}
</div>
