<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  import { getContext } from 'svelte';
  export let slug;
  export let title;
  export let content;
  const { query } = getContext('scrollContent');
</script>

<h3 id={slug} name={slug} class="font-bold text-xl mb-2 mt-4 first:mt-0 {query}">{title}</h3>
<HtmlContent {content} />
