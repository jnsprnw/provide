<script>
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import { STUDY_LOCATIONS } from '$stores/meta.js';
  import { SELECTED_STUDY_LOCATION } from '$stores/avoid.js';
  import Locations from './Locations.svelte';

  $: buttonLabel = $STUDY_LOCATIONS.find(({ uid }) => uid === $SELECTED_STUDY_LOCATION)?.label;
</script>

<section class="relative md:pr-6 lg:pr-10 max-w-xs">
  <PopoverSelect
    label="Location"
    {buttonLabel}
    panelClass="max-w-4xl"
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
        <Locations
          {items}
          bind:selected={$SELECTED_STUDY_LOCATION}
        />
      </div>
    </Content>
  </PopoverSelect>
</section>
