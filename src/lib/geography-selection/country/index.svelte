<script>
  import { getContext } from 'svelte';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import Fuse from 'fuse.js';
  import { CURRENT_GEOGRAPHY } from '$lib/../stores/store.js';
  import TileGroup from "$lib/helper/tiles/TileGroup.svelte";
  import RadioTile from "$lib/helper/tiles/RadioTile.svelte";
  import { keyBy, get } from "lodash-es";

  const { getAdmin0, getContinents } = getContext('meta');
  const continents = keyBy(getContinents(), 'uid');
  const countries = getAdmin0().map(country => {
    const continent = get(continents, [country.region, 'label'], country.region);
    return {
      ...country,
      continent
    }
  });

  const options = {
    includeScore: true,
    keys: ['label', 'uid'],
    includeMatches: true
  }

  const fuse = new Fuse(countries, options);

  let term = '';

  const defaultResults = countries.map((d) => ({ item: d }))

  // Search with default options
  $: results = (term === '' ? defaultResults: fuse.search(term)).map(({ item, matches }) => {
    let label = item.label;
    // Highlighting matching substrings
    if (matches) {
      const match = matches.find(d => d.key === 'label');
      if (match) {
        label = '';
        for (let i = 0; i < match.indices.length; i++) {
          const [start, end] = match.indices[i]; // Get start and end of this match
          if (i === 0) { // In the first round, we might need to add to the beginning
            if (!(start === 0 || end === 0)) {
              label += `${item.label.substring(0, start)}`;
            }
          }
          
          label += `<mark>${item.label.substring(start, end + 1)}</mark>`;

          if (end !== item.label.length - 1) { // If we are not at the end of the string
            let nextStart = item.label.length; // We set the end to the end of the string and …
            if (match.indices[i + 1]) { // test if we have another index coming next so that …
              [nextStart] = match.indices[i + 1]; // we use that start instead of the end of the string
            }
            // Now, we add this string unmarked to the label.
            // We need to add 1 to the start-index if the current match was not at the beginning 
            label += `${item.label.substring(end + 1, nextStart)}`;
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

  function setGeography (value) {
    CURRENT_GEOGRAPHY.set(value);
  }
</script>

<div class="selection-country-wrapper">
  <TileGroup legend="Countries" bind:selected={$CURRENT_GEOGRAPHY}>
    <input type="text" bind:value={term} placeholder="Search…" />
    <VirtualList items={results} let:country height="200px">
    {#each results as { item, label }}
      <RadioTile value={item.uid}>{#if item.continent}{ item.continent } → {/if}{#if item.emoji}<i class="emoji">{item.emoji}</i> {/if}<span>{ @html label }</span></RadioTile>
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
