<script>
  import PillGroup from '$src/lib/controls/PillGroup/PillGroup.svelte';
  import CompareImage from 'svelte-compare-image/CompareImage.svelte';
  import _ from 'lodash-es';
  import { writable } from 'svelte/store';
  export let explorerUrl;
  export let description;
  export let attribueLabel;
  export let groupingLabel;
  export let showGroupingUi;
  export let imagePairs;

  // Unique group/attribute values to create the UI
  $: groupingValues = _.uniqBy(imagePairs, 'group.label')
    .map((d) => d.group)
    .filter((d) => d.value || d.label);
  $: attributeValues = _.uniqBy(imagePairs, 'attribute.label')
    .map((d) => d.attribute)
    .filter((d) => d.value || d.label);

  $: currentGroup = writable(groupingValues[0].uid);
  $: currentAttribute = writable(attributeValues[0]?.uid);

  $: imagePair = imagePairs.find((d) => d.group.uid === $currentGroup && d.attribute.uid === $currentAttribute) || imagePairs[0];
</script>

<div class="flex flex-wrap gap-10">
  {#if showGroupingUi}
    <PillGroup class="mb-6" label={groupingLabel} size="sm" allowWrap={false} options={groupingValues} bind:currentUid={$currentGroup} />
  {/if}

  {#if attributeValues.length}
    <PillGroup class="mb-6" label="Indicator" size="sm" allowWrap={false} options={attributeValues} bind:currentUid={$currentAttribute} />
  {/if}
</div>

<div class="flex flex-col gap-2">
  {#if imagePair.image1 && imagePair.image2}
    <CompareImage
      imageLeftSrc={imagePair.image1.url}
      imageLeftAlt="left"
      imageRightSrc={imagePair.image2.url}
      imageRightAlt="right"
      --handle-size="2.5rem"
      --handle-background-color="rgba(0, 0, 0, 0.6)"
      --handle-border-width="0.125rem"
      --slider-color="#ffffff"
      --slider-width="0.125rem"
    >
      <svelte:fragment slot="slider-label">
        Set the visibility of one image over the other. 0 is full visibility of the second image and 100 is full visibility of the first image. Any amount in-between is a left/right cutoff at the
        percentage of the slider.
      </svelte:fragment>
    </CompareImage>
  {/if}

  {#if !showGroupingUi}
    <div class="flex gap-2">
      {#each imagePairs.slice(1) as imagePair}
        <figure style:width="{100 / (imagePairs.length - 1)}%">
          <img src={imagePair.image1.url} />
          <figcaption class="text-text-weaker text-sm">{imagePair.group.label}</figcaption>
        </figure>
      {/each}
    </div>
  {/if}
</div>
