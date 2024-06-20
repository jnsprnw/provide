<script>
  import Select from '$lib/controls/Select/Select.svelte';
  import SegmentedControl from '$lib/controls/SegmentedControl/SegmentedControl.svelte';
  import Switch from '$lib/controls/Switch/Switch.svelte';

  export let displayOption;
  export let displayOptions;
  export let yearOptions;
  export let scenarios;
  export let year;
  export let showSatellite;
  export let showSatelliteOption;

  $: yearOptionsList = yearOptions.map((year) => ({ uid: year, label: String(year) }));
</script>

<div class="flex gap-6">
  {#if scenarios.length === 2}
    <SegmentedControl options={displayOptions} bind:value={displayOption} />
  {/if}
  <Select options={yearOptionsList} bind:value={year} label="Year" />
  {#if showSatelliteOption}
    <Switch bind:value={showSatellite} label="Show satellite" />
  {/if}
</div>
