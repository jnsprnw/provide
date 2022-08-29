<script context="module">
  import { parse } from 'marked';
  import { groupBy, kebabCase, sortBy } from "lodash-es";
  import { loadFromStrapi } from './api/utils.js';

  export const load = async ({ fetch }) => {
    const data = await loadFromStrapi('glossaries', fetch);
    let entries = data.map((d) => {
      const { Title, Category, Link, UID, Description, Abbreviation } = d.attributes;
      return {
        title: Title,
        category: Category || 'Other',
        footnote: Link,
        uid: UID || kebabCase(Title),
        description: parse(Description),
        abbreviation: Abbreviation
      }
    });

    entries = sortBy(entries, 'title');

    return {
      props: {
        entries: Object.entries(groupBy(entries, 'category'))
      }
    };
  }
  // export const hydrate = false;
  export const router = false;
</script>

<script>
  import Anchor from '$lib/helper/Anchor.svelte';
  export let entries;
</script>

<svelte:head>
  <title>Glossary</title>
</svelte:head>

<div class="glossary-header content-header container">
  <div class="wrapper">
    <h1 class="title">Glossary</h1>
    <nav>
      <ul class="nav-inpage subcategories">
        {#each entries as [category]}
        <li>
          <Anchor hash={kebabCase(category)} label={category} isHeadline={true} />
        </li>
        {/each}
      </ul>
    </nav>
  </div>
</div>

<div class="glossary-content container content-content">
  <div class="wrapper content-layout">
    {#each entries as [category, list]}
    <section>
      <header>
        <h2 id={kebabCase(category)} class="headline-section">{ category }</h2>
      </header>
      <dl class="text">
        {#each list as { title, uid, footnote, description, abbreviation }}
        <dt id={uid} class="headline-paragraph"><h3>{ title }</h3>{#if abbreviation}<abbr title={title}>{ abbreviation }</abbr>{/if}</dt>
        <dd>{ @html description }</dd>
        {#if footnote}<footer><a href={footnote} class="link">More information about { title }</a></footer>{/if}
        {/each}
      </dl>
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