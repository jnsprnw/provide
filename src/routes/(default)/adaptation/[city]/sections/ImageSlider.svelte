<script>
  import PillGroup from '$src/lib/controls/PillGroup/PillGroup.svelte';
  import CompareImage from 'svelte-compare-image/CompareImage.svelte';
  import SideScrollIndicator from '$lib/helper/SideScrollIndicator.svelte';
  import _ from 'lodash-es';
  import { writable } from 'svelte/store';
  import ExplorerLink from './ExplorerLink.svelte';
  import { getStrapiImageAtSize } from '$lib/utils';
  export let explorerUrl;
  export let attribueLabel;
  export let groupingLabel;
  export let showThumbnails;
  export let allowImageSelection;
  export let imagePairs;

  // Unique group/attribute values to create the UI
  $: groupingValues = _.uniqBy(imagePairs, 'group.label')
    .map((d) => d.group)
    .filter((d) => d.value || d.label);
  $: attributeValues = _.uniqBy(imagePairs, 'attribute.label')
    .map((d) => d.attribute)
    .filter((d) => d.value || d.label);

  $: currentGroup = writable(groupingValues[0]?.uid);
  $: currentAttribute = writable(attributeValues[0]?.uid);

  $: imagePair = allowImageSelection ? imagePairs.find((d) => d.group.uid === $currentGroup && d.attribute.uid === $currentAttribute) : imagePairs[0];
  // If no image selection is allowed, we don't want to include the large image in the thumbnails
  $: thumbnails = !allowImageSelection ? imagePairs.slice(1) : imagePairs;

  let widthContent;
  $: console.log(imagePair, thumbnails);
</script>

<div class="flex flex-wrap gap-10">
  {#if allowImageSelection && groupingValues.length}
    <PillGroup class="mb-6" label={groupingLabel} size="sm" allowWrap={false} options={groupingValues} bind:currentUid={$currentGroup} />
  {/if}

  {#if attributeValues.length}
    <PillGroup class="mb-6" label={attribueLabel} size="sm" allowWrap={false} options={attributeValues} bind:currentUid={$currentAttribute} />
  {/if}
</div>

<div class="flex flex-col max-w-3xl">
  {#if !imagePair}
    <div>No image with the selected properties was found</div>
  {/if}
  {#if imagePair.image1 && imagePair.image2}
    <figure class="mb-2 flex flex-col gap-1">
      <CompareImage
        imageLeftSrc={getStrapiImageAtSize(imagePair.image1).url}
        imageLeftAlt="left"
        imageRightSrc={getStrapiImageAtSize(imagePair.image2).url}
        imageRightAlt="right"
        --handle-size="3rem"
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
      {#if imagePair.description}
        <figcaption class="flex justify-between align-middle mb-4" class:justify-end={imagePair.description}>
          <p class="text-sm text-text-weaker max-w-[40em]">{imagePair.description}</p>
          {#if explorerUrl}
            <ExplorerLink href={explorerUrl} />
          {/if}
        </figcaption>
      {/if}
    </figure>
  {/if}

  {#if showThumbnails}
    <SideScrollIndicator widthOfContent={widthContent} distanceLeft={0} distanceRight={0}>
      <div class="grid gap-x-2.5 min-w-min" style="grid-template-columns: repeat({thumbnails.length}, 28%);" bind:clientWidth={widthContent}>
        {#each thumbnails as thumbnail}
          {#if allowImageSelection}
            <button
              class="text-left"
              on:click={() => {
                $currentGroup = thumbnail.group.uid;
                $currentAttribute = thumbnail.attribute.uid;
              }}
            >
              <figure>
                <span class:border-theme-base={thumbnail === imagePair} class="rounded-sm overflow-hidden inline-block border border-contour-weakest">
                  <img class:opacity-40={thumbnail === imagePair} src={getStrapiImageAtSize(thumbnail.image1, 'small').url} alt={thumbnail.image1.alternativeText} />
                </span>
                <figcaption class="text-sm text-theme-base leading-tight" class:font-bold={thumbnail.description}>
                  {thumbnail.group.label}
                  {#if thumbnail.attribute.uid}– {thumbnail.attribute.label}{/if}
                </figcaption>
              </figure>
            </button>
          {:else}
            <figure>
              <img src={getStrapiImageAtSize(thumbnail.image1, 'small').url} alt={thumbnail.image1.alternativeText} class:opacity-50={thumbnail === imagePair} />
              <figcaption class="text-text-weaker text-sm mt-2">
                <h4 class:font-bold={thumbnail.description} class="mb-1">
                  {thumbnail.group.label}
                  {#if thumbnail.attribute.uid}– {thumbnail.attribute.label}{/if}
                </h4>
                {#if thumbnail.description}
                  <p>{thumbnail.description}</p>
                {/if}
              </figcaption>
            </figure>
          {/if}
        {/each}
      </div>
    </SideScrollIndicator>
  {/if}
</div>
