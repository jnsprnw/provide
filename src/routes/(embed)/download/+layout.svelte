<script>
  import { page } from '$app/stores';
  import { urlToState } from '$lib/utils/url';

  $: urlToState($page.url);
</script>

<slot />
