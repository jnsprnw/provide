<script>
  import {
    CURRENT_GEOGRAPHY_UID,
    CURRENT_INDICATOR_UID,
    CURRENT_SCENARIOS_UID,
    CURRENT_SCENARIOS,
  } from '$stores/store.js';
  import { INDICATORS } from '$stores/meta.js';
  import RadioButton from '$lib/helper/radio-buttons/radio-button.svelte';
  import RadioButtonGroup from '$lib/helper/radio-buttons/radio-button-group.svelte';
  import { END_IMPACT_TIME } from '$src/config.js';
  import PreviewTimeSeries from '$lib/charts/PreviewTimeSeries.svelte';
  import { dataPlease } from '$lib/api/new-api';
  import { writable } from 'svelte/store';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';

  export let indicators = [];

  let IMPACT_TIME_DATA = writable([]);
  $: dataPlease(
    IMPACT_TIME_DATA,
    $CURRENT_SCENARIOS_UID.map((scenario) => ({
      endpoint: END_IMPACT_TIME,
      params: {
        geography: $CURRENT_GEOGRAPHY_UID,
        scenario,
        indicator: $INDICATORS.map((d) => d.uid),
      },
    }))
  );

  $: process = ({ impactTimeData }, { currentScenarios }) => {
    const indicatorData = indicators.map((indicator) => {
      const scenarios = impactTimeData.map((response, i) => {
        const { data } = response;
        const scenario = currentScenarios[i];

        return {
          ...scenario,
          values:
            data.data[indicator.uid]?.map((values, i) => {
              return {
                year: data.yearStart + data.yearStep * i,
                min: values[0],
                value: values[1],
                max: values[2],
              };
            }) || [],
        };
      });

      return {
        ...indicator,
        scenarios,
      };
    });
    return { indicatorData };
  };
</script>

<LoadingWrapper
  let:asyncProps={{ indicatorData }}
  asyncProps={{ impactTimeData: $IMPACT_TIME_DATA }}
  props={{ currentScenarios: $CURRENT_SCENARIOS }}
  {process}
>
  <div class="indicator-selection">
    <RadioButtonGroup
      bind:selected={$CURRENT_INDICATOR_UID}
      legendText="Indicators"
    >
      {#each indicatorData as indicator}
        <RadioButton labelText={indicator.label} value={indicator.uid}>
          <span>{indicator.label}</span>
          <div class="preview-chart">
            <PreviewTimeSeries data={indicator.scenarios} />
          </div>
        </RadioButton>
      {/each}
    </RadioButtonGroup>
  </div>
</LoadingWrapper>

<style lang="scss">
  .preview-chart {
    height: 25px;
    max-width: 100px;
  }
</style>
