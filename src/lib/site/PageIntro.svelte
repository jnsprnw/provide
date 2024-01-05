<script>
  export let isCompact = false;
</script>

<div class="bg-surface-weaker">
  <div class="mx-auto px-6 pt-16 flex flex-col gap-y-16 pb-10 {isCompact ? 'max-w-4xl' : 'max-w-7xl'}">
    <slot />
  </div>
</div>
