<script>
  import { page } from '$app/stores';
  import { parseUrlQuery, urlToState } from '$lib/utils/url';
  //import { onMount } from 'svelte';
  import ImpactTime from '$routes/(default)/explore/impacts/ImpactTime/ImpactTime.svelte';
  import ImpactGeo from '$routes/(default)/explore/impacts/ImpactGeo/ImpactGeo.svelte';
  import UnavoidableRisk from '$routes/(default)/explore/impacts/UnavoidableRisk/UnavoidableRisk.svelte';
  import { IS_STATIC } from '$stores/state';

  const embeds = {
    'impact-time': ImpactTime,
    'impact-geo': ImpactGeo,
    'unavoidable-risk': UnavoidableRisk,
  };

  $: urlToState($page.url);
  $: urlParams = parseUrlQuery($page.url);
  $: component = embeds[$page.params.embed];

  $: $IS_STATIC = urlParams.static;

  // onMount(async () => {
  //   Component = (await import(`./dir/${embeds[$page.params.embed]}`)).default;
  // });
</script>

<div class="embed p-6 pb-3">
  <svelte:component this={component} {...urlParams} />
  <div
    class="text-sm text-foreground-weak border-t border-foreground-weaker pt-2 mt-2"
  >
    Visit <a class="text-theme-base" href={import.meta.env.VITE_APP_URL}
      >{import.meta.env.VITE_APP_URL.replace(/http(s)?:\/\//, '')}</a
    > for more information
  </div>
</div>
