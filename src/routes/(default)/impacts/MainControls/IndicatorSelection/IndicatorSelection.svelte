<script>
  import { IS_EMPTY_GEOGRAPHY, CURRENT_INDICATOR, IS_EMPTY_INDICATOR, CURRENT_INDICATOR_UID, AVAILABLE_INDICATORS, SELECTABLE_SECTORS, IS_COMBINATION_AVAILABLE_INDICATOR } from '$stores/state.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import { derived } from 'svelte/store';

  let currentFilterUid;

  const DISABLED = derived(IS_EMPTY_GEOGRAPHY, ($isEmptyGeography) => {
    if ($isEmptyGeography) {
      return 'Select a geography first';
    }
    return undefined;
  });
</script>

<PopoverSelect
  label="Indicator"
  buttonLabel={$CURRENT_INDICATOR?.label}
  buttonClass="border-theme-base/20 border"
  panelClass="w-screen-p max-w-3xl"
  warning={!$IS_EMPTY_INDICATOR && !$IS_COMBINATION_AVAILABLE_INDICATOR ? 'Selected indicator is not available for this geography' : undefined}
  disabled={$DISABLED}
  placeholder={$IS_EMPTY_INDICATOR ? 'Select an indicator' : undefined}
>
  <Content
    filters={$SELECTABLE_SECTORS}
    filterKey="sector"
    filterLabel="Pick a sector"
    bind:currentUid={$CURRENT_INDICATOR_UID}
    disabledMessage="No indicators available in this sector for this geography"
    bind:currentFilterUid
    items={$AVAILABLE_INDICATORS}
    itemsLabel="Indicators"
    allowWrap={true}
  />
</PopoverSelect>
