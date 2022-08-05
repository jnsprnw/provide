<script>
  import { getContext } from "svelte";

  const { data, xGet, yGet, zGet } = getContext("LayerCake");

  export let base;

  $: path = values => {
    return 'M' + values
      .map(d => {
        return $xGet(d) + ',' + $yGet(d);
      })
      .join('L');
  };
    
</script>

{#each $data as group}
  <g>
    <path
      class={`path-line ${$zGet(group)} ${group.stroke}`}
      d='{path(group.values)}'
      stroke="{base}"
      style="stroke-width: 6px"
    />
    <path
      class={`path-line ${$zGet(group)} ${group.stroke}`}
      d='{path(group.values)}'
      stroke="{$zGet(group)}"
    />
  </g>
{/each}

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2px;
  }
</style>
