<script>
  import ImpactTime from './ImpactTime/ImpactTime.svelte';
  import ImpactGeo from './ImpactGeo/ImpactGeo.svelte';
  import UnAvoidableRisk from './UnavoidableRisk/UnavoidableRisk.svelte';
  import MitigationBenefits from './MitigationBenefits/MitigationBenefits.svelte';
  import Reversibility from './Reversibility/Reversibility.svelte';
  import ScenarioSelection from './ScenarioSelection/ScenarioSelection.svelte';

  import { ALL_PARAMETERS_SELECTED } from '$stores/state.js';
  import ScrollContent from '$lib/site/ScrollContent.svelte';
  import Intro from './Intro.svelte';

  const sections = [
    { component: Intro },
    {
      id: 'impact-time',
      label: 'Time',
      description:
        'How will the selected indicator unfold over the coming decades?',
      component: ImpactTime,
    },
    {
      id: 'impact-geo',
      label: 'Geography',
      description:
        'Where in the selected geography will impacts hit the hardest?',
      component: ImpactGeo,
    },
    {
      id: 'unavoidable-risk',
      label: 'Avoidable vs. Unavoidable Risks',
      description: 'How much impact can be avoided through mitigation?',
      component: UnAvoidableRisk,
    },
    {
      id: 'mitigation-benefits',
      label: 'Mitigation benefits',
      disabled: true,
      description: 'How will we benefit from increased mitigation efforts?',
      component: MitigationBenefits,
    },
    {
      id: 'reversibility',
      label: 'Reversibility',
      disabled: true,
      description: 'How much damage can be reversed once it is done?',
      component: Reversibility,
    },
  ];
</script>

<svelte:head>
  <title>Explore Impacts</title>
</svelte:head>

<ScrollContent {sections}>
  <ScenarioSelection slot="before-navigation" />
</ScrollContent>
