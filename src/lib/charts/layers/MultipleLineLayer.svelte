<script>
  import { getContext } from 'svelte';
  import { line } from 'd3-shape';

  export let curve;
  export let strokeWidth;

  const { data, xGet, yGet } = getContext('LayerCake');

  $: path = line().x($xGet).y($yGet);
  $: curve && path.curve(curve);

  $: paths = $data.map((line) => path(line.values));
</script>

{#each $data as line, i}
  <path
    class={`path-line fill-none linejoin-round linecap-round`}
    d={paths[i]}
    style:stroke={line.color}
    style:stroke-width={line.strokeWidth || strokeWidth}
    style:opacity={line.opacity || 1}
  />
{/each}
