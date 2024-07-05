<script>
  import Bar from './Bar.svelte';
  import Label from './Label.svelte';

  export let differentYears;
  export let fullHeight;
  export let noScenariosAtAll;
  export let ticks;

  $: [unavoidableTick, avoidableTick] = ticks;

  $: sameYearGap = differentYears ? 0 : 1; // This gets added and subtracted from the bar size to have a small gap if the years are the same.

  const PARALLEL_SWITCH = 0.3;

  function calculatePositions(ticks) {
    const [unavoidableTick, avoidableTick] = ticks;
    // No avoidable risk
    if (unavoidableTick.hasNoRange) {
      return {
        left: [null, null],
        alignment: [null, 'items-start'],
      };
    }
    // Avoidable risk is higher than unavoidable
    if (avoidableTick.min >= unavoidableTick.max) {
      // Bars don’t overlap. One label at the top, one at the bottom.
      return {
        left: [0, null],
        alignment: ['items-end', 'items-start'],
      };
    }
    if (unavoidableTick.min <= avoidableTick.min && unavoidableTick.max <= avoidableTick.max) {
      if (avoidableTick.max < PARALLEL_SWITCH) {
        return {
          left: [10, 0],
          alignment: ['items-end', 'items-end'],
        };
      } else {
        return {
          left: [10, 0],
          alignment: ['items-end', 'items-start'],
        };
      }
    }
    const unavoidableLeft = avoidableTick.min < 0.2 && avoidableTick.max > 0.5 ? 10 : avoidableTick.min <= unavoidableTick.min ? 10 : 0;
    const unavoidableAlignment = unavoidableTick.hasNoRange && !avoidableTick.hasNoRange ? 'items-start' : 'items-end';
    const avoidableAlignment = avoidableTick.max > 0.5 ? 'items-start' : 'items-end';
    return {
      left: [unavoidableLeft, 0],
      alignment: [unavoidableAlignment, avoidableAlignment],
    };
  }

  $: positions = calculatePositions(ticks);

  let avoidableHeight;
</script>

{#if !unavoidableTick.hasNoRange}
  <Bar color={unavoidableTick.bar} y2={unavoidableTick.y2 + sameYearGap} totalHeight={unavoidableTick.height} hasNoRange={unavoidableTick.hasNoRange} />
  <Label
    fullHeight={avoidableTick.max < PARALLEL_SWITCH && !unavoidableTick.hasNoRange ? fullHeight - avoidableHeight - 20 : fullHeight}
    hasNoRange={unavoidableTick.hasNoRange && avoidableTick.max > 0.8}
    {differentYears}
    latest={unavoidableTick.latest}
    label={unavoidableTick.label}
    text={unavoidableTick.text}
    alignment={positions.alignment[0]}
    y={0}
    left={positions.left[0]}
    displayRange={false}
  />
{/if}
<!-- Avoidable risk -->
{#if !avoidableTick.hasNoRange}
  <Bar color={avoidableTick.bar} y2={avoidableTick.y2} totalHeight={avoidableTick.height - sameYearGap} hasNoRange={avoidableTick.hasNoRange} left={differentYears ? 10 : 0} />
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
{#if noScenariosAtAll}
  <Label
    {fullHeight}
    differentYears={false}
    hasNoRange={true}
    latest={undefined}
    label="The risk of this event happening remains zero in all scenarios"
    text="text-theme-stronger/90"
    alignment="items-end"
    y={0}
    left={0}
    displayRange={false}
  />
{/if}
