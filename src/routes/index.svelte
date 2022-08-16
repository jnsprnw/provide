<script context="module">
  import { loadFromStrapi, loadFromAPI } from '$lib/../routes/api/utils.js';
  import { get, find, compact } from 'lodash-es';
  import qs from "qs";

  export const load = async ({ fetch }) => {
    const meta = await loadFromAPI(`/api/meta/`, '', fetch);
    const stories = await loadFromStrapi('stories', fetch);

    const datum = compact(stories.map(({ attributes }) => {
      const { indicator: indicatorUID, type, geographyType, geography: geographyUID, scenario: scenarioUID } = attributes;
      const geography = find(get(meta, [geographyType], []), { uid: geographyUID });
      const indicator = find(get(meta, 'indicators', []), { uid: indicatorUID });
      const scenario = find(get(meta, 'scenarios', []), { uid: scenarioUID });
      if (geography && indicator && scenario) {
        const query = qs.stringify(
          {
            indicator: indicatorUID,
            geography: geographyUID,
            scenario: scenarioUID
          },
          {
            encodeValuesOnly: true,
          }
        );
        return {
          geography,
          indicator,
          scenario,
          url: `explore/${type}?${query}`
        }
      } else {
        return false;
      }
    }))

    return {
      props: {
        data: datum
      }
    };
  }
</script>

<script>
  export let data;
</script>

<svelte:head>
  <title>Provide Project</title>
</svelte:head>

<div class="stories container">
  <div class="wrapper grid">
    <div class="stories-wrapper">
      <ul>
        {#each data as datum}
        <li class="story">
          <span>
            How will
            <em>{datum.indicator.label}</em> in
            <em>{#if datum.geography.emoji}{datum.geography.emoji}&nbsp;{/if}{datum.geography.label}</em> develop under a
            <em>{datum.scenario.label}</em> scenario?
          </span>
          <a class="btn" href={datum.url}>Explore use case</a>
        </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<div class="paths container">
  <div class="wrapper grid">
    <header>
      <h4>How to start?</h4>
      <p>The PROVIDE Climate Services Dashboard allows to explore climate impacts across a wide range of emissions scenarios and geographic entities. There are two modes through which to explore the data.</p>
    </header>
    <section class="path">
      <div>
        <span class="text-label">Impacts</span>
        <span class="description">Select a geographical region, one or several scenarios, and explore corresponding impacts</span>
      </div>
      <figure>
        Graphic
      </figure>
      <a class="btn" href="/explore/impacts">Explore impacts</a>
    </section>
    <section class="path">
      <div>
        <span class="text-label">Emission scenarios</span>
        <span class="description">Select a geographical region, an impact threshold, and explore scenarios under which the threshold won't be exceeded</span>
      </div>
      <figure>
        Graphic
      </figure>
      <span class="btn" href="/explore/emission-scenarios">Explore emission scenarios</span>
    </section>
  </div>
</div>

<style lang="scss">
  .stories {
    background-color: var(--color-light-blue100);
    width: 100%;

    .stories-wrapper {
      grid-column: 1 / -1;
      margin-bottom: var(--space-xl);

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        .story {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-s);
          color: var(--color-light-brand-stronger);
          font-size: var(--font-size-large-xl);
          font-weight: var(--font-font-weight-regular);
          background-color: var(--color-light-background-base);
          padding: var(--space-m);
          margin: var(--space-m);
          border-radius: var(--radius-interactive-l);
          max-width: 40ch;

          em {
            font-weight: var(--font-font-weight-bold);
            font-style: normal;
          }

          .btn {
            border-radius: var(--radius-interactive-l);
          }
        }
      }
    }
  }

  .btn {
    background-color: var(--color-functional-accent);
    display: block;
    border: 1px solid transparent;
    color: var(--color-light-background-base);
    transition: background-color var(--transition-duration-base) ease-out;
    padding: var(--size-space-large-xxs);
    cursor: pointer;
    font-size: var(--font-size-large-m);
    font-weight: var(--font-font-weight-regular);
    text-align: center;

    &:focus, &:hover {
      background-color: var(--color-brand-stronger);
    }
  }

  .paths {
    margin: var(--space-l) 0;

    header {
      grid-column: 2 / -2;
      margin: var(--space-xxxl) 0;
      text-align: center;
      font-size: var(--font-size-large-l);
      color: var(--color-light-brand-stronger);
    }

    .path {
      display: grid;
      grid-template-rows: 1fr auto auto;
      grid-gap: var(--space-xs);
      grid-column-start: span 6;
      background-color: var(--color-light-blue100);
      
      .text-label {
        display: block;
        padding: var(--space-m) 0 0 var(--space-m);
      }

      .description {
        padding: 0 0 0 var(--space-m);
        display: block;
        font-size: var(--font-size-large-l);
        color: var(--color-light-brand-stronger);
      }

      figure {
        width: 100%;
        text-align: center;
        padding: var(--space-m);
      }
    }
  }
</style>

