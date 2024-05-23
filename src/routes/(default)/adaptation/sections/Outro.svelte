<script>
  import Replicate from '$lib/helper/icons/Replicate.svelte';
  import HtmlContent from '$src/lib/helper/HtmlContent.svelte';

  export let title;
  export let text;
</script>

<div class="border-contour-weakest border-t pt-12 my-12">
  <div class="bg-surface-weakest flex p-10 gap-10 mb-12">
    <Replicate class="w-[13%] min-w-[70px]" />
    <div>
      <h2 class="text-2xl font-bold mb-3">{title}</h2>
      <HtmlContent class="text-lg text-text-weaker" content={text} />
    </div>
  </div>
</div>
