<script>
  export let href;
</script>

<a {href} class="grid grid-cols-[1fr_24px] items-center gap-x-4 py-5 px-6 bg-white/95 hover:bg-white text-theme-base rounded-md mb-5 leading-normal text-base">
  <slot />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-arrow-narrow-right"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg
  >
</a>
