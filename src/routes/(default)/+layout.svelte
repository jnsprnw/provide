<script>
  import '$styles/app.postcss';
  import 'tippy.js/dist/svg-arrow.css';
  import ThemeProvider from '$styles/ThemeProvider.svelte';
  import Header from '$lib/site/Header.svelte';
  import HtmlHead from '$lib/site/HtmlHead.svelte';
  import Footer from '$lib/site/Footer.svelte';
  import _ from 'lodash-es';
  import { CURRENT_PAGE } from '$stores/state';
  import { page } from '$app/stores';

  page.subscribe((v) => {
    const path = v.url.pathname.split('/');
    CURRENT_PAGE.set(path[path.length - 1]); // /explore/avoid -> avoid
  });

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\{=(.+?)\}\}/g,
  };
</script>

<HtmlHead />

<ThemeProvider id="light">
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</ThemeProvider>
