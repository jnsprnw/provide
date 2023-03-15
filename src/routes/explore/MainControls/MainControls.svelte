<script>
  import GeographySelection from './GeographySelection/GeographySelection.svelte';
  import ScenarioSelection from './ScenarioSelection/ScenarioSelection.svelte';
  import IndicatorSelection from './IndicatorSelection/IndicatorSelection.svelte';
</script>

<div class="flex gap-4 mb-12">
  <div class="w-1/2">
    <GeographySelection />
  </div>
  <!-- <ScenarioSelection /> -->
  <div class="w-1/2">
    <IndicatorSelection />
  </div>
</div>
