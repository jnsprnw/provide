<script>
  import { getContext } from 'svelte';
  export let title;
  export let slug;
  const { query } = getContext('scrollContent');
</script>

<h2 id={slug} name={slug} class="scroll-mt-4 font-bold text-2xl mb-2 mt-4 first-of-type:mt-0 {query}">{title}</h2>
