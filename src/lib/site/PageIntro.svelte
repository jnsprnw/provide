<script>
  export let isCompact = false;
</script>

<div class="bg-surface-weaker">
  <div class="mx-auto max-w-7xl px-6 pt-16 flex flex-col gap-y-16 pb-10" class:pt-8={isCompact}>
    <slot />
  </div>
</div>
