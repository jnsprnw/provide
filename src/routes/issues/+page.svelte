<script>
  export let data;

  $: ({ issues } = data);
</script>

<svelte:head>
  <title>Issues</title>
</svelte:head>

<div class="issues-header content-header container">
  <div class="wrapper">
    <h1 class="title">Issues</h1>
    <!-- <nav>
      <ul class="nav-inpage">
        {#each issues as { slug, title }}
        <li><a href={`#${slug}`}>{ title }</a></li>
        {/each}
      </ul>
    </nav> -->
  </div>
</div>

<div class="issues-content content-content container">
  <div class="wrapper content-layout">
    {#each issues as { slug, title, text }}
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
