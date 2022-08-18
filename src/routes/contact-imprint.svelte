<script context="module">
  import { parse } from 'marked';
  import { loadFromStrapi } from './api/utils.js';

  export const load = async ({ fetch }) => {
    const data = await loadFromStrapi('disclaimer', fetch);
    const { Text } = data.attributes;

    return {
      props: {
        text: parse(Text)
      }
    };
  }
  export const hydrate = false;
  export const router = false;
</script>

<script>
  export let text;
</script>

<svelte:head>
  <title>Contact and Imprint</title>
</svelte:head>

<div class="contact-header content-header container">
  <div class="wrapper">
    <h1 class="title">Contact and Imprint</h1>
  </div>
</div>

<div class="contact-content content-content container">
  <div class="wrapper content-layout">
    <section>
      <div class="text">
        { @html text }
      </div>
    </section>
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