<script>
  import { getContext, onDestroy } from 'svelte';
  const { map } = getContext('mapbox');

  export let layer;
  export let geo;

  $: {
    const prevFilters = $map
      .getFilter(layer)
      .filter((filter) => filter[0] !== 'within');

    $map.setFilter(layer, [...prevFilters, ['within', geo]]);
  }
</script>
