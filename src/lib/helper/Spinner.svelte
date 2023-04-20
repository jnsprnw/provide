<script>
  export let isLoading = true;
  const size = 30;
  const stroke = 4;
  const inner = size - stroke / 2;
</script>

{#if isLoading}
  <svg
    class="animate-spin overflow-visible"
    viewBox="0 0 {size} {size}"
    height={size}
    w={size}
  >
    <circle
      class="stroke-theme-weaker/20 fill-none"
      r={inner / 2}
      cx={size / 2}
      cy={size / 2}
      stroke-width={stroke}
    />
    <circle
      class="stroke-theme-weaker fill-none"
      r={inner / 2}
      cx={size / 2}
      cy={size / 2}
      stroke-width={stroke}
      stroke-dasharray={size * Math.PI}
      stroke-dashoffset={((size * Math.PI) / 4) * 3}
    />
  </svg>
{/if}
