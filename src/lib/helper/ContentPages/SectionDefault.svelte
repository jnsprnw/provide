<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  import { kebabCase } from 'lodash-es';
  import { getContext } from 'svelte';
  export let title;
  export let subtitle;
  export let content = null;
  export let slug;
  const { query } = getContext('scrollContent');
</script>

{#if title}
  <h2 id={slug || kebabCase(title)} name={slug} class="scroll-mt-4 font-bold text-3xl mb-2 mt-4 first-of-type:mt-0 {query}">{title}</h2>
{/if}
{#if subtitle}
  <p class="text-text-weaker">{subtitle}</p>
{/if}
<HtmlContent {content} />
