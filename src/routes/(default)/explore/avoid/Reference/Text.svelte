<script>
  import { CURRENT_INDICATOR, CURRENT_GEOGRAPHY, CURRENT_INDICATOR_OPTIONS } from '$stores/state.js';
  import { formatValue } from '$lib/utils/formatting';
  export let data;

  $: ({ labelWithinSentence, unit } = $CURRENT_INDICATOR);

  $: ({ average_value, max } = data);

  $: ({ reference } = $CURRENT_INDICATOR_OPTIONS);
</script>

<strong>What level of impact should be avoided?</strong>

<p class="text-text-weaker text-sm mr-2">
  Over the {reference.label} period, in {$CURRENT_GEOGRAPHY.label} the {labelWithinSentence} was on average <strong>{formatValue(average_value, unit.uid)}</strong>, and reached a maximum of
  <strong>{formatValue(max.value, unit.uid)}</strong>
  in {max.year}.
</p>
