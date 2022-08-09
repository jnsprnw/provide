<script>
  import { get } from 'lodash-es';
  import ImpactGeo from './ImpactGeo.svelte';
  import ImpactTime from './ImpactTime.svelte';
  import {
    ALL_PARAMETERS_SELECTED,
    CURRENT_GEOGRAPHY,
    CURRENT_GEOGRAPHY_UID,
  } from '$lib/../stores/store.js';
</script>

<!-- <p>{$CURRENT_INDICATOR_UID}</p> -->

<!-- <h2>Impact Time</h2>
{#each $IMPACT_TIME_DATA as scenario}
  {#if get(scenario, 'status') === 'success'}
    <p>
      Status: {get(scenario, 'status')}<br />
      Data sample: {JSON.stringify(
        get(scenario, ['data', 'data', $CURRENT_INDICATOR_UID, 0])
      )}
    </p>
  {:else}
    <p>Status: {get(scenario, 'status')}</p>
  {/if}
{/each} -->

<!-- <h2>Impact Time Distribution</h2>
{get($IMPACT_TIME_DISTRIBUTION_DATA, ['status'])}
{JSON.stringify(
  get($IMPACT_TIME_DISTRIBUTION_DATA, ['data', 'data', 'distribution', 0])
)} -->

<!-- <h2>Impact Geo</h2>
{get($IMPACT_GEO_DATA, ['status'])}
{JSON.stringify(get($IMPACT_GEO_DATA, ['data', 'data', 0]))} -->

{#if $ALL_PARAMETERS_SELECTED}
  <ImpactTime />
  <ImpactGeo />
{/if}
