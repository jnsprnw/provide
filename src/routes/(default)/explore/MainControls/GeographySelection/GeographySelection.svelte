<script>
  import Geographies from './Geographies.svelte';
  import { AVAILABLE_GEOGRAPHY_TYPES, IS_EMPTY_GEOGRAPHY, CURRENT_GEOGRAPHY_UID, CURRENT_GEOGRAPHY, CURRENT_GEOGRAPHY_TYPE } from '$stores/state.js';
  import { END_GEO_SHAPE } from '$src/config.js';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import { GEOGRAPHIES } from '$stores/meta.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import Map from './Map.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';

  let GEO_SHAPE_DATA = writable({});

  // If the currently selected geography is available, the label is displayed. Otherwise an error message.
  $: buttonLabel = $CURRENT_GEOGRAPHY?.label;

  $: geographyTypes = $AVAILABLE_GEOGRAPHY_TYPES;

  let hoveredItem;
  let currentFilterUid = $CURRENT_GEOGRAPHY_TYPE?.uid; // This stores the currently displayed geography type

  $: selectableGeographies = $GEOGRAPHIES[currentFilterUid] ?? [];

  $: currentFilterUid &&
    fetchData(GEO_SHAPE_DATA, [
      {
        endpoint: END_GEO_SHAPE,
        params: {
          'geography-type': 'admin0',
        },
      },
      {
        endpoint: END_GEO_SHAPE,
        params: {
          'geography-type': currentFilterUid,
        },
      },
    ]);
</script>

<PopoverSelect
  label="Geography"
  {buttonLabel}
  panelClass="w-screen-p max-w-4xl"
  buttonClass="border-theme-base/20 border aria-expanded:border-theme-base/60"
  placeholder={$IS_EMPTY_GEOGRAPHY ? 'Select a geography' : undefined}
>
  <Content
    filters={geographyTypes}
    filterKey="geographyType"
    filterLabel="Pick a location"
    currentUid={$CURRENT_GEOGRAPHY_UID}
    items={selectableGeographies}
    bind:currentFilterUid
  >
    <div
      slot="items"
      let:items
      let:currentFilterUid
      class="grid grid-cols-1 md:grid-cols-[1.5fr_3fr] lg:grid-cols-[1fr_3fr]"
    >
      <Geographies
        {items}
        bind:hoveredItem
        geographyType={geographyTypes.find(({ uid }) => uid === currentFilterUid)}
        bind:currentUid={$CURRENT_GEOGRAPHY_UID}
      />
      <div class="px-3 hidden md:block">
        <LoadingWrapper
          let:asyncProps={{ geoShape }}
          asyncProps={{ geoShape: $GEO_SHAPE_DATA }}
          let:isLoading
        >
          <Map
            hovered={hoveredItem}
            baseLayer={geoShape[0].data.data}
            dataLayer={geoShape[1].data.data}
            selected={$CURRENT_GEOGRAPHY_UID}
          />
        </LoadingWrapper>
      </div>
    </div>
  </Content>
</PopoverSelect>
