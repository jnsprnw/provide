<script>
  export let data;

  $: ({ text } = data);
</script>

<svelte:head>
  <title>Contact</title>
</svelte:head>

<div class="contact-header content-header container">
  <div class="wrapper">
    <h1 class="title">Contact</h1>
  </div>
</div>

<div class="contact-content content-content container">
  <div class="wrapper content-layout">
    <section>
      <div class="text">
        {@html text}
      </div>
    </section>
  </div>
</div>

<style lang="scss">
  .contact-content {
    .btn {
      margin-top: var(--space-s);
    }
  }
</style>
