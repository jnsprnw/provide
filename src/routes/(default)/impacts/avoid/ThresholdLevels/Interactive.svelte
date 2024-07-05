<script>
  export let weak = false;
</script>

<span
  class:!text-contour-weaker={weak}
  class="font-bold text-theme-base border border-contour-weakest rounded px-1 py-0.5 whitespace-nowrap"><slot /></span
>
