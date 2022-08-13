<script>
  import { UN_AVOIDABLE_RISK_DATA } from '$lib/../stores/un-avoidable-risk.js';
  import { CURRENT_INDICATOR_UID } from '$lib/../stores/store.js';
  import RiskChart from '$lib/charts/RiskChart.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';

  function process(props) {
    return props;
  }
</script>

<p>{$CURRENT_INDICATOR_UID}</p>

<h2>(Un)Avoidable Risk</h2>

<LoadingWrapper
  let:props
  let:isLoading
  {process}
  slotProps={{ data: $UN_AVOIDABLE_RISK_DATA }}
>
  <div slot="empty">This is a custom loading thing</div>
  <RiskChart {isLoading} {...props} />
</LoadingWrapper>

<style lang="scss">
</style>
