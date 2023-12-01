<script>
  export let interactive;
</script>

{#if !interactive}
  <div
    class="absolute z-1 inset-0 flex items-center justify-center transition-all duration-100 hover:opacity-100 opacity-0"
  >
    <button
      on:click={() => (interactive = true)}
      class="text-surface-base px-6 py-3 bg-black/60 rounded-full"
    >
      Click to make map interactive
    </button>
  </div>
  <!-- {:else}
  <button
    on:click={() => (interactive = false)}
    class="absolute top-0 right-0 text-surface-base px-3 py-1 bg-black/60 rounded-full"
  >
    Static
  </button> -->
{/if}
