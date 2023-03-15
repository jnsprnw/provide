<script>
  import '$styles/app.postcss';
  import ThemeProvider from '$styles/ThemeProvider.svelte';
  import Header from '$lib/site/Header.svelte';
  import HtmlHead from '$lib/site/HtmlHead.svelte';
  import Footer from '$lib/site/Footer.svelte';
</script>

<HtmlHead />

<ThemeProvider>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</ThemeProvider>
