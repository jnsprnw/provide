<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  import { getContext } from 'svelte';

  export let slug;
  export let title;
  export let content;

  const { query } = getContext('scrollContent');
</script>

<h3 id={slug} name={slug} class="scroll-mt-4 font-bold text-2xl mb-2 mt-6 first:mt-0 {query}">
  {title}
</h3>
{#each content as { slug, title, description }}
  {#if title}
    <h4 id={slug} name={slug} class="scroll-mt-4 font-bold text-xl mb-2 mt-4 first:mt-0">
      {title}
    </h4>
  {/if}
  <HtmlContent content={description} />
{/each}
