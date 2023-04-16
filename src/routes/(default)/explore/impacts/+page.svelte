<script>
  import ImpactTime from './ImpactTime/ImpactTime.svelte';
  import ImpactGeo from './ImpactGeo/ImpactGeo.svelte';
  import UnAvoidableRisk from './UnavoidableRisk/UnavoidableRisk.svelte';
  import ScenarioSelection from './ScenarioSelection/ScenarioSelection.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import SimpleNav from '$lib/helper/ScrollContent/SimpleNav.svelte';
  import Intro from './Intro.svelte';

  const sections = [
    { component: Intro },
    {
      slug: 'impact-time',
      title: 'Time',
      description:
        'How will the selected indicator unfold over the coming decades?',
      component: ImpactTime,
    },
    {
      slug: 'impact-geo',
      title: 'Geography',
      description:
        'Where in the selected geography will impacts hit the hardest?',
      component: ImpactGeo,
    },
    {
      slug: 'unavoidable-risk',
      title: 'Avoidable vs. Unavoidable Risks',
      description: 'How much impact can be avoided through mitigation?',
      component: UnAvoidableRisk,
    },
  ];
</script>

<svelte:head>
  <title>Explore Impacts</title>
</svelte:head>

<ScrollContent let:query>
  <nav slot="navigation" class="flex flex-col gap-10 pr-10">
    <ScenarioSelection />
    <SimpleNav {sections} />
  </nav>
  {#each sections as section}
    {#if !section.disabled}
      <section
        id={section.slug}
        name={section.slug}
        class="scroll-mt-4 mb-16 {query}"
      >
        <svelte:component this={section.component} {...section} />
      </section>
    {/if}
  {/each}
</ScrollContent>
