<script>
  export let color;
  export let totalHeight;
  export let hasNoRange;
  export let y2;
  export let left = 0;

  // If the current item has no range (no height), shift it by 10px
  // If they have different years and the index is 1, shift it by 10px
  $: shiftLeft = hasNoRange ? 10 : left;
</script>

{#if totalHeight > 0}
<div
  role="presentation"
  class={`absolute flex border-l-4 ${color}`}
  style={`top: ${y2}px; height: ${totalHeight}px; left: ${shiftLeft}px;`}
/>
{/if}
