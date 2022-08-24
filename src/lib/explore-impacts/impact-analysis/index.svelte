<script>
  import ImpactGeo from './ImpactGeo/index.svelte';
  import ImpactTime from './ImpactTime/index.svelte';
  import { ALL_PARAMETERS_SELECTED } from '$lib/../stores/store.js';
</script>

{#if $ALL_PARAMETERS_SELECTED}
  <div class="wrapper vertical-space">
    <ImpactTime />
    <ImpactGeo />
  </div>
{/if}
