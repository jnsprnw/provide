<script>
  export let data;

  $: ({
    modelsIntro,
    models,
    scenarios,
    scenariosIntro,
    dataProcessing,
    dataProcessingIntro,
  } = data);
</script>

<svelte:head>
  <title>Methodology</title>
</svelte:head>

<div class="technical-documentation-header content-header container">
  <div class="wrapper">
    <h1 class="title">Methodology</h1>
    <nav>
      <ul class="nav-inpage subcategories">
        {#if modelsIntro || models.length}
          <li>
            <a href="#models" class="nav-headline-section">Models</a>
            {#if models.length}
              <ul>
                {#each models as { slug, label }}
                  <li><a href={`#${slug}`}>{label}</a></li>
                {/each}
              </ul>
            {/if}
          </li>
        {/if}
        {#if scenariosIntro || scenarios.length}
          <li>
            <a href="#scenarios" class="nav-headline-section">Scenarios</a>
            {#if scenarios.length}
              <ul>
                {#each scenarios as { slug, label }}
                  <li><a href={`#${slug}`}>{label}</a></li>
                {/each}
              </ul>
            {/if}
          </li>
        {/if}
        {#if dataProcessingIntro || dataProcessing.length}
          <li>
            <a href="#data-processing" class="nav-headline-section"
              >Data Processing</a
            >
            {#if dataProcessing.length}
              <ul>
                {#each dataProcessing as { slug, label }}
                  <li><a href={`#${slug}`}>{label}</a></li>
                {/each}
              </ul>
            {/if}
          </li>
        {/if}
      </ul>
    </nav>
  </div>
</div>

<div class="technical-documentation-content content-content container">
  <div class="wrapper content-layout">
    {#if modelsIntro || models.length}
      <section>
        <header>
          <h2 id="models" class="headline-section">Models</h2>
        </header>
        <div class="text">
          {#if modelsIntro}{@html modelsIntro}{/if}
          {#each models as { title, description, link, slug }}
            <h3 id={slug} class="headline-paragraph">{title}</h3>
            {#if description}{@html description}{/if}
            {#if link}
              <a href={link} class="link">More information about {title}</a>
            {/if}
          {/each}
        </div>
      </section>
    {/if}
    {#if scenariosIntro || scenarios.length}
      <section>
        <header>
          <h2 id="scenarios" class="headline-section">Scenarios</h2>
        </header>
        <div class="text">
          {#if scenariosIntro}{@html scenariosIntro}{/if}
          {#each scenarios as { title, description, slug }}
            <h3 id={slug} class="headline-paragraph">{title}</h3>
            {#if description}{@html description}{/if}
          {/each}
        </div>
      </section>
    {/if}
    {#if dataProcessingIntro || dataProcessing.length}
      <section>
        <header>
          <h2 id="data-processing" class="headline-section">Data Processing</h2>
        </header>
        <div class="text">
          {#if dataProcessingIntro}{@html dataProcessingIntro}{/if}
          {#each dataProcessing as { title, description, slug }}
            <h3 id={slug} class="headline-paragraph">{title}</h3>
            {#if description}{@html description}{/if}
          {/each}
        </div>
      </section>
    {/if}
  </div>
</div>

<style lang="postcss">
  @import '../../styles/global.scss';

  .section {
    .topic {
      grid-column: 1 / span 6;
    }
  }
</style>
