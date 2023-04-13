<script>
  import ImpactTime from './ImpactTime/ImpactTime.svelte';
  import ImpactGeo from './ImpactGeo/ImpactGeo.svelte';
  import UnAvoidableRisk from './UnavoidableRisk/UnavoidableRisk.svelte';
  import ScenarioSelection from './ScenarioSelection/ScenarioSelection.svelte';

  import { ALL_PARAMETERS_SELECTED } from '$stores/state.js';
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
    // {
    //   slug: 'mitigation-benefits',
    //   title: 'Mitigation benefits',
    //   disabled: true,
    //   description: 'How will we benefit from increased mitigation efforts?',
    //   component: MitigationBenefits,
    // },
    // {
    //   slug: 'reversibility',
    //   title: 'Reversibility',
    //   disabled: true,
    //   description: 'How much damage can be reversed once it is done?',
    //   component: Reversibility,
    // },
  ];
</script>

<svelte:head>
  <title>Explore Impacts</title>
</svelte:head>

<ScrollContent {sections}>
  <div slot="navigation" class="flex flex-col gap-10" let:index>
    <ScenarioSelection />
    <SimpleNav {sections} {index} />
  </div>
</ScrollContent>
