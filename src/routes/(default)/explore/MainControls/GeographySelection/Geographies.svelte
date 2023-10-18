<script>
  import InteractiveListItem from '$lib/controls/InteractiveListItem.svelte';
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import Fuse from 'fuse.js';

  import { sortBy } from 'lodash-es';

  export let items;
  export let currentUid;
  export let hoveredItem;
  export let geographyType;

  const options = {
    includeScore: true,
    keys: ['label', 'uid'],
    includeMatches: true,
  };

  $: fuse = new Fuse(items, options);

  let term = '';

  $: defaultResults = sortBy(
    items.map((d) => ({ item: d })),
    ['item.label']
  );

  // Search with default options
  $: results = (term === '' ? defaultResults : fuse.search(term)).map(({ item, matches }) => {
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
            // We need to add 1 to the start-index if the currentUid match was not at the beginning
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
  });
</script>

<div class="md:border-r border-contour-weakest pb-0 flex flex-col items-stretch">
  <div class="px-5 grow flex items-stretch my-4">
    <input
      type="text"
      class="px-2 py-2 leading-8 border w-full"
      bind:value={term}
      placeholder={`Search for ${geographyType?.labelSingular.toLowerCase()}…`}
    />
  </div>
  <RadioGroup
    bind:value={currentUid}
    on:change={(e) => (currentUid = e.detail)}
    class="h-96 w-64 w-full overflow-y-scroll overflow-x-hidden"
  >
    {#key results.length}
      {#each results as { icon, uid, label, emoji }}
        <RadioGroupOption
          value={uid}
          let:checked
        >
          <InteractiveListItem
            icon={icon ?? emoji}
            {label}
            {uid}
            selected={checked}
            bind:hovered={hoveredItem}
          />
        </RadioGroupOption>
      {/each}
    {/key}
  </RadioGroup>
</div>
