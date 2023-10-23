<script>
  import { CURRENT_INDICATOR, IS_EMPTY_INDICATOR, CURRENT_INDICATOR_UID, AVAILABLE_INDICATORS, SELECTABLE_SECTORS, IS_COMBINATION_AVAILABLE_INDICATOR } from '$stores/state.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';

  let currentFilterUid;
  // let buttonLabel;
  // let hasWarning = false;

  // $: {
  //   console.log('HERE', $IS_EMPTY_INDICATOR, $IS_COMBINATION_AVAILABLE_INDICATOR, $CURRENT_INDICATOR_UID);
  //   if ($IS_EMPTY_INDICATOR) {
  //     buttonLabel = 'Select an indicator';
  //     hasWarning = false;
  //   } else if (!$IS_COMBINATION_AVAILABLE_INDICATOR) {
  //     buttonLabel = 'Selected indicator is not available for this geography';
  //     hasWarning = true;
  //   } else {
  //     buttonLabel = $CURRENT_INDICATOR?.label;
  //     hasWarning = false;
  //   }
  // }

  // IS_COMBINATION_AVAILABLE_INDICATOR.subscribe((value) => {
  //   console.log('SELECTABLE_SECTORS', { value });
  //   if (!value) {
  //     console.log(`Current indicator ${$CURRENT_INDICATOR_UID} is not available for this geography`);
  //     currentFilterUid = $SELECTABLE_SECTORS.find(({ disabled }) => !disabled)?.uid;
  //     console.log(`Sector set to ${currentFilterUid}`);
  //   }
  // });

  // $: console.log({ $AVAILABLE_INDICATORS });
  // $: console.log({ currentFilterUid });

  // $: selectableIndicators = $AVAILABLE_INDICATORS.filter(({ sector: sectorUID }) => sectorUID === currentFilterUid);

  // $: console.log({ selectableIndicators });
  //
  $: console.log({ $SELECTABLE_SECTORS });
</script>

<PopoverSelect
  label="Indicator"
  class=""
  buttonLabel={$CURRENT_INDICATOR?.label}
  buttonClass="border-theme-base/20 border"
  panelClass="w-screen-p max-w-3xl"
  warning={!$IS_COMBINATION_AVAILABLE_INDICATOR ? 'Selected indicator is not available for this geography' : undefined}
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
  />
</PopoverSelect>
