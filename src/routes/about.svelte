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

<div class="about-header content-header container">
  <div class="wrapper">
    <h1 class="title">About</h1>
    <nav>
      <ul class="nav-inpage">
        <li><a href="#dashboard">About the dashboard</a></li>
        <li><a href="#provide">About provide</a></li>
        <li><a href="#climate-analytics">About Climate Analytics</a></li>
      </ul>
    </nav>
  </div>
</div>

<div class="about-content content-content container">
  <div class="wrapper content-layout">
    <section>
      <header>
        <h2 id="dashboard" class="headline-section">About the Dashboard</h2>
      </header>
      <div>
        { @html dashboard }
      </div>
    </section>
    <section>
      <h2 id="provide" class="headline-section">About Provide</h2>
      <div>
        { @html provide }
      </div>
    </section>
    <section>
      <h2 id="climate-analytics" class="headline-section">About Climate Analytics</h2>
      <div>
        { @html climateAnalytics }
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