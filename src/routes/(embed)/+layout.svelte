<script>
  import '$styles/app.postcss';
  import ThemeProvider from '$styles/ThemeProvider.svelte';
</script>

<svelte:head>
  <meta name="robots" content="none, noimageindex, noarchive" />
</svelte:head>

<ThemeProvider id="light">
  <slot />
</ThemeProvider>
