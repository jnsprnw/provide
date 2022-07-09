<script>
  import { getContext } from 'svelte';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import MiniSearch from 'minisearch';
  import { CURRENT_GEOGRAPHY } from '$lib/../stores/store.js';
  import TileGroup from "$lib/helper/tiles/TileGroup.svelte";
  import RadioTile from "$lib/helper/tiles/RadioTile.svelte";

  const { getAdmin0 } = getContext('meta');
  const countries = getAdmin0();

  let miniSearch = new MiniSearch({
    idField: 'uid',
    fields: ['region', 'label'], // fields to index for full-text search
    storeFields: ['region', 'label'] // fields to return with search results
  })

  // Index all documents
  miniSearch.addAll(countries)

  let term = '';

  // Search with default options
  $: results = term === '' ? countries: miniSearch.search(term);

  function setGeography (value) {
    CURRENT_GEOGRAPHY.set(value);
  }
</script>

<div class="selection-country-wrapper">
  <TileGroup legend="Countries" bind:selected={$CURRENT_GEOGRAPHY}>
    <input type="text" bind:value={term} placeholder="Search…" />
    <VirtualList items={results} let:item height="200px">
    {#each results as item}
      <RadioTile value={item.uid}>{#if item.emoji}{item.emoji}{/if} {item.label}</RadioTile>
    {/each}
    </VirtualList>
  </TileGroup>

  <h2>Map</h2>
</div>

<style lang="scss">
  .selection-country-wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
</style>
