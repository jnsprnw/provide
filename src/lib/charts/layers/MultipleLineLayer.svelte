<script>
  import { getContext } from 'svelte';

  const { data, xGet, yGet } = getContext('LayerCake');

  $: path = (values) => {
    return (
      'M' +
      values
        .map((d) => {
          return $xGet(d) + ',' + $yGet(d);
        })
        .join('L')
    );
  };
</script>

{#each $data as line}
  <g>
    <path
      class="path-line background"
      d={path(line.values)}
      style="stroke-width: 6px"
    />
    <path
      class={`path-line`}
      class:highlight={line.highlight}
      d={path(line.values)}
      style="stroke: {line.color};"
    />
  </g>
{/each}

<style lang="scss">
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2px;
    stroke: var(--color-background-weakest);

    &.highlight {
      stroke-width: 4px;
    }

    &.background {
      stroke-width: 6px;
      stroke: var(--color-background-base);
    }
  }
</style>
