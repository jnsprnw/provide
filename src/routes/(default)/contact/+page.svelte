<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  export let data;

  $: ({ text } = data);
</script>
<div class="grid grid-cols-12 gap-10 pt-8 mx-auto max-w-7xl px-6">
  <div class="col-start-4 col-span-9">
    <h1 class="text-5xl font-bold mb-12">Contact</h1>
    <HtmlContent content={text} />
  </div>
</div>

<style lang="postcss">
  .contact-content {
    .btn {
      margin-top: var(--space-s);
    }
  }
</style>
