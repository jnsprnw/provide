<script>
  import UnAvoidableRisk from './UnAvoidableRisk/index.svelte';
  import { ALL_PARAMETERS_SELECTED } from '$stores/store.js';
</script>

{#if $ALL_PARAMETERS_SELECTED}
  <div class="wrapper vertical-space">
    <UnAvoidableRisk />
  </div>
{/if}
