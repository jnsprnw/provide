<script>
  import { CURRENT_INDICATOR_UID } from '$lib/../stores/store.js';
  import RadioButton from '$lib/helper/radio-buttons/radio-button.svelte';
  import RadioButtonGroup from '$lib/helper/radio-buttons/radio-button-group.svelte';
  import { CURRENT_SCENARIOS } from '$lib/../stores/store.js';
  import { STATUS_SUCCESS } from '$lib/../config.js';
  import PreviewTimeSeries from '$lib/charts/PreviewTimeSeries.svelte';
  import { IMPACT_TIME_ALL_DATA } from '$lib/../stores/impact-time-all';

  export let indicators = [];

  $: indicatorData = indicators
    .map((indicator) => {
      const scenarios = $IMPACT_TIME_ALL_DATA
        .filter(({ status }) => status === STATUS_SUCCESS)
        .map((response, i) => {
          const { data } = response;
          const scenario = $CURRENT_SCENARIOS[i];

          return {
            ...scenario,
            values: data.data[indicator.uid].map((values, i) => {
              return {
                year: data.yearStart + data.yearStep * i,
                min: values[0],
                value: values[1],
                max: values[2],
              };
            }),
          };
        });

      return {
        ...indicator,
        scenarios,
      };
    })
    .filter((d) => d.scenarios.length);
</script>

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

<style lang="scss">
  .preview-chart {
    height: 25px;
    max-width: 100px;
  }
</style>
