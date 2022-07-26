<script>
  import { getContext } from 'svelte';
  import VirtualList from 'svelte-virtual-list-ce';
  import Fuse from 'fuse.js';
  import { CURRENT_GEOGRAPHY, HOVER_GEOGRAPHY_UID } from '$lib/../stores/store.js';
  import TileGroup from "$lib/helper/tiles/TileGroup.svelte";
  import RadioTile from "$lib/helper/tiles/RadioTile.svelte";
  import Map from "./Map.svelte";
  import { keyBy, get, sortBy, findIndex } from "lodash-es";

  const { getAdmin0 } = getContext('meta');
  const countries = getAdmin0();

  const options = {
    includeScore: true,
    keys: ['label', 'uid'],
    includeMatches: true
  }

  const fuse = new Fuse(countries, options);

  let term = '';

  const defaultResults = sortBy(countries.map((d) => ({ item: d })), ['item.continent', 'item.label'])

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

  function handleOver (item) {
    $HOVER_GEOGRAPHY_UID = item?.item?.uid;
  }

  function handleOverMap ({ detail }) {
    if (detail?.item) {
      const index = findIndex(results, ({ item }) => item.uid === detail?.item);

      if (index >= 0) {
        scrollToIndex(index);
      }
    }
  }

  let scrollToIndex;
</script>

<div class="selection-country-wrapper">
  <TileGroup legend="Countries" bind:selected={$CURRENT_GEOGRAPHY}>
    <input type="text" bind:value={term} placeholder="Search…" />
    <VirtualList items={results} let:item height="200px" bind:scrollToIndex> <!-- TODO: 200px -->
      <RadioTile value={item.item} on:mouseover={() => handleOver(item)}>
        <span>{#if item.item.continent}{ item.item.continent }{/if}</span>
        <span>{#if item.item.emoji}<i class="emoji">{item.item.emoji}</i>{/if}</span>
        <span>{ @html item.label }</span>
      </RadioTile>
    </VirtualList>
  </TileGroup>
  <Map on:over={handleOverMap} />
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
