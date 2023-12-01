<script>
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import { LIKELIHOODS } from '$stores/meta.js';
  import { SELECTED_LIKELIHOOD_LEVEL } from '$stores/avoid.js';
  import CertaintyLevelsList from './CertaintyLevelsList.svelte';

  $: buttonLabel = $LIKELIHOODS.find(({ uid }) => uid === $SELECTED_LIKELIHOOD_LEVEL)?.label;
</script>

<section>
  <PopoverSelect
    label="Probability"
    {buttonLabel}
    buttonClass={`border border-contour-weakest aria-expanded:border-contour-weaker `}
    size="md"
    panelPlacement={'bottom-start'}
    class=""
  >
    <Content
      currentUid={$SELECTED_LIKELIHOOD_LEVEL}
      items={$LIKELIHOODS}
    >
      <div
        slot="items"
        class="grid grid-cols-1"
        let:items
      >
        <CertaintyLevelsList
          {items}
          bind:selected={$SELECTED_LIKELIHOOD_LEVEL}
        />
      </div>
    </Content>
  </PopoverSelect>
</section>
