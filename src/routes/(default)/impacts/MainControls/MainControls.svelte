<script>
  import GeographySelection from './GeographySelection/GeographySelection.svelte';
  import IndicatorParameters from './IndicatorSelection/IndicatorParameters.svelte';
  import IndicatorSelection from './IndicatorSelection/IndicatorSelection.svelte';
</script>

<div class="pb-4 border-b border-contour-weakest">
  <div class="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4 md:gap-6 mb-4">
    <GeographySelection />
    <IndicatorSelection />
  </div>
  <IndicatorParameters />
</div>
