<script>
  import { scaleLinear } from 'd3-scale';
  import { easePolyOut } from 'd3-ease';

  import { getContext } from 'svelte';
  import { line } from 'd3-shape';
  import { beforeNavigate } from '$app/navigation';

  export let curve;
  export let drawBackground = true;
  export let animate = false;

  const { data, xGet, yGet } = getContext('LayerCake');

  $: path = line().x($xGet).y($yGet);
  $: curve && path.curve(curve);

  // If component gets unmounted, the ongoing transition keeps component from onmounting so we need a
  // way to prevent component from transitioning when moving away from the page...
  let animateOut = animate;

  function draw(node, { speed = 1, animate = true }) {
    const pathLength = node.getTotalLength();
    const duration = pathLength / (speed * 0.5 * (Math.random() * 0.3 + 1));
    // Mapping function so time in/out transition don't happen at the same time
    const defer = scaleLinear().domain([0, 0.6, 1]).range([0, 0, 1]);

    return {
      duration: animate ? duration : 0,
      css: (t) => {
        return `
        stroke-dasharray: ${pathLength};
        stroke-dashoffset: ${pathLength - pathLength * easePolyOut(defer(t))};
      `;
      },
    };
  }

  beforeNavigate(() => {
    animateOut = false;
  });

  $: paths = $data.map((line) => path(line.values));
</script>

{#each $data as line, i}
  {#if drawBackground}
    <path class="path-line background" d={paths[i]} style="stroke-width: 6px" />
  {/if}
  {#key paths[i]}
    {#if animate}
      <path
        in:draw
        out:draw={{ animate: animateOut }}
        class={`path-line`}
        class:primary={line.color}
        class:highlight={line.highlight}
        d={paths[i]}
        style={`stroke: ${line.color}`}
      />
    {:else}
      <path
        class={`path-line`}
        class:primary={line.color}
        class:highlight={line.highlight}
        d={paths[i]}
        style={`stroke: ${line.color}`}
      />
    {/if}
  {/key}
{/each}

<style lang="postcss">
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
