<script>
  import ModelSection from './ModelSection.svelte';
  import ScenarioSection from './BaseSection.svelte';
  import SectionIntro from './SectionIntro.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';

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
    {
      slug: 'models',
      title: 'Models',
      component: SectionIntro,
      content: modelsIntro,
      sections: models.map((m) => ({ ...m, component: ModelSection })),
    },
    {
      slug: 'scenarios',
      title: 'Scenarios',
      component: SectionIntro,
      content: scenariosIntro,
      sections: scenarios.map((s) => ({ ...s, component: ScenarioSection })),
    },
    {
      slug: 'data-processing',
      title: 'Data processing',
      component: SectionIntro,
      content: dataProcessingIntro,
      sections: dataProcessing,
    },
  ];

  $: flatContent = content.reduce(
    (acc, item) => [...acc, item, ...item.sections],
    []
  );

  $: console.log(flatContent);

  const query = 'waypoint';
</script>

<svelte:head>
  <title>Methodology</title>
</svelte:head>

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
</nav>
<ScrollContent query={`.${query}`}>
  {#each flatContent as section}
    <svelte:component this={section.component} {query} {...section} />
  {/each}
</ScrollContent>
