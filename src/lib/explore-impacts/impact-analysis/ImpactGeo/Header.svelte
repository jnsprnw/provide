<script>
  import Select from '$lib/helper/select/index.svelte';
  import ScenarioList from '$lib/helper/chart-description/ScenarioList.svelte';
  import SegmentedControl from '$lib/helper/segmented-control/index.svelte';
  import ChartFacts from '$lib/helper/chart-description/ChartFacts.svelte';
  import ModelList from '$lib/helper/chart-description/ModelList.svelte';
  import SpatialResolutionList from '$lib/helper/chart-description/SpatialResolutionList.svelte';
  import {
    CURRENT_IMPACT_GEO_YEAR_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_OPTIONS,
    CURRENT_SCENARIOS,
  } from '$lib/../stores/store';

  import {
    IMPACT_GEO_YEARS,
    IMPACT_GEO_DISPLAY_OPTIONS,
  } from '$lib/../config.js';

  export let displayOption;
  export let showDifference;
  export let data;
</script>

<div class="container">
  <div class="wrapper grid header">
    <div class="chart-info">
      <h2>
        Change in {$CURRENT_INDICATOR.label} in {$CURRENT_GEOGRAPHY.label} in {$CURRENT_IMPACT_GEO_YEAR_UID}
      </h2>
      {#if showDifference}
        <p>
          This map shows the differences in change of
          {$CURRENT_INDICATOR.label} (expressed in
          {$CURRENT_INDICATOR.unit.labelLong}) in
          {$CURRENT_GEOGRAPHY.label} in
          {$CURRENT_IMPACT_GEO_YEAR_UID} compared to the reference period
          {$CURRENT_INDICATOR_OPTIONS.reference.label} between
          <ScenarioList scenarios={$CURRENT_SCENARIOS} />.
        </p>
      {:else if $CURRENT_SCENARIOS.length > 1}
        <p>
          These maps show the changes in
          {$CURRENT_INDICATOR.label} (expressed in
          {$CURRENT_INDICATOR.unit.labelLong}) in
          {$CURRENT_GEOGRAPHY.label} in
          {$CURRENT_IMPACT_GEO_YEAR_UID} compared to the reference period
          {$CURRENT_INDICATOR_OPTIONS.reference.label}, according to the
          <ScenarioList scenarios={$CURRENT_SCENARIOS} /> .
        </p>
      {:else}
        <p>
          This map shows the changes in
          {$CURRENT_INDICATOR.label} (expressed in
          {$CURRENT_INDICATOR.unit.labelLong}) in
          {$CURRENT_GEOGRAPHY.label} in
          {$CURRENT_IMPACT_GEO_YEAR_UID}
          compared to the reference period
          {$CURRENT_INDICATOR_OPTIONS.reference.label}, according to the
          <ScenarioList scenarios={$CURRENT_SCENARIOS} />.
        </p>
      {/if}
      <ChartFacts direction="horizontal">
        <SpatialResolutionList data={data.map((d) => d.resolution)} />
        <ModelList data={data.map((d) => d.model)} />
      </ChartFacts>
    </div>
    <div class="controls">
      {#if $CURRENT_SCENARIOS.length === 2}
        <div class="control">
          <SegmentedControl
            options={IMPACT_GEO_DISPLAY_OPTIONS}
            bind:value={displayOption}
          />
        </div>
      {/if}
      <div class="control">
        <Select
          options={IMPACT_GEO_YEARS}
          bind:value={$CURRENT_IMPACT_GEO_YEAR_UID}
          label="Year"
        />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import '../../../../styles/global.scss';

  .header {
    // margin-bottom: var(--space-s);
    align-items: end;
  }

  .chart-info {
    grid-column: 1 / span 6;
    @include chart-info-layout();
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    grid-column: -1 / -5;
  }

  .control {
    margin-left: var(--space-m);
  }
</style>
