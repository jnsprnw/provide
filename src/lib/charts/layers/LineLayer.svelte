<script>
  import { getContext } from 'svelte';

  const { data, xGet, yGet } = getContext('LayerCake');

  export let color = '#ab00d6';
  export let strokeWidth = 2;

  $: path =
    'M' +
    $data
      .map((d) => {
        return $xGet(d) + ',' + $yGet(d);
      })
      .join('L');
</script>

<path
  class="path-line"
  d={path}
  style="stroke-width: {strokeWidth}; stroke: {color}"
/>

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2px;
  }
</style>
