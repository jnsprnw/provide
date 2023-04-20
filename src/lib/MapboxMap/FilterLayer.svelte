<script>
  import { getContext, onDestroy } from 'svelte';
  const { map } = getContext('mapbox');

  export let layer;
  export let geo;

  $: {
    if ($map.getLayer(layer)) {
      const prevFilters = $map
        .getFilter(layer)
        ?.filter((filter) => filter[0] !== 'within');
      const nextFilter = prevFilters
        ? [...prevFilters, ['within', geo]]
        : ['within', geo];

      $map.setFilter(layer, nextFilter);
    } else {
      console.log(layer, 'layer not found');
    }
  }
</script>
