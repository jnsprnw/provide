<script>
  import { page } from '$app/stores';
  import { urlToState } from '$lib/utils/url';
  //import { onMount } from 'svelte';
  import ImpactTime from '$routes/(default)/explore/impacts/ImpactTime/ImpactTime.svelte';
  import ImpactGeo from '$routes/(default)/explore/impacts/ImpactGeo/ImpactGeo.svelte';
  import UnavoidableRisk from '$routes/(default)/explore/impacts/UnavoidableRisk/UnavoidableRisk.svelte';

  const embeds = {
    'impact-time': ImpactTime,
    'impact-geo': ImpactGeo,
    'unavoidable-risk': UnavoidableRisk,
  };

  $: urlToState($page.url);
  $: component = embeds[$page.params.embed];

  // onMount(async () => {
  //   Component = (await import(`./dir/${embeds[$page.params.embed]}`)).default;
  // });
</script>

<svelte:component this={component} />
