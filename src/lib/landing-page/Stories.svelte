<script>
  import { get } from 'lodash-es';
  import { END_IMPACT_TIME, KEY_MODEL } from '$src/config';
  import { writable } from 'svelte/store';
  import { dataPlease } from '$lib/api/new-api';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { getContext } from 'svelte';
  import LineTimeSeries from '$lib/charts/LineTimeSeries.svelte';
  import ScenarioList from '$lib/helper/chart-description/ScenarioList.svelte';

  export let stories;

  let IMPACT_TIME_DATA = writable([]);

  let currentStoryID = 0;
  let height;
  const theme = getContext('theme');

  $: currentStory = (() => {
    const story = get(stories, currentStoryID);
    story.scenarios = story.scenarios.map((scenario, i) => ({
      ...scenario,
      color: $theme.color.scenarios[i],
    }));
    return story;
  })();

  const intervalID = setInterval(nextStory, 4000);

  function nextStory() {
    const next = currentStoryID === stories.length - 1 ? 0 : currentStoryID + 1;
    changeStory(next);
  }

  function changeStory(index) {
    currentStoryID = index;
  }

  function handClick(index) {
    clearInterval(intervalID);
    changeStory(index);
  }

  $: process = ({ data }, { currentStory }) => {
    const impactTime = data.map((datum, i) => {
      const MODEL_KEY = KEY_MODEL;
      const {
        yearStart,
        yearStep,
        data,
        [MODEL_KEY]: model,
        parameters,
      } = datum.data;
      const indicatorData = data[currentStory.indicator.uid];

      return {
        color: currentStory.scenarios[i].color,
        yearStart,
        yearStep,
        parameters,
        model,
        values: indicatorData.map((values, i) => ({
          min: values[0],
          value: values[1],
          max: values[2],
          year: yearStart + yearStep * i,
        })),
      };
    });

    return { data: impactTime };
  };

  $: dataPlease(
    IMPACT_TIME_DATA,
    currentStory.scenarios.map((scenario) => ({
      endpoint: END_IMPACT_TIME,
      params: {
        geography: currentStory.geography.uid,
        indicator: currentStory.indicator.uid,
        scenario: scenario.uid,
      },
    }))
  );
</script>

<div class="stories container">
  <div class="background">
    <LoadingWrapper
      let:asyncProps={{ data }}
      let:props={{ currentStory }}
      asyncProps={{ data: $IMPACT_TIME_DATA }}
      props={{ currentStory }}
      {process}
    >
      <LineTimeSeries
        showcase={true}
        {data}
        unit={currentStory.indicator.unit}
      />
    </LoadingWrapper>
  </div>
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
                <ScenarioList scenarios={currentStory.scenarios} />?
              </span>
            {/key}
          </div>
          <a class="story-link btn" href={currentStory.url}>Explore</a>
        </li>
      </ul>
    </div>
    <div class="stories-nav">
      {#each stories as datum, i}
        <button
          on:click={() => handClick(i)}
          class:active={currentStoryID === i}>{i}</button
        >
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .stories {
    background-color: var(--color-background-stronger);
    width: 100%;
    position: relative;
  }

  .background {
    position: absolute;
    inset: 0;
  }

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
        font-size: var(--font-size-xl);
        font-weight: var(--font-font-weight-regular);
        background-color: var(--color-background-base);
        padding: var(--space-l);
        margin: var(--space-xl) var(--space-m) var(--space-xxl);
        border-radius: var(--radius-interactive-l);
        max-width: 40ch;
        // box-shadow: var(--space-xxs) var(--space-xxs) 10px
        //   var(--color-background-strongest);

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
    margin-left: var(--space-m);
    margin-bottom: var(--space-m);
    z-index: 1;

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
</style>
