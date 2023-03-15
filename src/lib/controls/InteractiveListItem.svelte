<script>
  export let label;
  export let uid;
  export let icon;
  export let selected;
  export let hovered;
</script>

<span
  class:text-theme-base={selected}
  class:font-bold={selected}
  class="py-1 px-3 -mx-2 hover:bg-background-weakest whitespace-nowrap flex cursor-pointer gap-1"
  on:focus={() => (hovered = uid)}
  on:mouseover={() => (hovered = uid)}
  on:mouseleave={() => (hovered = null)}
>
  {#if icon}<span>{icon}</span>{/if}
  <span>{@html label}</span>
</span>
