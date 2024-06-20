<script>
  import { getContext } from 'svelte';
  import { line } from 'd3-shape';

  export let curve = undefined;
  export let strokeWidth;

  const { data, xGet, yGet } = getContext('LayerCake');

  $: path = line().x($xGet).y($yGet);
  $: curve && path.curve(curve);

  $: paths = $data.map(({ values, uid, color, strokeWidth: sw, opacity, isSelected, isHighlighted }) => ({
    d: path(values),
    uid,
    color,
    strokeWidth: sw || strokeWidth,
    opacity,
    isSelected,
    isHighlighted,
  }));
  $: pathsHighlighted = paths.filter(({ isHighlighted }) => isHighlighted);
  $: pathsSelected = paths.filter(({ isSelected, isHighlighted }) => isSelected && !isHighlighted);
  $: pathsNotSelected = paths.filter(({ isSelected, isHighlighted }) => !isSelected && !isHighlighted);
</script>

<g>
  {#each pathsNotSelected as { d, color, strokeWidth, opacity }}
    <path class={`path-line fill-none linejoin-round linecap-round`} {d} style:stroke={color} style:stroke-width={strokeWidth - 1} style:opacity={opacity || 1} />
  {/each}
</g>
<g>
  {#each pathsSelected as { d, strokeWidth }}
    <path class={`path-line fill-none linejoin-round linecap-round`} {d} style:stroke="#fff" style:stroke-width={strokeWidth + 2} style:opacity={1} />
  {/each}
</g>
<g>
  {#each pathsSelected as { d, color, strokeWidth }}
    <path class={`path-line fill-none linejoin-round linecap-round`} {d} style:stroke={color} style:stroke-width={strokeWidth} style:opacity={1} />
  {/each}
</g>
<g>
  {#each pathsHighlighted as { d, strokeWidth }}
    <path class={`path-line fill-none linejoin-round linecap-round`} {d} style:stroke="#fff" style:stroke-width={strokeWidth + 4} style:opacity={1} />
  {/each}
</g>
<g>
  {#each pathsHighlighted as { d, color, strokeWidth }}
    <path class={`path-line fill-none linejoin-round linecap-round`} {d} style:stroke={color} style:stroke-width={strokeWidth + 0.5} style:opacity={1} />
  {/each}
</g>
