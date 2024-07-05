<script>
  import LinkArrow from '$lib/helper/icons/LinkArrow.svelte';
  export let href;
</script>

<a {href} class="grid grid-cols-[1fr_24px] items-center gap-x-4 py-5 px-6 bg-white/95 hover:bg-white text-theme-base rounded-md mb-5 leading-normal text-base">
  <slot />
  <LinkArrow />
</a>
