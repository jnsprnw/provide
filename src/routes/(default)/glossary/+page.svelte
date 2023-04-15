<script>
  import { groups } from 'd3-array';
  import { keyBy } from 'lodash-es';

  export let data;
  $: ({ entries, categories } = data);

  $: entriesByCategory = groups(entries, (d) => d.category);
  $: categoriesBySlug = keyBy(categories, 'slug');
</script>

<div class="glossary-header content-header container">
  <div class="wrapper">
    <h1 class="title">Glossary</h1>
    <nav>
      <ul class="nav-inpage subcategories">
        {#each categories as category}
          <li>
            <a href={`#${category.slug}`} class="nav-headline-section"
              >{category.label}</a
            >
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</div>

<div class="glossary-content container content-content">
  <div class="wrapper content-layout">
    {#each entriesByCategory as [category, list]}
      <section>
        <header>
          <h2 id={category} class="headline-section">
            {categoriesBySlug[category].label}
          </h2>
        </header>
        <dl class="text">
          {#each list as { title, uid, footnote, description, abbreviation }}
            <dt id={uid} class="headline-paragraph">
              <h3>{title}</h3>
              {#if abbreviation}<abbr {title}>{abbreviation}</abbr>{/if}
            </dt>
            <dd>{@html description}</dd>
            {#if footnote}<footer>
                <a href={footnote} class="link"
                  >More information about {title}</a
                >
              </footer>{/if}
          {/each}
        </dl>
      </section>
    {/each}
  </div>
</div>

<style lang="postcss">
  .section {
    .topic {
      grid-column: 1 / span 6;
    }
  }
</style>
