<script>
  export let isLoading = true;
  export let size = 30;
  export let strokeWidth = 4;
  export let color = 'stroke-theme-weaker';

  const inner = size - strokeWidth / 2;
</script>

{#if isLoading}
  <svg class="animate-spin overflow-visible" viewBox="0 0 {size} {size}" height={size} w={size}>
    <circle class="{color}/20 fill-none" r={inner / 2} cx={size / 2} cy={size / 2} stroke-width={strokeWidth} />
    <circle class="{color} fill-none" r={inner / 2} cx={size / 2} cy={size / 2} stroke-width={strokeWidth} stroke-dasharray={size * Math.PI} stroke-dashoffset={((size * Math.PI) / 4) * 3} />
  </svg>
{/if}
