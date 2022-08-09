<script context="module">
  import { parse } from 'marked';
  import { groupBy } from "lodash-es";
  import { loadFromStrapi } from './api/utils.js';

  export const load = async ({ fetch }) => {
    const data = await loadFromStrapi('faqs', fetch);
    const questions = data.map((d) => {
      const { question, answer } = d.attributes;
      return {
        question,
        answer: parse(answer),
        topic: 'Risks and warnings'
      }
    });

    const groups = Object.entries(groupBy(questions, 'topic'));

    return {
      props: {
        questions: groups
      }
    };
  }
</script>

<script>
  import Item from '$lib/faq/item.svelte';

  export let questions;
</script>

<svelte:head>
  <title>FAQ</title>
</svelte:head>

<div class="faq-header container">
  <div class="wrapper">
    <h1>FAQ</h1>
  </div>
</div>

<div class="faq-content container">
  <div class="wrapper" itemscope itemtype="https://schema.org/FAQPage">
    {#each questions as [topic, list]}
    <section class="section wrapper grid">
      <h2 class="topic">{ topic }</h2>
      {#each list as { question, answer }}
      <Item>
        <span slot="term">
          { question }
        </span>
        <p slot="description">
          { @html answer }
        </p>
      </Item>
      {/each}
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