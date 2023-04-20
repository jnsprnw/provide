<script>
  import Select from '$lib/controls/Select/Select.svelte';
  import SegmentedControl from '$lib/controls/SegmentedControl/SegmentedControl.svelte';

  export let displayOption;
  export let displayOptions;
  export let yearOptions;
  export let scenarios;
  export let year;
</script>

<div class="flex gap-6">
  {#if scenarios.length === 2}
    <SegmentedControl options={displayOptions} bind:value={displayOption} />
  {/if}
  <Select options={yearOptions} bind:value={year} label="Year" />
</div>
