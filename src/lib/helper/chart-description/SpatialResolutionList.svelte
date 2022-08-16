<script>
  import { formatList } from '$lib/utils.js';

  export let data;

  $: arr = data.map(d => `${d}°`)

  $: ({ label, length } = formatList(arr))
</script>

<dt>Spatial resolution{#if length > 1}s{/if}:</dt>
<dd>{ label || '—' }</dd>