<script>
  import { page } from '$app/stores';
  import { parseUrlQuery, urlToState } from '$lib/utils/url';
  import ImpactTime from '$routes/(default)/impacts/explore/ImpactTime/ImpactTime.svelte';
  import ImpactGeo from '$routes/(default)/impacts/explore/ImpactGeo/ImpactGeo.svelte';
  import UnavoidableRisk from '$routes/(default)/impacts/UnavoidableRisk/UnavoidableRisk.svelte';
  import { IS_STATIC } from '$stores/state';
  import Logo from '$lib/site/Logo.svelte';

  const embeds = {
    'impact-time': ImpactTime,
    'impact-geo': ImpactGeo,
    'unavoidable-risk': UnavoidableRisk,
  };

  $: urlToState($page.url);
  $: urlParams = parseUrlQuery($page.url);
  $: component = embeds[$page.params.embed];

  $: $IS_STATIC = urlParams.static;

  function generateUrl() {
    const url = import.meta.env.VITE_APP_URL;
    if (url) {
      try {
        const host = new URL(url).hostname;
        return {
          url,
          host,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    console.warn(`APP URL was not set. Will not display link.`);
    return null;
  }

  const url = generateUrl();
</script>

<div class="embed p-6 pb-0">
  <svelte:component this={component} {...urlParams} />
  <div class="flex justify-between text-sm text-contour-weak border-t border-contour-weak pt-3 pb-4">
    <Logo size="sm" />
    {#if url}
      <div>
        Visit <a class="text-theme-base" href={url.url}>{url.host}</a> for more information
      </div>
    {/if}
  </div>
</div>
