<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY,
    TEMPLATE_PROPS,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
    IS_COMBINATION_AVAILABLE_INDICATOR,
    DOWNLOAD_URL_PARAMS,
    GRAPH_URL_PARAMS,
    IS_EMPTY_INDICATOR,
  } from '$stores/state.js';
  import { SELECTED_LIKELIHOOD_LEVEL } from '$stores/avoid.js';
  import { END_AVOIDING_IMPACTS, KEY_MODEL, KEY_SOURCE } from '$src/config.js';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { fetchData } from '$lib/api/api';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import Locations from './Locations.svelte';

  export let store;

  export let title;

  const level_of_impact = 140;
  const geography = 'lisbon';

  $: !$IS_EMPTY_INDICATOR &&
    $IS_COMBINATION_AVAILABLE_INDICATOR &&
    fetchData(store, {
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
      title: 'How does this vary across the urban environment?',
      description: 'lorem ipsum description',
    };
  };
</script>

<LoadingWrapper
  {process}
  let:asyncProps
  let:props
  asyncProps={{
    thresholdLevelsData: $store,
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
    <Locations data={asyncProps.thresholdLevelsData} />
  </ChartFrame>
  <LoadingPlaceholder slot="placeholder" />
</LoadingWrapper>
