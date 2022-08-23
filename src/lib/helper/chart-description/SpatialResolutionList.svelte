<script>
  import { formatValue } from '$lib/utils/formatting';

  export let resolution;
  $: formatted = formatValue(resolution, 'degree');
  $: label = resolution ? `${formatted} × ${formatted}` : '—';
</script>

<dt>Spatial resolution:</dt>
<dd>{label}</dd>
