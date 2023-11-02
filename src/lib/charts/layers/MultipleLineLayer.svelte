<script>
  import { getContext } from 'svelte';
  import { line } from 'd3-shape';

  export let curve;
  export let strokeWidth;

  const { data, xGet, yGet } = getContext('LayerCake');

  $: path = line().x($xGet).y($yGet);
  $: curve && path.curve(curve);

  $: paths = $data.map(({ values, uid, color, strokeWidth: sw, opacity, isSelected }) => ({ d: path(values), uid, color, strokeWidth: sw || strokeWidth, opacity, isSelected }));
</script>

<g>
  {#each paths.filter(({ isSelected }) => !isSelected) as { d, color, strokeWidth, opacity }}
    <path
      class={`path-line fill-none linejoin-round linecap-round`}
      {d}
      style:stroke={color}
      style:stroke-width={strokeWidth || strokeWidth}
      style:opacity={opacity || 1}
    />
  {/each}
</g>
<g>
  {#each paths.filter(({ isSelected }) => isSelected) as { d, strokeWidth }}
    <path
      class={`path-line fill-none linejoin-round linecap-round`}
      {d}
      style:stroke="#fff"
      style:stroke-width={strokeWidth + 2}
      style:opacity={1}
    />
  {/each}
</g>
<g>
  {#each paths.filter(({ isSelected }) => isSelected) as { d, color, strokeWidth }}
    <path
      class={`path-line fill-none linejoin-round linecap-round`}
      {d}
      style:stroke={color}
      style:stroke-width={strokeWidth}
      style:opacity={1}
    />
  {/each}
</g>
