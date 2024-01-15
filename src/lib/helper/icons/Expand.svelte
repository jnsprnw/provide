<script>
  let clazz;
  export let isOpen;
  export { clazz as class };
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class={clazz}
  class:isOpen
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M9 10l3 -3l3 3" transform={`translate(0 ${isOpen ? -3 : 0})`} />
  <path d="M9 14l3 3l3 -3" transform={`translate(0 ${isOpen ? 3 : 0})`} />
</svg>

<style lang="postcss">
  svg {
    transition: color var(--transition-duration-base) ease-out;
    align-self: center;

    path {
      transition:
        transform var(--transition-duration-base) ease-out,
        color var(--transition-duration-base) ease-out;
    }

    &.isOpen {
      color: var(--color-functional-accent);
    }
  }
</style>
