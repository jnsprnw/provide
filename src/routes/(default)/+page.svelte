<script>
  import Entrypoints from './landing-page/Entrypoints.svelte';
  import Globe from './landing-page/Globe.svelte';

  export let data;

  $: ({ stories, caseStudies } = data);
</script>

<Globe {stories} />

<div class="mx-auto max-w-7xl px-6">
  <Entrypoints {caseStudies} />
</div>
