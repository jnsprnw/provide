<script context="module">
  import { parse } from 'marked';
  import { loadFromStrapi } from './api/utils.js';
  import { kebabCase } from "lodash-es";

  export const load = async ({ fetch }) => {
    const data = await loadFromStrapi('about', fetch);
    const { Section } = data.attributes;

    return {
      props: {
        sections: Section.map(section => ({
          title: section.Title,
          text: parse(section.Text || ''),
          slug: kebabCase(section.Title)
        }))
      }
    };
  }
  export const hydrate = false;
  export const router = false;
</script>

<script>
  export let sections;
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="about-header content-header container">
  <div class="wrapper">
    <h1 class="title">About</h1>
    <nav>
      <ul class="nav-inpage">
        {#each sections as { slug, title }}
        <li><a href={`#${slug}`}>{ title }</a></li>
        {/each}
      </ul>
    </nav>
  </div>
</div>

<div class="about-content content-content container">
  <div class="wrapper content-layout">
    {#each sections as { slug, title, text }}
    <section>
      <header>
        <h2 id={slug} class="headline-section">{ title }</h2>
      </header>
      <div class="text">
        { @html text }
      </div>
    </section>
    {/each}
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