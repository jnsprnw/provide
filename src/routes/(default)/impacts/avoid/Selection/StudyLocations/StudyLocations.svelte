<script>
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import { STUDY_LOCATIONS } from '$stores/meta.js';
  import { SELECTED_STUDY_LOCATION } from '$stores/avoid.js';
  import LocationsList from './LocationsList.svelte';

  $: buttonLabel = $STUDY_LOCATIONS.find(({ uid }) => uid === $SELECTED_STUDY_LOCATION)?.label;
</script>

<section>
  <PopoverSelect
    label="Location"
    {buttonLabel}
    buttonClass={`border border-contour-weakest aria-expanded:border-contour-weaker `}
    size="md"
    panelPlacement={'bottom-start'}
    class=""
  >
    <Content
      currentUid={$SELECTED_STUDY_LOCATION}
      items={$STUDY_LOCATIONS}
    >
      <div
        slot="items"
        class="grid grid-cols-1"
        let:items
      >
        <LocationsList
          {items}
          bind:selected={$SELECTED_STUDY_LOCATION}
        />
      </div>
    </Content>
  </PopoverSelect>
</section>
