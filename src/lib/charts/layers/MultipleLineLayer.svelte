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
  <path
    class="path-line background"
    d={path(line.values)}
    style="stroke-width: 6px"
  />
  <path
    class={`path-line`}
    class:primary={line.color}
    class:highlight={line.highlight}
    d={path(line.values)}
    style={`stroke: ${line.color}`}
  />
{/each}

<style lang="scss">
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2.5px;
    stroke: var(--color-foreground-base);
    stroke-opacity: 0.3;

    &.highlight {
      stroke-width: 3px;
      stroke-opacity: 0.6;
    }

    &.primary {
      stroke-opacity: 1;
    }

    &.background {
      stroke-width: 6px;
      stroke: var(--color-background-base);
      stroke-opacity: 0.75;
    }
  }
</style>
