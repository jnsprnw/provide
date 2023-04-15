<script>
  import { page } from '$app/stores';
  import { urlToState } from '$lib/utils/url';
  import { IS_EMBEDED } from '$stores/state.js';

  $: urlToState($page.url);

  IS_EMBEDED.set(true);
</script>

<slot />
