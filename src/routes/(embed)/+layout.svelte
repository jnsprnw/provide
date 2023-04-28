<script>
  import '$styles/app.postcss';
  import ThemeProvider from '$styles/ThemeProvider.svelte';
</script>

<ThemeProvider id="light">
  <slot />
</ThemeProvider>