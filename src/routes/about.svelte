<script context="module">
  import { parse } from 'marked';
  import { loadFromAPI } from '$lib/utils.js';

  export const load = async ({ fetch }) => {
    const data = await loadFromAPI('about', fetch);
    const { Dashboard, Provide, ClimateAnalytics } = data.attributes;

    return {
      props: {
        dashboard: parse(Dashboard),
        provide: parse(Provide),
        climateAnalytics: parse(ClimateAnalytics),
      }
    };
  }
</script>

<script>
  export let dashboard;
  export let provide;
  export let climateAnalytics;
</script>

<svelte:head>
  <title>FAQ</title>
</svelte:head>

<div class="faq-header container">
  <div class="wrapper">
    <h1>About</h1>
  </div>
</div>

<div class="faq-content container">
  <div class="wrapper">
    <h2>About the Dashboard</h2>
    { @html dashboard }
    <h2>About Provide</h2>
    { @html provide }
    <h2>About Climate Analytics</h2>
    { @html climateAnalytics }
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