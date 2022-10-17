<script context="module">
  import { parse } from 'marked';
  import { loadFromStrapi } from './api/utils.js';
  import { kebabCase } from "lodash-es";

  export const load = async ({ fetch }) => {
    const data = await loadFromStrapi('issue', fetch);
    const { Issues } = data.attributes;

    return {
      props: {
        issues: Issues.map(section => ({
          title: (section.Title || '').trim(),
          text: parse(section.Description || ''),
          slug: kebabCase(section.Title)
        })).filter(d => d.title && d.text)
      }
    };
  }
  export const hydrate = false;
  export const router = false;
</script>

<script>
  export let issues;
</script>

<svelte:head>
  <title>Issues</title>
</svelte:head>

<div class="issues-header content-header container">
  <div class="wrapper">
    <h1 class="title">Issues</h1>
    <!-- <nav>
      <ul class="nav-inpage">
        {#each issues as { slug, title }}
        <li><a href={`#${slug}`}>{ title }</a></li>
        {/each}
      </ul>
    </nav> -->
  </div>
</div>

<div class="issues-content content-content container">
  <div class="wrapper content-layout">
    {#each issues as { slug, title, text }}
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