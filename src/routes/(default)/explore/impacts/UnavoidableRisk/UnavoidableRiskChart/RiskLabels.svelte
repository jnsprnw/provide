<script>
  import { getContext } from 'svelte';
  import { UNAVOIDABLE_UID } from '$src/config';
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
      color: 'border-background-weaker',
    },
    {
      label: 'Avoidable risk through mitigation',
      min: unavoidableValue,
      max: avoidableValue,
      color: 'border-background-weakest',
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

<div class="root ml-2">
  {#each ticks as { label, y2, height, color }, index}
    <div
      class={`tick border-l-4 ${color}`}
      style={`top: ${y2 - (index === 0 ? -1 : 0)}px; height: ${height - 1}px;`}
    >
      <div class="tick-domain" aria-hidden="true" />
      <div class="tick-label ml-2">
        {label}
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
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
