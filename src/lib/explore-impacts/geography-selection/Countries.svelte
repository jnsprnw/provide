<script>
  import VirtualList from 'svelte-virtual-list';
  import Fuse from 'fuse.js';
  import {
    CURRENT_GEOGRAPHY_UID,
    CURRENT_GEOGRAPHIES,
  } from '$lib/../stores/store.js';
  import TileGroup from '$helper/tiles/TileGroup.svelte';
  import RadioTile from '$helper/tiles/RadioTile.svelte';
  import Map from './Map.svelte';
  import { sortBy } from 'lodash-es';

  const options = {
    includeScore: true,
    keys: ['label', 'uid'],
    includeMatches: true,
  };

  $: fuse = new Fuse($CURRENT_GEOGRAPHIES, options);

  let term = '';
  let hoveredGeography;

  $: defaultResults = sortBy(
    $CURRENT_GEOGRAPHIES.map((d) => ({ item: d })),
    ['item.hasContinent', 'item.continent.label', 'item.label']
  );

  // Search with default options
  $: results = (term === '' ? defaultResults : fuse.search(term)).map(
    ({ item, matches }) => {
      let label = item.label;
      // Highlighting matching substrings
      if (matches) {
        const match = matches.find((d) => d.key === 'label');
        if (match) {
          label = '';
          for (let i = 0; i < match.indices.length; i++) {
            const [start, end] = match.indices[i]; // Get start and end of this match
            if (i === 0) {
              // In the first round, we might need to add to the beginning
              if (!(start === 0 || end === 0)) {
                label += `${item.label.substring(0, start)}`;
              }
            }

            label += `<mark>${item.label.substring(start, end + 1)}</mark>`;

            if (end !== item.label.length - 1) {
              // If we are not at the end of the string
              let nextStart = item.label.length; // We set the end to the end of the string and …
              if (match.indices[i + 1]) {
                // test if we have another index coming next so that …
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
        ...item,
        label,
        matches,
      };
    }
  );
</script>

<div class="selection-country-wrapper">
  <TileGroup legend="Countries" bind:selected={$CURRENT_GEOGRAPHY_UID}>
    <input
      class="searchbox"
      type="text"
      bind:value={term}
      placeholder="Search…"
    />
    <div class="country-container">
      <VirtualList items={results} let:item>
        <!-- TODO: 200px -->
        <RadioTile
          value={item.uid}
          on:mouseover={() => (hoveredGeography = item?.uid)}
          on:mouseleave={() => (hoveredGeography = undefined)}
        >
          {#if item?.continent?.label}<span>{item.continent.label}</span>{/if}
          {#if item.emoji}<span><i class="emoji">{item.emoji}</i></span>{/if}
          <span>{@html item.label}</span>
        </RadioTile>
      </VirtualList>
    </div>
  </TileGroup>
  <Map hovered={hoveredGeography} selected={$CURRENT_GEOGRAPHY_UID} />
</div>

<style lang="scss">
  @import '../../../styles/global.scss';

  .searchbox {
    @include input-field();
  }

  .selection-country-wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;

    .country-container {
      height: 295px;
    }
  }
</style>
