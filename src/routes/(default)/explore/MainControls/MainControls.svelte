<script>
  import GeographySelection from './GeographySelection/GeographySelection.svelte';
  import IndicatorParameters from './IndicatorSelection/IndicatorParameters.svelte';
  import IndicatorSelection from './IndicatorSelection/IndicatorSelection.svelte';
</script>

<div class="mb-16">
  <div class="flex gap-4 mb-2">
    <div class="w-1/2">
      <IndicatorSelection />
    </div>
    <div class="w-1/2">
      <GeographySelection />
    </div>
  </div>
  <IndicatorParameters />
</div>
