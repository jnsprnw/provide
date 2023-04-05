<script>
  import Select from '$lib/controls/Select/Select.svelte';
  import SegmentedControl from '$lib/helper/segmented-control/index.svelte';
  import { IMPACT_GEO_YEARS, IMPACT_GEO_DISPLAY_OPTIONS } from '$src/config.js';

  export let displayOption;
  export let scenarios;
  export let year;
</script>

<div class="flex gap-2">
  {#if scenarios.length === 2}
    <SegmentedControl
      options={IMPACT_GEO_DISPLAY_OPTIONS}
      bind:value={displayOption}
    />
  {/if}
  <Select options={IMPACT_GEO_YEARS} bind:value={year} label="Year" />
</div>
