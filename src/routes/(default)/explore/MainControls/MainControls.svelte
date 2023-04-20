<script>
  import GeographySelection from './GeographySelection/GeographySelection.svelte';
  import IndicatorParameters from './IndicatorSelection/IndicatorParameters.svelte';
  import IndicatorSelection from './IndicatorSelection/IndicatorSelection.svelte';
</script>

<div class="mb-16 pb-4 border-b border-foreground-weakest">
  <div class="flex gap-4 mb-4">
    <div class="w-1/2">
      <IndicatorSelection />
    </div>
    <div class="w-1/2">
      <GeographySelection />
    </div>
  </div>
  <IndicatorParameters />
</div>
