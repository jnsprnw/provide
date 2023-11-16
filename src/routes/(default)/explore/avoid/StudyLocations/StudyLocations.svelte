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
  import { STUDY_LOCATIONS } from '$stores/meta.js';
  import { LEVEL_OF_IMPACT, SELECTED_LIKELIHOOD_LEVEL, SELECTED_STUDY_LOCATION } from '$stores/avoid.js';
  import { END_AVOIDING_IMPACTS, KEY_MODEL, KEY_SOURCE, UID_STUDY_LOCATION_AVERAGE } from '$src/config.js';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { fetchData } from '$lib/api/api';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import Locations from './Locations.svelte';
  import Map from './Map.svelte';

  export let store;
  export let title;

  $: !$IS_EMPTY_INDICATOR &&
    $IS_COMBINATION_AVAILABLE_INDICATOR &&
    fetchData(store, {
      endpoint: END_AVOIDING_IMPACTS,
      params: {
        geography: $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        level_of_impact: $LEVEL_OF_IMPACT,
        certainty_level: $SELECTED_LIKELIHOOD_LEVEL,
        // ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  $: process = ({ thresholdLevelsData }, { scenarios, urlParams }) => {
    const studyLocations = $STUDY_LOCATIONS.map(({ uid, label, order, isAverage }) => {
      const datum = thresholdLevelsData.data.study_locations[uid];
      const { gmt, budget, lat, lng } = datum;
      const isSelected = $SELECTED_STUDY_LOCATION === uid;
      return {
        order,
        label,
        uid,
        gmt,
        budget,
        lat,
        lng,
        isSelected,
        isAverage,
        scenarios: datum.scenarios,
      };
    });

    return {
      studyLocations,
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
    <div class="grid gap-x-2 grid-cols-[1fr_auto] items-start">
      <Map studyLocations={asyncProps.studyLocations} />
      <Locations studyLocations={asyncProps.studyLocations} />
    </div>
  </ChartFrame>
  <LoadingPlaceholder slot="placeholder" />
</LoadingWrapper>
