<script>
  import { page } from '$app/stores';
  import { urlToState } from '$lib/utils/url';
  import { onMount } from 'svelte';

  let Component;

  const embeds = {
    'impact-time': '../../../../(default)/explore/impacts/ImpactTime/ImpactTime.svelte',
    'impact-geography': '../../../../(default)/explore/impacts/ImpactGeo/ImpactGeo.svelte',
  };

  $: urlToState($page.url);

  onMount(async () => {
    Component = (await import(`./dir/${embeds[$page.params.embed]}`)).default;
  });
</script>

<svelte:component this={Component} />
