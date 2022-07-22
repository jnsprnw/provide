<script>
  export let isOpen;
</script>

<svg xmlns="http://www.w3.org/2000/svg" class="accordion" class:isOpen width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M9 10l3 -3l3 3" transform={`translate(0 ${isOpen ? -3 : 0})`}></path>
  <path d="M9 14l3 3l3 -3" transform={`translate(0 ${isOpen ? 3 : 0})`}></path>
</svg>

<style lang="scss">
  svg {
    transition: color 0.3s ease-out;
    align-self: center;

    path {
      transition: transform 0.3s ease-out, color 0.3s ease-out; // TODO: Not working in Firefox
    }

    &.isOpen {
      color: var(--color-functional-accent);
    }
  }
</style>