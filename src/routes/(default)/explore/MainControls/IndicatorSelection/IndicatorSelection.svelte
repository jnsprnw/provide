<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
    CURRENT_SCENARIOS_UID,
  } from '$stores/state.js';
  import { SECTORS, INDICATORS } from '$stores/meta.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';

  $: sectors = $SECTORS.filter(
    (sector) =>
      $INDICATORS.filter((indicator) => indicator.sector === sector.uid).length
  );
  let currentFilterUid;
</script>

<PopoverSelect
  label="Indicator"
  buttonLabel={$CURRENT_INDICATOR.label}
  panelClass="w-screen max-w-3xl"
>
  <Content
    filters={sectors}
    filterKey="sector"
    filterLabel="Sectors"
    bind:currentUid={$CURRENT_INDICATOR_UID}
    bind:currentFilterUid
    items={$INDICATORS}
    itemsLabel="Indicators"
  />
</PopoverSelect>
