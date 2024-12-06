<script>
  import Entrypoints from './landing-page/Entrypoints.svelte';
  import Carousel from './landing-page/Carousel.svelte';

  export let data;
  $: ({ stories, caseStudies, videos } = data);
</script>

<Carousel {stories} />

<div class="mx-auto max-w-7xl px-6">
  <Entrypoints {caseStudies} {videos} />
</div>
