<script>
  import { getContext } from 'svelte';
  import { kebabCase } from 'lodash-es';
  const { query } = getContext('scrollContent');
  export let title;
  export let subtitle;
  export let slug = undefined;

  $: id = slug ?? kebabCase(title);
</script>

<header class="flex flex-col gap-x-2 scroll-mt-4 mb-2 mt-4 first-of-type:mt-0 {query}" class:mb-4={subtitle} {id} name={id}>
  <h3 class="font-bold text-xl">{title}</h3>
  {#if subtitle}<span class="text-xs text-text-weaker">{subtitle}</span>{/if}
</header>
