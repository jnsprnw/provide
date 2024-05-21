<script>
  import { PATH_EXPLORE } from '$config';
  export let path;
  export let title;
  export let audience = [];
</script>

<a href={`/${PATH_EXPLORE}/${path}`} class="hover:bg-surface-weakest hover:text-theme-base transition-colors grid grid-rows-[1fr_auto_auto] bg-surface-weaker p-4 sm:p-10 md:p-12 {$$props.class}">
  <div class="flex flex-col gap-y-2 my-4">
    <span class="uppercase text-center font-bold text-xl tracking-wide text-current">{title}</span>
    <div class="block text-center text-base sm:text-lg md:leading-normal text-black">
      <slot name="intro" />
    </div>
  </div>
  {#if audience.length}
    <span class="text-contour-weaker text-sm mt-6">Most suitable for:</span>
    <ul class="my-2 flex gap-y-2 flex-col text-base">
      {#each audience as label}
        <li class="flex items-center gap-x-2">
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.17688 7.73688C2.77774 7.36946 2.14852 7.38691 1.77148 7.77585C1.39443 8.1648 1.41234 8.77795 1.81147 9.14537L5.71148 12.7355C6.12186 13.1132 6.77232 13.0826 7.1434 12.668L15.255 3.6056C15.6159 3.20239 15.5731 2.59041 15.1593 2.23871C14.7455 1.88702 14.1175 1.92878 13.7566 2.332L6.32492 10.6347L3.17688 7.73688Z"
              fill="#316F91"
            />
          </svg>
          <span class=" text-black">{label}</span>
        </li>
      {/each}
    </ul>
  {/if}
  {#if $$slots.image}
    <figure class="p-0 md:px-8 py-6 sm:px-6 sm:py-12 md:py-16">
      <slot name="image" />
    </figure>
  {/if}
  {#if $$slots.footer}
    <footer class="text-xs mt-4 text-black">
      <slot name="footer" />
    </footer>
  {/if}
</a>
