<script>
  import { CURRENT_INDICATOR } from '$lib/../stores/store.js';
  import RadioButton from './radio-button.svelte';
  import RadioButtonGroup from './radio-button-group.svelte';

  export let indicators = [];
</script>

<div class="indicator-selection">
  <RadioButtonGroup bind:selected={$CURRENT_INDICATOR} legendText="Indicators">
    {#each indicators as indicator}
      <RadioButton labelText={indicator.label} value={indicator} />
    {/each}
  </RadioButtonGroup>
</div>

<style lang="scss">
  .indicator-selection {
    // display: grid;
    // gap: 2rem; // TODO
    // margin-top: 2rem;
    // margin-bottom: 2rem;
  }
</style>
