<script>
  import { getContext } from 'svelte';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import MiniSearch from 'minisearch';
  import { CURRENT_GEOGRAPHY } from '$lib/../stores/store.js';

  const { getCities } = getContext('meta');
  const cities = getCities();

  let miniSearch = new MiniSearch({
    idField: 'label',
    fields: ['label'], // fields to index for full-text search
    storeFields: ['label'] // fields to return with search results
  })

  // Index all documents
  miniSearch.addAll(cities)

  let term = '';

  // Search with default options
  $: results = term === '' ? cities: miniSearch.search(term);

  function setGeography (value) {
    CURRENT_GEOGRAPHY.set(value);
  }
</script>

<input type="text" bind:value={term} placeholder="Search…" />
<VirtualList items={results} let:item height="200px">
  <!-- this will be rendered for each currently visible item -->
  <p on:click={() => setGeography(item.label)} class:isActive={$CURRENT_GEOGRAPHY === item.label}>{item.label}</p>
</VirtualList>

<style>
  p:hover {
    cursor: pointer;
    color: blue;
  }

  p.isActive {
    font-weight: bold;
  }
</style>