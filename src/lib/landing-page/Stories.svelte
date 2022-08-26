<script>
  import { formatObjArr } from '$lib/utils.js';

  import { get } from 'lodash-es';
  import { END_IMPACT_TIME } from '$lib/../config';
  import { writable } from 'svelte/store';
  import { dataPlease } from '$lib/api/new-api';

  export let stories;

  let IMPACT_TIME_DATA = writable([]);

  let currentStoryID = 0;
  let height;

  $: currentStory = get(stories, currentStoryID);

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
            {#each formatObjArr(currentStory.scenarios, 'label') as { type, value }}
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
  {#each stories as datum, i}
    <button on:click={() => handClick(i)} class:active={currentStoryID === i}
      >{i}</button
    >
  {/each}
</div>

<style lang="scss">
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
</style>
