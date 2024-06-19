<script>
  /** @type {number} Width of the content */
  export let widthOfContent = 0;
  /** @type {number} Distance of the left indicator to the left */
  export let distanceLeft = 0;
  /** @type {number} Distance of the right indicator to the right */
  export let distanceRight = 0;
  /** @type {boolean} Whether or not to show horizontal scrollbars */
  export let showScrollbars = false;

  const padding = 10;
  // Width of the content wrapper
  let widthOfWrapper = 0;
  // Ref to the table
  let table;
  // Scroll position to the left
  let sleft = 0;
</script>

<div class="relative">
  <div class="w-full overflow-x-scroll scrollbar-hide" class:scrollbar-hide={!showScrollbars} bind:clientWidth={widthOfWrapper} bind:this={table} on:scroll={() => (sleft = table.scrollLeft)}>
    <slot />
  </div>
  <i class="block absolute top-0 h-full border-l border-l-contour-base/10 bg-contour-base/10 w-2 z-10 opacity-0 transition-opacity" class:opacity-100={sleft > padding} style="left: {distanceLeft}px;"
  ></i>
  <i
    class="block absolute top-0 h-full border-r border-r-contour-base/10 bg-contour-base/10 w-2 z-10 opacity-0 transition-opacity"
    class:opacity-100={sleft < widthOfContent - widthOfWrapper - padding}
    style="right: {distanceRight}px;"
  ></i>
</div>
