<script>
  import ThemeProvider from "../styles/ThemeProvider.svelte";
  import "../styles/app.scss";
  import { page } from '$app/stores';
</script>

<ThemeProvider>
  <main>
    <nav class="page-menu">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/explore">Explore</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/methodology">Methodology</a></li>
      </ul>
    </nav>
    {#if ($page.routeId || '').startsWith('explore')}
    <nav class="explore-menu">
      <ul>
        <li><a href="/explore/impacts">Explore Impacts</a></li>
        <li><a href="/explore/scenarios">Explore Scenarios</a></li>
      </ul>
    </nav>
    {/if}
    <slot />
  </main>
</ThemeProvider>

<style lang="scss">
  @import "../styles/global.scss";

  nav ul {
    list-style: none;
  }

  .explore-menu {
    margin-top: 2rem;
  }
</style>
