<script>
  import { RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import InteractiveListItem from '$lib/controls/InteractiveListItem.svelte';
  export let group;
  export let hoveredItem;
</script>

{#each group as { icon, uid, label, emoji }}
  <RadioGroupOption value={uid} let:checked class="focus:bg-surface-weaker focus:outline-none">
    <InteractiveListItem icon={icon ?? emoji} {label} {uid} selected={checked} bind:hovered={hoveredItem} />
  </RadioGroupOption>
{/each}
