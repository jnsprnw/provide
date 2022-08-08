<script context="module">
  import { parse } from 'marked';
  import { kebabCase } from "lodash-es";
  import { loadFromAPI } from '$lib/utils.js';

  export const load = async ({ fetch }) => {
    const data = await loadFromAPI('technical-documentation', fetch);
    const { Models, Scenarios } = data.attributes;

    return {
      props: {
        models: Models.map(({ Title, Description, Link }) => {
          return {
            title: Title,
            slug: kebabCase(Title),
            description: parse(Description),
            link: Link
          }
        }),
        scenarios: Scenarios.map(({ Title, Description }) => {
          return {
            title: Title,
            slug: kebabCase(Title),
            description: parse(Description)
          }
        }),
      }
    };
  }
</script>

<script>
  export let models;
  export let scenarios;
</script>

<svelte:head>
  <title>Technical Documentation</title>
</svelte:head>

<div class="technical-documentation-header content-header container">
  <div class="wrapper">
    <h1 class="title">Technical Documentation</h1>
    <nav>
      <ul class="nav-inpage subcategories">
        <li>
          <a href="#models" class="nav-headline-section">Models</a>
          <ul>
            {#each models as { title, slug }}
            <li><a href={`#${slug}`}>{ title }</a></li>
            {/each}
          </ul>
        </li>
        <li>
          <a href="#scenarios" class="nav-headline-section">Scenarios</a>
          <ul>
            {#each scenarios as { title, slug }}
            <li><a href={`#${slug}`}>{ title }</a></li>
            {/each}
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</div>

<div class="technical-documentation-content content-content container">
  <div class="wrapper content-layout">
    <section>
      <header>
        <h2 id="models" class="headline-section">Models</h2>
      </header>
      <div>
        {#each models as { title, description, link, slug }}
        <h3 id={slug} class="headline-paragraph">{ title }</h3>
        { @html description }
        <a href={link} class="link">More information about { title }</a>
        {/each}
      </div>
    </section>
    <section>
      <header>
        <h2 id="scenarios" class="headline-section">Scenarios</h2>
      </header>
      <div>
        {#each scenarios as { title, description, slug }}
        <h3 id={slug} class="headline-paragraph">{ title }</h3>
        { @html description }
        {/each}
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