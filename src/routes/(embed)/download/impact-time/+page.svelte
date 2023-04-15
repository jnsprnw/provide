<script>
  import { page } from '$app/stores';
  import { urlToState } from '$lib/utils/url';

  import ImpactTime from "$src/routes/(default)/explore/impacts/ImpactTime/ImpactTime.svelte";

  $: urlToState($page.url);
</script>

<ImpactTime />