<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  export let content;
  export let slug;
  export let title;
  export let link;
  export let query;
</script>

<h3 id={slug} class="font-bold text-xl {query}">{title}</h3>
<HtmlContent {content} />
{#if link}
  <a href={link} class="link">More information about {title}</a>
{/if}
