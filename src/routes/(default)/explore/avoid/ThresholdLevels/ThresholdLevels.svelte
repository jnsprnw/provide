<script>
  import { CURRENT_INDICATOR, TEMPLATE_PROPS, IS_COMBINATION_AVAILABLE_INDICATOR, IS_EMPTY_INDICATOR } from '$stores/state.js';
  import { SELECTED_LIKELIHOOD_LEVEL } from '$stores/avoid.js';
  import { END_AVOIDING_IMPACTS, KEY_MODEL, KEY_SOURCE } from '$src/config.js';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import Text from './Text.svelte';

  let THRESHOLD_LEVELS_DATA = writable([]);

  export let title;

  const level_of_impact = 140;
  const geography = 'lisbon';

  $: !$IS_EMPTY_INDICATOR &&
    $IS_COMBINATION_AVAILABLE_INDICATOR &&
    fetchData(THRESHOLD_LEVELS_DATA, {
      endpoint: END_AVOIDING_IMPACTS,
      params: {
        geography, // $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        level_of_impact,
        certainty_level: $SELECTED_LIKELIHOOD_LEVEL,
        // ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  $: process = ({ thresholdLevelsData }, { scenarios, urlParams }) => {
    const { yearStart, yearStep, data, description, title, [KEY_MODEL]: model, [KEY_SOURCE]: source, parameters } = thresholdLevelsData.data;

    return {
      thresholdLevels: thresholdLevelsData,
      title: 'When will the impact level be exceeded?',
      description: 'lorem ipsum description',
    };
  };
</script>

<LoadingWrapper
  {process}
  let:asyncProps
  let:props
  asyncProps={{
    thresholdLevelsData: $THRESHOLD_LEVELS_DATA,
  }}
  props={{
    ...$TEMPLATE_PROPS,
  }}
>
  <ChartFrame
    title={asyncProps.title}
    tagline={title}
    description={asyncProps.description}
    chartUid={END_AVOIDING_IMPACTS}
    templateProps={props}
  >
    <Text
      data={asyncProps.thresholdLevelsData}
      {geography}
      {level_of_impact}
    />
  </ChartFrame>
  <LoadingPlaceholder slot="placeholder" />
</LoadingWrapper>
