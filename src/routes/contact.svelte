<script context="module">
  import { parse } from 'marked';
  import { loadFromStrapi } from './api/utils.js';

  export const load = async ({ fetch }) => {
    const data = await loadFromStrapi('contact', fetch);
    const { Contact } = data.attributes;

    return {
      props: {
        text: parse(Contact)
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
  <title>Contact</title>
</svelte:head>

<div class="contact-header content-header container">
  <div class="wrapper">
    <h1 class="title">Contact</h1>
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

  .contact-content {
    .btn {
      margin-top: var(--space-s);
    }
  }
</style>