<script>
  import { getContext, tick } from 'svelte';
  import { UNAVOIDABLE_UID } from '$lib/../config';
  import { max } from 'd3-array';

  const { data, yScale } = getContext('LayerCake');
  $: unavoidable = $data.find((d) => d.uid === UNAVOIDABLE_UID);

  $: unavoidableValue = unavoidable.values[unavoidable.values.length - 1].value;
  $: avoidableValue = max($data, (d) => d.values[d.values.length - 1].value);

  $: ticks = [
    {
      label: 'Unavoidable risk even with the highest-ambition scenario',
      min: 0,
      max: unavoidableValue,
    },
    {
      label: 'Avoidable risk through mitigation',
      min: unavoidableValue,
      max: avoidableValue,
    },
  ].map((tick) => {
    const y1 = $yScale(tick.min);
    const y2 = $yScale(tick.max);
    const height = y1 - y2;
    const centerY = y1 - height / 2;
    return {
      ...tick,
      y1,
      y2,
      height,
      centerY,
    };
  });
</script>

<div class="root">
  {#each ticks as tick, i}
    <div class="tick" style={`top: ${tick.y2}px; height: ${tick.height}px;`}>
      <div class="tick-domain" aria-hidden="true" />
      <div class="tick-label">
        {tick.label}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .root {
    width: 100%;
  }

  .tick {
    position: absolute;
    display: flex;
    align-items: center;

    &:first-child {
      --color: var(--color-text-base);
    }

    &:last-child {
      --color: var(--color-text-weaker);
    }
  }

  .tick-domain {
    width: 3px;
    min-width: 3px;
    margin-right: var(--space-xxs);
    height: 100%;
    background: var(--color);
    border-top: 2px solid var(--color-background-base);
  }

  .tick-label {
    font-size: var(--font-size-s);
    color: var(--color);
    line-height: var(--font-line-height-tightest);
  }
</style>
