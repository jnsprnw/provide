<script>
  import ThemeProvider from "../styles/ThemeProvider.svelte";
  import "../styles/app.scss";
</script>

<ThemeProvider>
  <main>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/explore">Explore</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/methodology">Methodology</a></li>
      </ul>
    </nav>
    <slot />
  </main>
</ThemeProvider>

<style lang="scss">
  @import "../styles/global.scss";

  nav ul {
    list-style: none;
  }
</style>
