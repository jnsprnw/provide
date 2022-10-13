<script>
  import { formatList } from '$lib/utils.js';
  export let data;
  export let term;

  $: ({ label, length } = formatList(data))
</script>

<dt>{ term }{#if length > 1}s{/if}:</dt>
<dd>{ label || '—' }</dd>