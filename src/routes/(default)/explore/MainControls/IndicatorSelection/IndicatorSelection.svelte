<script>
  import { CURRENT_INDICATOR, CURRENT_INDICATOR_UID, CURRENT_SCENARIOS_UID, AVAILABLE_INDICATORS, SELECTABLE_SECTORS, CURRENT_INDICATOR_CHECK } from '$stores/state.js';
  import { SECTORS, INDICATORS } from '$stores/meta.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';

  let currentFilterUid;

  $: buttonLabel = $CURRENT_INDICATOR_CHECK ? $CURRENT_INDICATOR?.label : 'Selected indicator is not available for this geography';

  CURRENT_INDICATOR_CHECK.subscribe((value) => {
    console.log('SELECTABLE_SECTORS', { value });
    if (!value) {
      console.log(`Current indicator ${$CURRENT_INDICATOR_UID} is not available for this geography`);
      currentFilterUid = $SELECTABLE_SECTORS.find(({ disabled }) => !disabled)?.uid;
      console.log(`Sector set to ${currentFilterUid}`);
    }
    // if (typeof $CURRENT_INDICATOR_UID === 'undefined') {
    //   currentFilterUid = $SELECTABLE_SECTORS.find(({ disabled }) => !disabled)?.uid;
    //   console.log('setting to', currentFilterUid);
    // }
  });

  // $: sectors = $SECTORS.map(({ uid, label }) => {
  //   const indicators = $AVAILABLE_INDICATORS.filter(({ sector: sectorUID }) => sectorUID === uid);
  //   return {
  //     label: indicators.length ? `${label} (${indicators.length})` : label,
  //     uid,
  //     indicators,
  //     amount: indicators.length,
  //     disabled: !indicators.length,
  //   };
  // });
  // AVAILABLE_INDICATORS.subscribe(value => {
  //   (sectors ?? []).find(({ disabled }) => !disabled)?.uid
  // })

  $: console.log({ $AVAILABLE_INDICATORS });
  $: console.log({ currentFilterUid });

  $: selectableIndicators = $AVAILABLE_INDICATORS.filter(({ sector: sectorUID }) => sectorUID === currentFilterUid);

  $: console.log({ selectableIndicators });
</script>

<PopoverSelect
  label="Indicator"
  {buttonLabel}
  buttonClass="border-theme-base/20 border aria-expanded:border-theme-base/60"
  panelClass="w-screen-p max-w-3xl"
  hasWarning={!$CURRENT_INDICATOR_CHECK}
>
  <Content
    filters={$SELECTABLE_SECTORS}
    filterKey="sector"
    filterLabel="Pick a sector"
    bind:currentUid={$CURRENT_INDICATOR_UID}
    disabledMessage="Indicator not available for this geography"
    bind:currentFilterUid
    items={$AVAILABLE_INDICATORS}
    itemsLabel="Indicators"
  />
</PopoverSelect>
