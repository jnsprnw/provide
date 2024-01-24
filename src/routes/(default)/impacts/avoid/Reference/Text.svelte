<script>
  import { CURRENT_INDICATOR_LABEL, CURRENT_INDICATOR, CURRENT_GEOGRAPHY, CURRENT_INDICATOR_OPTIONS } from '$stores/state.js';
  import { IS_STUDY_LOCATION_WHOLE_URBAN_AREA, SELECTED_STUDY_LOCATION_LABEL } from '$stores/avoid.js';
  import { formatValue, formatUnit } from '$lib/utils/formatting';
  export let data;

  $: ({ unit } = $CURRENT_INDICATOR);
  $: ({ labelWithinSentence } = $CURRENT_INDICATOR_LABEL);
  $: ({ average_value, countable } = data);
  $: ({ reference } = $CURRENT_INDICATOR_OPTIONS);
  $: isWholeUrbanArea = $IS_STUDY_LOCATION_WHOLE_URBAN_AREA;
  $: period = reference.label;
  $: value = formatValue(average_value, unit.uid);
  $: location = `${isWholeUrbanArea ? '<strong>urban area</strong> of ' : '<strong>' + $SELECTED_STUDY_LOCATION_LABEL + '</strong> in '} <strong>${$CURRENT_GEOGRAPHY.label}</strong>`;
</script>

<div>
  <strong>What impacts are you trying to avoid?</strong>
  <p class="text-text-weaker text-sm mr-2">
    {#if countable}
      Over the {period} period, the {@html location} experienced on average <strong>{@html value}</strong> <strong>{labelWithinSentence}</strong>.
    {:else}
      Over the {period} period, the {@html location} experienced <strong>{labelWithinSentence}</strong> of <strong>{value}{@html formatUnit(unit)}</strong>.
    {/if}
  </p>
</div>
