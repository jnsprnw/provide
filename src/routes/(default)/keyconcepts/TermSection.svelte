<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  import { getContext } from 'svelte';
  export let title;
  export let content;
  export let slug;
  export let footnote;
  export let abbreviation;
  export let category; // This is currently not used for anything
  const { query } = getContext('scrollContent');
</script>

<header class="flex gap-x-2 items-end scroll-mt-4 mb-2 mt-4 first-of-type:mt-0 {query}" id={slug} name={slug} data-category={category}>
  <h3 class="font-bold text-xl">{title}</h3>
  {#if abbreviation}<abbr {title}>{abbreviation}</abbr>{/if}
</header>
<HtmlContent {content} />
{#if footnote}
  <footer>
    <a href={footnote} class="underline decoration-theme-weaker hover:decoration-theme-stronger mt-3 text-sm inline-block">More information about {title}</a>
  </footer>
{/if}
