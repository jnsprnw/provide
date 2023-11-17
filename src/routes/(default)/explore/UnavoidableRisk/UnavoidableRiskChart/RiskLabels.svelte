<script>
  import { getContext } from 'svelte';
  import { UNAVOIDABLE_UID } from '$src/config';
  import { formatValue } from '$lib/utils/formatting';
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

  $: console.log({ $data }, unavoidable.values.length, unavoidable.values);

  $: lastYearWithAvoidableRisk = unavoidable.values.findLast(({ value }, i) => value < max($data, (d) => d.values[i]?.value));

  $: console.log({ lastYearWithAvoidableRisk }, 'here', { scenariosRange });

  $: latestAvoidable = scenariosRange.findLast(({ hasAvoidable }) => hasAvoidable);
  $: latestUnavoidable = scenariosRange.findLast(({ hasUnavoidable }) => hasUnavoidable);

  $: console.log({ latestAvoidable, latestUnavoidable });

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
      label: 'Avoidable risk i.e. what we can avoid through mitigation action',
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
    // const baseY = $yScale(tick.baseY);
    const y1 = $yScale(min);
    const y2 = $yScale(max);
    const height = Math.max(y1 - y2, 0);
    const hasNoRange = typeof tick.latest === 'undefined';
    // const top = tick.baseY ? baseY : baseY - height;
    // const centerY = y1 - height / 2;
    return {
      ...tick,
      y1,
      y2,
      // baseY,
      height,
      hasNoRange,
      label: hasNoRange ? tick.labelFallback : tick.label,
      min,
      max,
      // top,
      // centerY,
    };
  });

  $: fullHeight = $yScale.range()[0];

  $: differentYears = ticks[0].latest?.year !== ticks[1].latest?.year && typeof ticks[0].latest?.year !== 'undefined' && typeof ticks[1].latest?.year !== 'undefined';

  $: console.log({ differentYears }, ticks[0].latest?.year, ticks[1].latest?.year);
  $: console.log({ fullHeight });

  $: sameYearGap = differentYears ? 0 : 1; // This gets added and subtracted from the bar size to have a small gap if the years are the same.
</script>

<div class="ml-2 w-full relative">
  <!-- Unavoidable risk -->
  <Bar
    color={ticks[0].bar}
    baseY={ticks[0].baseY}
    y2={ticks[0].y2 + sameYearGap}
    totalHeight={ticks[0].height}
    {differentYears}
    hasNoRange={ticks[0].hasNoRange}
    index={0}
  />
  <Label
    {fullHeight}
    hasNoRange={ticks[0].hasNoRange && ticks[1].max > 0.8}
    {differentYears}
    latest={ticks[0].latest}
    label={ticks[0].label}
    text={ticks[0].text}
    alignment={ticks[1].max > 0.5 ? 'items-end' : 'items-start'}
    y={0}
    left={ticks[1].min < 0.2 && ticks[1].max > 0.5 ? 10 : 0}
    onlyMaxValue={true}
  />
  <!-- Avoidable risk -->
  <Bar
    color={ticks[1].bar}
    baseY={ticks[1].baseY}
    y2={ticks[1].y2}
    totalHeight={ticks[1].height - sameYearGap}
    {differentYears}
    hasNoRange={ticks[1].hasNoRange}
    index={1}
  />
  <Label
    fullHeight={ticks[1].height}
    hasNoRange={ticks[1].hasNoRange && ticks[0].max > 0.8}
    {differentYears}
    latest={ticks[1].latest}
    label={ticks[1].label}
    text={ticks[1].text}
    alignment={ticks[1].max > 0.5 ? 'items-start' : 'items-end'}
    y={ticks[1].y2}
    left={differentYears ? 10 : 0}
  />
</div>
