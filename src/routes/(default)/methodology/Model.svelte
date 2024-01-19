<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  import { getContext } from 'svelte';

  export let slug;
  export let title;
  export let description;
  export let simulation;
  export let processing;

  const { query } = getContext('scrollContent');
</script>

<h3 id={slug} name={slug} class="scroll-mt-4 font-bold text-2xl mb-2 mt-4 first:mt-0 {query}">
  {title}
</h3>
<HtmlContent content={description} />
{#if simulation}
  <h4 class="scroll-mt-4 font-bold text-xl mb-2 mt-4 first:mt-0">Simulation</h4>
  <HtmlContent content={simulation} />
{/if}
{#if processing.length}
  <h4 class="scroll-mt-4 font-bold text-xl mb-2 mt-4 first:mt-0">Processing</h4>
  {#each processing as { description }}
    <HtmlContent content={description} />
  {/each}
{/if}
