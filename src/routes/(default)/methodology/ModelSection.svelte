<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  import { getContext } from 'svelte';

  export let content;
  export let slug;
  export let title;
  export let link;
  const { query } = getContext('scrollContent');
</script>

<h3
  id={slug}
  name={slug}
  class="scroll-mt-4 font-bold text-xl mb-2 mt-4 first:mt-0 {query}"
>
  {title}
</h3>
<HtmlContent {content} />
{#if link}
  <a
    href={link}
    class="underline decoration-theme-weaker hover:decoration-theme-stronger mt-3 text-sm inline-block"
    >More information about {title}</a
  >
{/if}
