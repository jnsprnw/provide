<script>
  import SectionHeadline from '$lib/helper/ContentPages/SectionHeadline.svelte';
  import Model from './Model.svelte';
  import ContentPageLayout from '$lib/helper/ContentPages/ContentPageLayout.svelte';
  import { LABEL_DOCUMENTATION } from '$config';

  export let data;

  $: sections = [
    ...data.methodology.map(({ title, slug, models, simulation, processing }) => {
      return {
        props: {
          slug,
          title,
        },
        component: SectionHeadline,
        content: true,
        sections: [
          {
            component: Model,
            props: {
              slug: `${slug}-models`,
              title: models.length > 1 ? 'Models' : 'Model',
              content: models,
            },
          },
          {
            component: Model,
            props: {
              slug: `${slug}-simulation`,
              title: simulation.length > 1 ? 'Model simulations' : 'Model simulation',
              content: simulation,
            },
          },
          {
            component: Model,
            props: {
              slug: `${slug}-processing`,
              title: 'Data processing',
              content: processing,
            },
          },
        ],
      };
    }),
  ];
  $: console.log({ sections });
</script>

<ContentPageLayout {sections} title={LABEL_DOCUMENTATION} intro="Learn more about the methodology and the models used to create the data visualised on this dashboard." />
