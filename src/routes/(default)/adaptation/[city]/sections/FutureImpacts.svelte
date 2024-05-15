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
  $: geoSelection = _.find(impactGeoSnapshots, (d) => d.indicator.uid === $indicator);
  $: console.log(timeSelection, geoSelection);
</script>

<PillGroup size="sm" allowWrap={false} options={indicators} bind:currentUid={$indicator} />
<img src={timeSelection.image ? `${import.meta.env.VITE_HEROKU_URL}${timeSelection.image.url}` : 'https://via.assets.so/img.jpg?w=2000&h=1200&tc=#dddddd&bg=#dddddd'} />
<div>{impactGeoDescription}</div>
<PillGroup size="sm" allowWrap={false} options={years} bind:currentUid={$year} />
<img src={geoSelection.image ? `${import.meta.env.VITE_HEROKU_URL}${geoSelection.image.url}` : 'https://via.assets.so/img.jpg?w=2000&h=1200&tc=#dddddd&bg=#dddddd'} />
<div>{impactTimeDescription}</div>
