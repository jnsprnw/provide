<script>
  import { CURRENT_GEOGRAPHY, CURRENT_INDICATOR_OPTION_VALUES, CURRENT_INDICATOR, TEMPLATE_PROPS, IS_COMBINATION_AVAILABLE_INDICATOR, IS_EMPTY_INDICATOR } from '$stores/state.js';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import { END_AVOIDING_REFERENCE } from '$src/config.js';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import Text from './Text.svelte';
  import ImpactLevel from './ImpactLevel.svelte';

  const AVOIDING_REFERENCE = writable({});

  $: !$IS_EMPTY_INDICATOR &&
    $IS_COMBINATION_AVAILABLE_INDICATOR &&
    fetchData(AVOIDING_REFERENCE, {
      endpoint: END_AVOIDING_REFERENCE,
      params: {
        geography: $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  $: process = ({ avoidingReferenceData }, { scenarios, urlParams }) => {
    return {
      avoidingReferenceData: avoidingReferenceData.data,
    };
  };
</script>

<LoadingWrapper
  {process}
  let:asyncProps
  let:props
  asyncProps={{
    avoidingReferenceData: $AVOIDING_REFERENCE,
  }}
  props={{
    ...$TEMPLATE_PROPS,
  }}
  warningSizeSmall={true}
  warningBackground={false}
>
  <Text data={asyncProps.avoidingReferenceData} />
  <ImpactLevel data={asyncProps.avoidingReferenceData} />
  <LoadingPlaceholder slot="placeholder" />
</LoadingWrapper>
