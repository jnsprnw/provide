<script>
  import { get } from "lodash-es";
  import { UN_AVOIDABLE_RISK_DATA } from "$lib/../stores/un-avoidable-risk.js";
  import { CURRENT_INDICATOR_UID } from "$lib/../stores/store.js";
</script>
<p>{ $CURRENT_INDICATOR_UID }</p>

<h2>(Un)Avoidable Risk</h2>
{ get($UN_AVOIDABLE_RISK_DATA, ["status"]) }<br />
{ JSON.stringify(get($UN_AVOIDABLE_RISK_DATA, ['data', 'data', 'CurPol', 0])) }

<style lang="scss">

</style>
