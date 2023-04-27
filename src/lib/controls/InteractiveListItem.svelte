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
  class:border-r-3={selected}
  class="py-1 px-5 hover:bg-background-weaker whitespace-nowrap flex cursor-pointer gap-1 border-theme-base"
  on:focus={() => (hovered = uid)}
  on:mouseover={() => (hovered = uid)}
  on:mouseleave={() => (hovered = null)}
>
  {#if icon}<span>{icon}</span>{/if}
  <span>{@html label}</span>
</span>
