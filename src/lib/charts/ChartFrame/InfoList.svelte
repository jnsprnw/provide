<script>
  export let items;
</script>

<!-- svelte-ignore a11y-structure -->
<figcaption class="mt-4">
  <dl class="flex gap-4">
    {#each items as item}
      <div class="flex text-sm py-1">
        <dt class="font-bold mr-2">{item.label}:</dt>
        <dd class="min-w-10">{item.value}</dd>
      </div>
    {/each}
  </dl>
</figcaption>
