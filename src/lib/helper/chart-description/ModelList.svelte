<script>
  import { formatList } from '$lib/utils.js';
  export let data;

  $: ({ label, length } = formatList(data))
</script>

<dt>Model{#if length > 1}s{/if}:</dt>
<dd>{ label || '—' }</dd>