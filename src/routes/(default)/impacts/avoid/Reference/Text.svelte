<script>
  import { CURRENT_INDICATOR, CURRENT_GEOGRAPHY, CURRENT_INDICATOR_OPTIONS } from '$stores/state.js';
  import { formatValue } from '$lib/utils/formatting';
  export let data;

  $: ({ labelWithinSentence, unit } = $CURRENT_INDICATOR);

  $: ({ average_value, max } = data);

  $: ({ reference } = $CURRENT_INDICATOR_OPTIONS);
</script>

<div>
  <strong>What impacts are you trying to avoid?</strong>
  <p class="text-text-weaker text-sm mr-2">
    Over the {reference.label} period, in <strong>{$CURRENT_GEOGRAPHY.label}</strong> the {labelWithinSentence} was on average
    <strong class="whitespace-nowrap">{formatValue(average_value)}&#8239;{unit.label}</strong>{#if parseInt(max.year) > 0}, and reached a maximum of
      <strong class="whitespace-nowrap">{formatValue(max.value)}&#8239;{unit.label}</strong>
      in {max.year}
    {/if}.
  </p>
</div>
