<script>
  import { END_AVOIDING_REFERENCE } from '$src/config';
  import { END_AVOIDING_IMPACTS, KEY_MODEL, KEY_SOURCE, URL_PATH_GEOGRAPHY, URL_PATH_INDICATOR, URL_PATH_LEVEL_OF_IMPACT, URL_PATH_CERTAINTY_LEVEL } from '$src/config.js';
  import { fetchData } from '$src/lib/api/api';
  import LoadingPlaceholder from '$src/lib/helper/LoadingPlaceholder.svelte';
  import LoadingWrapper from '$src/lib/helper/LoadingWrapper.svelte';
  import { writable } from 'svelte/store';

  export let explorerUrl;
  export let description;
  export let indicator;
  export let studyLocation;
  export let geography;

  // $: console.log(indicator, studyLocation, geography);

  // const store = writable(null);
  // $: fetchData(store, {
  //   endpoint: END_AVOIDING_REFERENCE,
  //   params: {
  //     [URL_PATH_GEOGRAPHY]: geography.uid,
  //     [URL_PATH_INDICATOR]: indicator.uid,
  //     [URL_PATH_STUDY_LOCATION]: studyLocation.uid,
  //   },
  // });

  // $: console.log($store);
</script>

<!-- <LoadingWrapper
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
  <LoadingPlaceholder slot="placeholder" />
</LoadingWrapper> -->
