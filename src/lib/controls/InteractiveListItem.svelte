<script>
  export let label;
  export let uid;
  export let icon;
  export let selected;
  export let hovered;
</script>

<span
  role="button"
  tabindex="0"
  class:text-theme-base={selected}
  class:border-r-3={selected}
  class="py-1 px-5 hover:bg-surface-weaker focus:bg-surface-weaker focus:outline-none whitespace-nowrap flex cursor-pointer gap-1 border-theme-base"
  on:focus={() => (hovered = uid)}
  on:mouseover={() => (hovered = uid)}
  on:mouseleave={() => (hovered = null)}
  on:blur={() => (hovered = null)}
  title={label}
>
  {#if icon}<i class="not-italic" aria-hidden role="presentation">{icon}</i>{/if}
  <span class:font-bold={selected} class="truncate">{@html label}</span>
</span>
