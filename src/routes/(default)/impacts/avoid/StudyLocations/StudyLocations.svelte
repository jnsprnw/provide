<script>
  import { CURRENT_INDICATOR, CURRENT_GEOGRAPHY, TEMPLATE_PROPS, CURRENT_INDICATOR_OPTION_VALUES, IS_COMBINATION_AVAILABLE_INDICATOR, IS_EMPTY_INDICATOR } from '$stores/state.js';
  import { STUDY_LOCATIONS } from '$stores/meta.js';
  import { LEVEL_OF_IMPACT, SELECTED_LIKELIHOOD_LEVEL_LABEL, SELECTED_LIKELIHOOD_LEVEL, SELECTED_STUDY_LOCATION } from '$stores/avoid.js';
  import { END_AVOIDING_IMPACTS, URL_PATH_LEVEL_OF_IMPACT, URL_PATH_GEOGRAPHY, URL_PATH_INDICATOR, URL_PATH_CERTAINTY_LEVEL } from '$config';
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
        [URL_PATH_GEOGRAPHY]: $CURRENT_GEOGRAPHY.uid,
        [URL_PATH_INDICATOR]: $CURRENT_INDICATOR.uid,
        [URL_PATH_LEVEL_OF_IMPACT]: $LEVEL_OF_IMPACT,
        [URL_PATH_CERTAINTY_LEVEL]: $SELECTED_LIKELIHOOD_LEVEL,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  $: process = ({ thresholdLevelsData }) => {
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
      description: `For the average over the urban area as well as 6 locations indicated on the map, the table provides the Global Mean Temperature (GMT) levels at which the selected level of impact (${$LEVEL_OF_IMPACT}) would be reached with the selected probability (${$SELECTED_LIKELIHOOD_LEVEL_LABEL}), as well as the years at which this would happen in the three considered emissions scenarios.`,
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
  <ChartFrame title={asyncProps.title} tagline={title} description={asyncProps.description} chartUid={END_AVOIDING_IMPACTS} templateProps={props} hasDownload={false}>
    <div class="grid gap-x-2 gap-y-6 grid-rows-[auto_auto] lg:grid-cols-[2fr_3fr] items-start">
      <Map studyLocations={asyncProps.studyLocations} />
      <Locations studyLocations={asyncProps.studyLocations} />
    </div>
  </ChartFrame>
  <LoadingPlaceholder slot="placeholder" />
</LoadingWrapper>
