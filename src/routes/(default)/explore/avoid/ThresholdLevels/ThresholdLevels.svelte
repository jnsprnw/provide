<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY,
    TEMPLATE_PROPS,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
    IS_COMBINATION_AVAILABLE,
    DOWNLOAD_URL_PARAMS,
    GRAPH_URL_PARAMS,
  } from '$stores/state.js';
  import { END_AVOIDING_IMPACTS, KEY_MODEL, KEY_SOURCE } from '$src/config.js';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';
  import { MEAN_TEMPERATURE_UID } from '$config';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import Locations from './Locations.svelte';
  import Text from './Text.svelte';

  let THRESHOLD_LEVELS_DATA = writable([]);

  export let title;

  const certainty_level = 'likely';
  const level_of_impact = 140;
  const geography = 'lisbon';

  // https://provide-api-staging.climateanalytics.org/api/avoiding-impacts/?indicator=urbclim-T2M-dayover25&level_of_impact=140&certainty_level=likely&geography=lisbon

  $: $IS_COMBINATION_AVAILABLE &&
    fetchData(THRESHOLD_LEVELS_DATA, {
      endpoint: END_AVOIDING_IMPACTS,
      params: {
        geography, // $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        level_of_impact,
        certainty_level,
        // ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  $: console.log({ $IS_COMBINATION_AVAILABLE });
  $: console.log({ $THRESHOLD_LEVELS_DATA });
  $: console.log({ $CURRENT_INDICATOR_OPTION_VALUES });
  $: console.log({ $CURRENT_GEOGRAPHY });
  $: console.log({ $CURRENT_INDICATOR });

  $: process = ({ thresholdLevelsData }, { scenarios, urlParams }) => {
    const { yearStart, yearStep, data, description, title, [KEY_MODEL]: model, [KEY_SOURCE]: source, parameters } = thresholdLevelsData.data;

    return {
      thresholdLevels: thresholdLevelsData,
      title: 'Lorem ipsum title',
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
      {certainty_level}
    />
    <Locations data={asyncProps.thresholdLevelsData} />
  </ChartFrame>
  <LoadingPlaceholder slot="placeholder" />
</LoadingWrapper>
