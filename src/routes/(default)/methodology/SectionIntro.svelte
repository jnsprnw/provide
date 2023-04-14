<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  export let title;
  export let content;
  export let slug;
  export let query;
</script>

<h2 id={slug} class="font-bold text-2xl mb-2 mt-4 first-of-type:mt-0 {query}">{title}</h2>
<HtmlContent {content} />
