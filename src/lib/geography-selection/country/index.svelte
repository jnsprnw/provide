<script>
  import { getContext } from 'svelte';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import MiniSearch from 'minisearch';
  import Fuse from 'fuse.js';
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
  miniSearch.addAll(countries);

  const options = {
    includeScore: true,
    keys: ['label', 'uid'],
    includeMatches: true
  }

  const fuse = new Fuse(countries, options)

  let term = '';

  const defaultResults = countries.map((d) => ({ item: d }))

  // Search with default options
  $: results = (term === '' ? defaultResults: fuse.search(term)).map(({ item, matches }) => {
    let label = item.label;
    if (matches) {
      const match = matches.find(d => d.key === 'label');
      if (match) {
        label = '';
        if (item.label === 'Albania') {
          console.log(match.indices)
        }
        for (let i = 0; i < match.indices.length; i++) {
          const [start, end] = match.indices[i]; // Get start and end of this match
          const matchAtBeginning = start === 0 || end === 0;
          if (!matchAtBeginning) {
            label += `${item.label.substring(0, start)}`;
          }
          label += `<mark>${item.label.substring(start, end + 1)}</mark>`;
          // if (matchAtBeginning) { // If the match is not at the beginning, Fuse.js returns an 0,0-Array at the beginning. So we skip that.
          //   // Otherwise we add this part of the string as a marked string
          //   label += `<mark>${item.label.substring(start, end + 1)}</mark>`;
          // }

          if (end !== item.label.length) { // If we are not at the end of the string
            let nextStart = item.label.length; // We set the end to the end of the string and …
            if (match.indices[i + 1]) { // test if we have another index coming next so that …
              [nextStart] = match.indices[i + 1]; // we use that start instead of the end of the string
            }
            // Now, we add this string unmarked to the label.
            // We need to add 1 to the start-index if the current match was not at the beginning 
            label += `${item.label.substring(end + (matchAtBeginning ? 1 : 0), nextStart)}`;
          }
        }
      }
    }
    return {
      label,
      item,
      matches
    }
  });

  // $: console.log(results)

  function setGeography (value) {
    CURRENT_GEOGRAPHY.set(value);
  }
</script>

<div class="selection-country-wrapper">
  <TileGroup legend="Countries" bind:selected={$CURRENT_GEOGRAPHY}>
    <input type="text" bind:value={term} placeholder="Search…" />
    <VirtualList items={results} let:country height="200px">
    {#each results as { item, label }}
      <RadioTile value={item.uid}>{#if item.emoji}{item.emoji}{/if} <span title={item.label}>{@html label}</span></RadioTile>
    {/each}
    </VirtualList>
  </TileGroup>

  <h2>Map</h2>
</div>

<style lang="scss">
  mark {
    background-color: yellow;
  }
  .selection-country-wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
</style>
