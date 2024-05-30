<script>
  import PillGroup from '$src/lib/controls/PillGroup/PillGroup.svelte';
  import { getStrapiImageAtSize } from '$src/lib/utils';
  import ExplorerLink from './ExplorerLink.svelte';
  import _ from 'lodash-es';
  import { writable } from 'svelte/store';
  export let explorerUrl;
  export let impactGeoDescription;
  export let impactTimeDescription;
  export let impactGeoSnapshots;
  export let impactTimeSnapshots;

  $: indicators = _.uniqBy(impactTimeSnapshots, 'indicator').map((d) => d.indicator);
  $: indicator = writable(indicators[0].uid);

  $: years = _.uniqBy(impactGeoSnapshots, 'year').map((d) => ({ uid: d.year, label: d.year }));
  $: year = writable(years[0].uid);

  $: timeSelection = _.find(impactTimeSnapshots, (d) => d.indicator.uid === $indicator);
  $: geoSelection = _.find(impactGeoSnapshots, (d) => d.indicator.uid === $indicator && d.year === $year);
</script>

<div class="max-w-3xl">
  {#if indicators.length > 1}
    <PillGroup class="mb-6" label="Indicator" size="sm" allowWrap={false} options={indicators} bind:currentUid={$indicator} />
  {/if}
  <figure class="mb-10">
    <img class="mb-2" src={getStrapiImageAtSize(timeSelection.image).url} alt={timeSelection.image?.alternativeText} />
    <figcaption class="flex gap-6 justify-between align-middle">
      <div class="text-sm text-text-weaker max-w-[40em]">{impactTimeDescription}</div>
      <ExplorerLink href={explorerUrl} />
    </figcaption>
  </figure>

  {#if years.length > 1}
    <PillGroup class="mb-4" label="Year" size="sm" allowWrap={false} options={years} bind:currentUid={$year} />
  {/if}
  <figure>
    <img class="mb-2" src={getStrapiImageAtSize(geoSelection.image).url} alt={timeSelection.image?.alternativeText} />
    <figcaption class="flex gap-6 justify-between align-middle">
      <div class="text-sm text-text-weaker max-w-[40em]">{impactGeoDescription}</div>
      <ExplorerLink href={explorerUrl} />
    </figcaption>
  </figure>
</div>
