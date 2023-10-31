<script>
  import { CURRENT_INDICATOR, CURRENT_GEOGRAPHY, CURRENT_INDICATOR_OPTIONS } from '$stores/state.js';
  export let data;

  $: ({ labelWithinSentence } = $CURRENT_INDICATOR);

  $: ({ average_value, max } = data);

  $: ({ reference } = $CURRENT_INDICATOR_OPTIONS);
</script>

<strong>What level of impact should be avoided?</strong>

<p>Over the {reference.label} period, in {$CURRENT_GEOGRAPHY.label} the {labelWithinSentence} was on average {average_value}, and reached a maximum of {max.value} in {max.year}.</p>
