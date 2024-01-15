<script>
  let clazz;
  export let isOpen = false;
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
  <path d="M9 11l3 3l3 -3" transform={`rotate(${isOpen ? 180 : 0})`} />
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
