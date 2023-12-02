<script>
  import { IS_EMPTY_GEOGRAPHY, CURRENT_GEOGRAPHY, CURRENT_INDICATOR_OPTION_VALUES, CURRENT_INDICATOR, TEMPLATE_PROPS, IS_COMBINATION_AVAILABLE_INDICATOR, IS_EMPTY_INDICATOR } from '$stores/state.js';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import { END_AVOIDING_REFERENCE } from '$src/config.js';
  import { fetchData } from '$lib/api/api';
  import Text from './Text.svelte';
  import ImpactLevel from './ImpactLevel.svelte';
  import Message from '$lib/helper/Message.svelte';

  export let store;

  $: !$IS_EMPTY_GEOGRAPHY && !$IS_EMPTY_INDICATOR &&
    $IS_COMBINATION_AVAILABLE_INDICATOR &&
    fetchData(store, {
      endpoint: END_AVOIDING_REFERENCE,
      params: {
        geography: $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  $: process = ({ data }, { scenarios, urlParams }) => {
    return {
      data: data.data,
    };
  };
</script>

<div class="flex flex-col gap-y-6 min-h-[240px]">
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
    <Message
    warningBackground={false}
    warningSizeSmall={true}
    headline="No geography selected"
    >
    <span>Select a geography from the dropdown at the top of this page.</span>
    </Message>
  {:else if $IS_EMPTY_INDICATOR}
    <Message
      warningBackground={false}
      warningSizeSmall={true}
      headline="No indicator selected"
    >
      <span>Select an indicator from the dropdown at the top of this page.</span>
    </Message>
  {:else}
    <Message
      warningBackground={false}
      warningSizeSmall={true}
      headline="Combination not available"
    >
      <span>Select an indicator from the dropdown at the top of this page.</span>
    </Message>
  {/if}
</div>
