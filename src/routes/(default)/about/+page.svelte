<script>
  export let data;

  $: ({ sections } = data);
</script>

<div class="about-header content-header container">
  <div class="wrapper">
    <h1 class="title">About</h1>
    <nav>
      <ul class="nav-inpage">
        {#each sections as { slug, title }}
          <li><a href={`#${slug}`}>{title}</a></li>
        {/each}
      </ul>
    </nav>
  </div>
</div>

<div class="about-content content-content container">
  <div class="wrapper content-layout">
    {#each sections as { slug, title, text }}
      <section>
        <header>
          <h2 id={slug} class="headline-section">{title}</h2>
        </header>
        <div class="text">
          {@html text}
        </div>
      </section>
    {/each}
  </div>
</div>

<style lang="postcss">
  .section {
    .topic {
      grid-column: 1 / span 6;
    }
  }
</style>
