<script>
  import Geographies from './Geographies.svelte';
  import {
    CURRENT_GEOGRAPHY_UID,
    CURRENT_GEOGRAPHY,
    AVAILABLE_GEOGOGRAPHIES,
  } from '$stores/state.js';
  import { END_GEO_SHAPE } from '$src/config.js';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import { GEOGRAPHY_TYPES } from '$stores/meta.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import Map from './Map.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';

  let GEO_SHAPE_DATA = writable({});

  const geographyTypes = ($GEOGRAPHY_TYPES ?? []).filter(
    (d) =>
      ($AVAILABLE_GEOGOGRAPHIES ?? []).filter(
        (geography) => geography.geographyType === d.uid
      ).length
  );

  let hoveredItem;
  let currentFilterUid;

  $: currentFilterUid &&
    fetchData(GEO_SHAPE_DATA, {
      endpoint: END_GEO_SHAPE,
      params: {
        'geography-type': currentFilterUid,
      },
    });
</script>

<PopoverSelect
  label="Indicator"
  buttonLabel={$CURRENT_GEOGRAPHY?.label}
  panelClass="w-screen max-w-3xl"
>
  <Content
    filters={geographyTypes}
    filterKey="geographyType"
    filterLabel="Geography types"
    currentUid={$CURRENT_GEOGRAPHY_UID}
    items={$AVAILABLE_GEOGOGRAPHIES}
    bind:currentFilterUid
  >
    <div slot="items" let:items class="flex grid-flow-col">
      <Geographies
        {items}
        bind:hoveredItem
        bind:currentUid={$CURRENT_GEOGRAPHY_UID}
      />
      <div class="w-96 h-56 self-center grow">
        <LoadingWrapper
          let:asyncProps={{ geoShape }}
          asyncProps={{ geoShape: $GEO_SHAPE_DATA }}
          let:isLoading
        >
          <Map
            hovered={hoveredItem}
            data={geoShape.data.data}
            selected={$CURRENT_GEOGRAPHY_UID}
          />
        </LoadingWrapper>
      </div>
    </div>
  </Content>
</PopoverSelect>
