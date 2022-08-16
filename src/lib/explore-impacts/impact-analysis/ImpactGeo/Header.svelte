<script>
  import Select from '$lib/helper/select/index.svelte';
  import ScenarioList from '$lib/helper/chart-description/scenarioList.svelte';
  import SegmentedControl from '$lib/helper/segmented-control/index.svelte';
  import ChartFacts from '$lib/helper/chart-description/ChartFacts.svelte';
  import { CURRENT_IMPACT_GEO_YEAR_UID } from '$lib/../stores/store';

  import {
    IMPACT_GEO_YEARS,
    IMPACT_GEO_DISPLAY_OPTIONS,
  } from '$lib/../config.js';

  import { formatList } from '$lib/utils.js';

  export let displayOption;
  export let showDifference;
  export let currentYear;
  export let currentIndicator;
  export let currentOptions;
  export let currentScenarios;
  export let currentGeography;
  export let resolution;

  // $: spatialResolution = formatList(
  //   data.map(({ data }) => `${data.resolution}°`)
  // );

  $: model = undefined; // TODO
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
          This map shows the changes in
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
        <dt>Spatial resolution:</dt>
        <dd>{resolution || '—'}</dd>
        <dt>Model:</dt>
        <dd>{model || '—'}</dd>
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

<style lang="scss">
  @import '../../../../styles/global.scss';

  .header {
    margin-bottom: var(--space-s);
    align-items: end;
  }

  .chart-info {
    grid-column: 1 / span 6;
    @include chart-info-layout();
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    grid-column: -1 / -4;
  }

  .control {
    margin-left: var(--space-m);
  }
</style>
