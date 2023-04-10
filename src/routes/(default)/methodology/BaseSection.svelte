<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  export let slug;
  export let title;
  export let content;
  export let query;
</script>

<h3 id={slug} class="font-bold text-xl {query}">{title}</h3>
<HtmlContent {content} />
