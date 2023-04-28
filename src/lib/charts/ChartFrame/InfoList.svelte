<script>
  export let items;
</script>

<!-- svelte-ignore a11y-structure -->
<figcaption class="my-3">
  <dl class="flex gap-4">
    {#each items as item}
      <div class="flex text-sm">
        <dt class="font-bold mr-1">{item.label}</dt>
        <dd class="min-w-10 text-foreground-weak">{item.value}</dd>
      </div>
    {/each}
  </dl>
</figcaption>
