<script>
  import { getContext } from 'svelte';

  const { data, xGet, yGet } = getContext('LayerCake');

  export let stroke = '#ab00d6';

  $: path =
    'M' +
    $data
      .map(d => {
        return $xGet(d) + ',' + $yGet(d);
      })
      .join('L');

</script>

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2px;
  }

</style>

<path class="path-line" d="{path}" stroke="{stroke}"></path>
