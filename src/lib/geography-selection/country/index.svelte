<script>
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { COUNTRIES } from '$lib/../config.js';
  import MiniSearch from 'minisearch';
  import { CURRENT_GEOGRAPHY } from '$lib/../stores/store.js';

  let miniSearch = new MiniSearch({
    idField: 'code',
    fields: ['region', 'name'], // fields to index for full-text search
    storeFields: ['region', 'name'] // fields to return with search results
  })

  // Index all documents
  miniSearch.addAll(COUNTRIES)

  let term = '';

  // Search with default options
  $: results = term === '' ? COUNTRIES: miniSearch.search(term);

  function setGeography (value) {
    CURRENT_GEOGRAPHY.set(value);
  }
</script>

<input type="text" bind:value={term} placeholder="Search…" />
<VirtualList items={results} let:item height="200px">
  <!-- this will be rendered for each currently visible item -->
  <p on:click={() => setGeography(item.name)} class:isActive={$CURRENT_GEOGRAPHY === item.name}>{item.region}: {item.name}</p>
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
