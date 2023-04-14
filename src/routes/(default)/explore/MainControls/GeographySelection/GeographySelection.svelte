<script>
  import Geographies from './Geographies.svelte';
  import {
    CURRENT_GEOGRAPHY_UID,
    CURRENT_GEOGRAPHY,
    AVAILABLE_GEOGOGRAPHIES,
  } from '$stores/state.js';
  import { GEOGRAPHY_TYPES } from '$stores/meta.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import Map from './Map.svelte';

  const geographyTypes = $GEOGRAPHY_TYPES.filter(
    (d) =>
      $AVAILABLE_GEOGOGRAPHIES.filter(
        (geography) => geography.geographyType === d.uid
      ).length
  );

  let hoveredItem;

  $: console.log($CURRENT_GEOGRAPHY_UID);
</script>

<PopoverSelect
  label="Indicator"
  buttonLabel={$CURRENT_GEOGRAPHY.label}
  panelClass="w-screen max-w-3xl"
>
  <Content
    filters={geographyTypes}
    filterKey="sector"
    filterLabel="Geography types"
    currentUid={$CURRENT_GEOGRAPHY_UID}
    items={$AVAILABLE_GEOGOGRAPHIES}
  >
    <div slot="items" let:items class="flex grid-flow-col">
      <Geographies
        {items}
        bind:hoveredItem
        bind:currentUid={$CURRENT_GEOGRAPHY_UID}
      />
      <div class="w-96 self-center grow">
        <Map hovered={hoveredItem} selected={$CURRENT_GEOGRAPHY_UID} />
      </div>
    </div>
  </Content>
</PopoverSelect>
