<script context="module">
  import { loadFromStrapi, loadFromAPI } from '$lib/../routes/api/utils.js';
  import { get, find, compact, uniq } from 'lodash-es';
  import qs from 'qs';
  import { formatObjArr } from '$lib/utils.js';

  export const load = async ({ fetch }) => {
    const meta = await loadFromAPI(`/api/meta/`, fetch);
    const stories = await loadFromStrapi('stories', fetch);

    const datum = compact(
      stories.map(({ attributes }) => {
        const {
          Indicator: _indicatorUID,
          Type,
          GeographyType: _GeographyType,
          Geography: _geographyUID,
          Scenarios: scenarioUIDs,
        } = attributes;
        let geographyUID = _geographyUID.trim();
        let indicatorUID = _indicatorUID.trim();
        let geographyType = _GeographyType.trim();
        const geography = find(get(meta, [geographyType], []), {
          uid: geographyUID,
        });
        const indicator = find(get(meta, 'indicators', []), {
          uid: indicatorUID,
        });
        const scenarioList = uniq(scenarioUIDs.map(({ UID }) => UID.trim()));
        const scenarios = compact(
          scenarioList.map((uid) => find(get(meta, 'scenarios', []), { uid }))
        ).slice(0, 3);
        if (geography && indicator && scenarios.length) {
          const query = qs.stringify(
            {
              indicator: indicatorUID,
              geography: geographyUID,
              scenarios: scenarioList,
            },
            {
              encodeValuesOnly: true,
            }
          );
          return {
            geography,
            indicator,
            scenarios: formatObjArr(scenarios, 'label'),
            url: `explore/${Type}?${query}`,
          };
        } else {
          return false;
        }
      })
    );

    return {
      props: {
        data: datum,
      },
    };
  };
</script>

<script>
  export let data;

  let currentStoryID = 0;
  let height;

  $: currentStory = get(data, currentStoryID || 0);

  const intervalID = setInterval(nextStory, 4000);

  function nextStory() {
    const next = currentStoryID === data.length - 1 ? 0 : currentStoryID + 1;
    changeStory(next);
  }

  function changeStory(index) {
    currentStoryID = index;
  }

  function handClick(index) {
    clearInterval(intervalID);
    changeStory(index);
  }
</script>

<svelte:head>
  <title>Provide Project</title>
</svelte:head>

<div class="stories container">
  <div class="wrapper grid">
    <div class="stories-wrapper">
      <ul>
        <li class="story">
          <div class="story-wrapper" style={`height: ${height}px;`}>
            {#key currentStory}
              <span bind:clientHeight={height}>
                How will
                <em>{currentStory.indicator.label}</em> in
                <em
                  >{#if currentStory.geography.emoji}{currentStory.geography
                      .emoji}&nbsp;{/if}{currentStory.geography.label}</em
                >
                develop under the
                {#each currentStory.scenarios as { type, value }}
                  {#if type === 'element'}
                    <em>{value.label}</em>
                  {:else}
                    {value}
                  {/if}
                {/each}
                scenario{#if currentStory.scenarios.length > 1}s{/if}?
              </span>
            {/key}
          </div>
          <a class="story-link btn" href={currentStory.url}>Explore</a>
        </li>
      </ul>
    </div>
    <div class="stories-nav">
      {#each data as datum, i}
        <button
          on:click={() => handClick(i)}
          class:active={currentStoryID === i}>{i}</button
        >
      {/each}
    </div>
  </div>
</div>

<div class="paths container">
  <div class="wrapper grid">
    <header>
      <h4>How to start?</h4>
      <p>
        The <b>Climate risk dashboard</b> allows you to explore future impacts from
        climate change as the world warms. Start by picking a mode.
      </p>
    </header>
    <section class="path">
      <div>
        <span class="text-label">Impacts</span>
        <span class="description"
          >Pick a geography, select one or several scenarios, and explore
          corresponding impacts</span
        >
      </div>
      <figure class="container">
        <img src="/img/impacts.png" />
      </figure>
      <a class="btn btn--big" href="/explore/impacts">Explore</a>
    </section>
    <section class="path disabled">
      <div>
        <span class="text-label">Emission scenarios</span>
        <span class="description"
          >Select a threshold for a climate impact, explore scenarios under
          which the threshold won't be exceeded
        </span>
      </div>
      <figure class="container">
        <img src="/img/emission-scenarios.png" />
      </figure>
      <span class="btn btn--big" aria-disabled="true">In development</span>
    </section>
  </div>
</div>

<style lang="scss">
  .stories {
    background-color: var(--color-background-stronger);
    width: 100%;

    .stories-wrapper {
      grid-column: 1 / -1;
      margin-bottom: var(--space-xl);

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        position: relative;
        min-height: 260px;

        .story {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-s);
          color: var(--color-font-base);
          font-size: var(--font-size-large-xl);
          font-weight: var(--font-font-weight-regular);
          background-color: var(--color-background-base);
          padding: var(--space-l);
          margin: var(--space-xl) var(--space-m) var(--space-xxl);
          border-radius: var(--radius-interactive-l);
          max-width: 40ch;

          .story-wrapper {
            transition: height 0.3s ease-out;
          }

          span {
            display: block;
          }

          em {
            font-weight: var(--font-font-weight-bold);
            font-style: normal;
          }

          .btn {
            border-radius: var(--radius-interactive-l);
          }

          .story-link {
            align-self: flex-end;
          }
        }
      }
    }

    .stories-nav {
      display: flex;
      gap: var(--space-m);
      margin: var(--space-xl) 0 var(--space-m) var(--space-m);

      button {
        border: none;
        background-color: var(--color-foreground-weaker);
        width: var(--space-xs);
        height: var(--space-xs);
        border-radius: 50%;
        text-indent: -999em;
        cursor: pointer;
        overflow: hidden;
        transition: transform var(--transition-duration-base) ease-out,
          background-color var(--transition-duration-base) ease-out;

        &:hover,
        &:focus {
          background-color: var(--color-foreground-base);
        }

        &.active {
          background-color: var(--color-foreground-base);
          transform: scale3d(1.3, 1.3, 1.3);
        }
      }
    }
  }

  .paths {
    margin: var(--space-l) 0;

    header {
      grid-column: 2 / -2;
      margin: var(--space-xxxl) 0;
      text-align: center;
      color: var(--color-font-base);

      h4 {
        font-size: var(--font-size-large-l);
        margin-bottom: var(--space-m);
      }

      p {
        font-size: var(--font-size-large-xl);
      }
    }

    .path {
      display: grid;
      grid-template-rows: 1fr auto auto;
      grid-gap: var(--space-xs);
      grid-column-start: span 6;
      background-color: var(--color-background-stronger);

      figure img {
        width: 80%;
      }

      .text-label {
        display: block;
        padding: var(--space-xl) 0 0 var(--space-xl);
      }

      .description {
        padding: 0 var(--space-xl) 0 var(--space-xl);
        display: block;
        font-size: var(--font-size-large-xl);
        color: var(--color-text-base);
        font-weight: var(--font-weight-extrabold);
      }

      figure {
        width: 100%;
        text-align: center;
        padding: var(--space-m);
      }

      &.disabled {
        opacity: 0.6;
      }
    }
  }
</style>
