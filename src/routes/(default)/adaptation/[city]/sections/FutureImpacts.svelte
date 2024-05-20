<script>
  import PillGroup from '$src/lib/controls/PillGroup/PillGroup.svelte';
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

<PillGroup class="mb-6" label="Indicator" size="sm" allowWrap={false} options={indicators} bind:currentUid={$indicator} />
<figure class="mb-12">
  <img class="mb-2" src={timeSelection.image ? timeSelection.image.url : '/img/impact-time_indicator-1.png'} alt={timeSelection.image?.alternativeText} />
  <div class="flex gap-6 justify-between align-middle">
    <figcaption class="text-sm text-text-weaker max-w-[50em]">{impactTimeDescription}</figcaption>
    <a href={explorerUrl} class="text-sm font-bold text-theme-base self-center">View in explorer →</a>
  </div>
</figure>

<PillGroup class="mb-4" label="Year" size="sm" allowWrap={false} options={years} bind:currentUid={$year} />
<figure>
  <img class="mb-2" src={geoSelection.image ? geoSelection.image.url : '/img/impact-geo_indicator-1_year-1.png'} alt={timeSelection.image?.alternativeText} />
  <figcaption class="flex gap-6 justify-between align-middle">
    <div class="text-sm text-text-weaker max-w-[50em]">{impactGeoDescription}</div>
    <a href={explorerUrl} class="text-sm font-bold text-theme-base self-center">View in explorer →</a>
  </figcaption>
</figure>
