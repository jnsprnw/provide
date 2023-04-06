<script>
  export let data;

  $: ({
    modelsIntro,
    models,
    scenarios,
    scenariosIntro,
    dataProcessing,
    dataProcessingIntro,
  } = data.content);

  $: content = [
    { id: 'models', intro: modelsIntro, sections: models },
    { id: 'scenarios', intro: scenariosIntro, sections: scenarios },
    {
      id: 'data-processing',
      intro: dataProcessingIntro,
      sections: dataProcessing,
    },
  ];

  $: flatContent = content.reduce(
    (acc, item) => [...acc, item, ...(item?.sections || [])],
    []
  );
</script>

<svelte:head>
  <title>Methodology</title>
</svelte:head>

<!-- 
  <Nav let:active>
    {#each content as chapter}
        <NavItem let:isActive>
          <a href={item.slug} class="title-item" class:active>{item.label}</a>
          {#if isActive}
          {#each content as chapter}
            <NavItem let:isActive>
              <a href={item.slug} class="title-item" class:active>{item.label}</a>
            </NavItem>
          {/each}
          {/if}
        </NavItem>
    {/each}
  </Nav>
  <Content>
    
  </Content>
 -->

<!-- <div class="grid grid-cols-12 gap-14 pt-8 mx-auto max-w-7xl px-6">
  <div class="col-span-3">
    <div class="sticky top-0 flex flex-col gap-10 z-[2]">
      {#each content as { id, label, disabled, description, isActive }}
        {#if id}
          <a
            {disabled}
            href={`#${id}`}
            class="inline-block w-48 pl-3 border-l-3"
            class:border-theme-base={isActive}
            class:border-transparent={!isActive}
          >
            <div
              class="font-bold mb-1 -mt-1 leading-tight"
              class:text-theme-base={isActive}
            >
              {label}
            </div>
            <div
              class="text-foreground-weak leading-tight text-sm -mb-1"
              class:text-theme-weaker={isActive}
            >
              {description}
            </div>
          </a>
        {/if}
      {/each}
    </div>
  </div>
  <div class="col-span-9">Content</div>
</div> -->

<nav class="bg-background-weaker">
  <div class="mx-auto max-w-7xl px-6 pt-8">
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
            <h2 id="data-processing" class="headline-section">
              Data Processing
            </h2>
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
</nav>
