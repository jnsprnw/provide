<script>
  import Select from '$lib/helper/select/index.svelte';
  import ScenarioList from '$lib/helper/chart-description/ScenarioList.svelte';
  import SegmentedControl from '$lib/helper/segmented-control/index.svelte';
  import ChartFacts from '$lib/helper/chart-description/ChartFacts.svelte';
  import ChartMetaList from '$lib/helper/chart-description/ChartMetaList.svelte';
  import SpatialResolutionList from '$lib/helper/chart-description/SpatialResolutionList.svelte';

  import {
    IMPACT_GEO_YEARS,
    IMPACT_GEO_DISPLAY_OPTIONS,
    KEY_MODEL,
    KEY_SOURCE,
  } from '$src/config.js';
  import { CURRENT_IMPACT_GEO_YEAR_UID } from '$stores/state.js';

  export let currentGeography;
  export let currentIndicator;
  export let currentOptions;
  export let currentScenarios;
  export let currentYear;

  export let displayOption;
  export let showDifference;
  export let data;
</script>

<div class="container">
  <div class="wrapper grid header">
    <div class="chart-info">
      <h2>
        Change in {currentIndicator.label} in {currentGeography.label} in {currentYear}
      </h2>
      {#if showDifference}
        <p>
          This map shows the differences in change of
          {currentIndicator.label} (expressed in
          {currentIndicator.unit.labelLong}) in
          {currentGeography.label} in
          {currentYear} compared to the reference period
          {currentOptions.reference.label} between
          <ScenarioList scenarios={currentScenarios} />.
        </p>
      {:else if currentScenarios.length > 1}
        <p>
          These maps show the changes in
          {currentIndicator.label} (expressed in
          {currentIndicator.unit.labelLong}) in
          {currentGeography.label} in
          {currentYear} compared to the reference period
          {currentOptions.reference.label}, according to the
          <ScenarioList scenarios={currentScenarios} /> .
        </p>
      {:else}
        <p>
          This map shows the change in
          {currentIndicator.label} (expressed in
          {currentIndicator.unit.labelLong}) in
          {currentGeography.label} in
          {currentYear}
          compared to the reference period
          {currentOptions.reference.label}, according to the
          <ScenarioList scenarios={currentScenarios} />.
        </p>
      {/if}
      <ChartFacts direction="horizontal">
        <SpatialResolutionList resolution={data[0].resolution} />
        <ChartMetaList data={data.map((d) => d[KEY_MODEL])} term="Model" />
        <ChartMetaList data={data.map((d) => d[KEY_SOURCE])} term="Source" />
      </ChartFacts>
    </div>
    <div class="controls">
      {#if currentScenarios.length === 2}
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

<style lang="postcss">
  //@import '../../../../styles/global.scss';

  .header {
    //margin-bottom: var(--space-s);
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
