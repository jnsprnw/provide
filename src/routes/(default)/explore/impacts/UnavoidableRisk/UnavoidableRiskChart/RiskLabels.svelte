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
      label: 'Unavoidable risk, even in a highest ambition scenario',
      min: 0,
      max: unavoidableValue,
      color: 'border-theme-stronger/30',
    },
    {
      label: 'Avoidable risk',
      min: unavoidableValue,
      max: avoidableValue,
      color: 'border-theme-stronger/10',
    },
  ].map((tick) => {
    const y1 = $yScale(tick.min);
    const y2 = $yScale(tick.max);
    const height = Math.max(y1 - y2 - 1, 0);
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

<div class="ml-2 w-full">
  {#each ticks as { label, y2, height, color }, index}
    <div
      class={`absolute flex items-center border-l-4 ${color}`}
      style={`top: ${y2 - (index === 0 ? -1 : 0)}px; height: ${height}px;`}
    >
      <div class="tick-label pl-3 text-sm text-contour-weak leading-tight">
        {label}
      </div>
    </div>
  {/each}
</div>
