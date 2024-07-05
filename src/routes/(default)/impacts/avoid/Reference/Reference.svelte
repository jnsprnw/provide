<script>
  import { CURRENT_INDICATOR_OPTION_VALUES, IS_EMPTY_GEOGRAPHY, CURRENT_GEOGRAPHY, CURRENT_INDICATOR, TEMPLATE_PROPS, IS_COMBINATION_AVAILABLE_INDICATOR, IS_EMPTY_INDICATOR } from '$stores/state.js';
  import { SELECTED_STUDY_LOCATION } from '$stores/avoid.js';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import { END_AVOIDING_REFERENCE, URL_PATH_GEOGRAPHY, URL_PATH_INDICATOR, URL_PATH_STUDY_LOCATION } from '$config';
  import { fetchData } from '$lib/api/api';
  import Text from './Text.svelte';
  import ImpactLevel from './ImpactLevel.svelte';
  import Message from '$lib/helper/Message.svelte';
  import { mean } from 'd3-array';
  import { round, floor, ceil } from 'lodash-es';

  export let store;

  $: !$IS_EMPTY_GEOGRAPHY &&
    !$IS_EMPTY_INDICATOR &&
    $IS_COMBINATION_AVAILABLE_INDICATOR &&
    fetchData(store, {
      endpoint: END_AVOIDING_REFERENCE,
      params: {
        [URL_PATH_GEOGRAPHY]: $CURRENT_GEOGRAPHY.uid,
        [URL_PATH_INDICATOR]: $CURRENT_INDICATOR.uid,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
        [URL_PATH_STUDY_LOCATION]: $SELECTED_STUDY_LOCATION,
      },
    });

  function getDecimalsOfNumber(n) {
    const parts = String(n).split('.');
    return parts.length === 2 ? parts[1].length : 0;
  }

  function floorNumber(v, offset, step, decimals) {
    return floor(Math.floor((v + offset) / step) * step, decimals);
  }
  function ceilNumber(v, offset, step, decimals) {
    return ceil(Math.floor((v + offset) / step) * step, decimals);
  }

  $: process = ({ data }, { scenarios, urlParams }) => {
    const countable = data.data.countable;
    const step = data.data.impact_levels.step;
    const average_value = data.data.average_value;
    const decimals = getDecimalsOfNumber(step);
    const [min, max] = data.data.impact_levels.range_of_interest;
    const [totalMin, totalMax] = data.data.impact_levels.total;
    const offset = Math.min(0, totalMin) * -1;
    const defaultValue = round(Math.round(mean([min + offset, max + offset]) / step) * step, decimals);
    return {
      data: {
        step,
        min: floorNumber(min, offset, step, decimals),
        max: ceilNumber(max, offset, step, decimals),
        totalMin: floorNumber(totalMin, offset, step, decimals),
        totalMax: ceilNumber(totalMax, offset, step, decimals),
        defaultValue,
        offset,
        average_value,
        decimals,
        countable,
      },
    };
  };
</script>

<div class="flex flex-col gap-y-6 md:min-h-[240px]">
  {#if !$IS_EMPTY_GEOGRAPHY && !$IS_EMPTY_INDICATOR && $IS_COMBINATION_AVAILABLE_INDICATOR}
    <LoadingWrapper
      {process}
      let:asyncProps={{ data }}
      let:props
      asyncProps={{
        data: $store,
      }}
      props={{
        ...$TEMPLATE_PROPS,
      }}
      warningSizeSmall={true}
      warningBackground={false}
    >
      <Text {data} />
      <ImpactLevel {data} />

      <LoadingPlaceholder slot="placeholder" />
    </LoadingWrapper>
  {:else if $IS_EMPTY_GEOGRAPHY}
    <Message warningBackground={false} warningSizeSmall={true} headline="No geography selected">
      <span>Select a geography from the dropdown at the top of this page.</span>
    </Message>
  {:else if $IS_EMPTY_INDICATOR}
    <Message warningBackground={false} warningSizeSmall={true} headline="No indicator selected">
      <span>Select an indicator from the dropdown at the top of this page.</span>
    </Message>
  {:else}
    <Message warningBackground={false} warningSizeSmall={true} headline="Combination not available">
      <span>Select an indicator from the dropdown at the top of this page.</span>
    </Message>
  {/if}
</div>
