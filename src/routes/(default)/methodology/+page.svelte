<script>
  import SectionHeadline from '$lib/helper/ContentPages/SectionHeadline.svelte';
  import Model from './Model.svelte';
  import ContentPageLayout from '$lib/helper/ContentPages/ContentPageLayout.svelte';
  import { LABEL_DOCUMENTATION } from '$config';

  export let data;

  $: sections = [
    ...data.methodology.map(({ title, slug, models }) => {
      return {
        props: {
          slug,
          title,
        },
        component: SectionHeadline,
        content: true,
        sections: models.map((model) => ({
          props: model,
          component: Model,
        })),
      };
    }),
  ];
</script>

<ContentPageLayout {sections} title={LABEL_DOCUMENTATION} intro="Learn more about the methodology and the models used to create the data visualised on this dashboard." />
