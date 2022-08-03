<script context="module">
  import { parse } from 'marked';
  import { loadFromAPI } from '$lib/utils.js';

  export const load = async ({ fetch }) => {
    const data = await loadFromAPI('disclaimer', fetch);
    const { Text } = data.attributes;

    return {
      props: {
        text: parse(Text)
      }
    };
  }
</script>

<script>
  export let text;
</script>

<svelte:head>
  <title>Contact and Imprint</title>
</svelte:head>

<div class="faq-header container">
  <div class="wrapper">
    <h1>Contact and Imprint</h1>
  </div>
</div>

<div class="faq-content container">
  <div class="wrapper">
    { @html text }
  </div>
</div>

<style lang="scss">
  @import '../styles/global.scss';

  .section {
    .topic {
      grid-column: 1 / span 6;
    }
  }
</style>