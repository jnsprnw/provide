<script>
  import { page } from '$app/stores';
  import ContentPageLayout from '$src/lib/helper/ContentPages/ContentPageLayout.svelte';
  import {
    LABEL_CURRENT_CONTEXT,
    LABEL_FUTURE_HEAT_STRESS,
    LABEL_FUTURE_HAZARDS,
    LABEL_FUTURE_IMPACTS,
    LABEL_LINKING_HEAT_STRESS,
    LABEL_SMART_ADAPTATION,
    LABEL_VARIATION,
    LABEL_ZOOMING_IN,
    LABEL_URBAN_ADAPTATION,
    LABEL_NEIGHBOURHOODS,
    LABEL_FURTHER_STUDIES,
    ANCHOR_CURRENT_CONTEXT,
    ANCHOR_FUTURE_HEAT_STRESS,
    ANCHOR_FUTURE_HAZARDS,
    ANCHOR_FUTURE_IMPACTS,
    ANCHOR_LINKING_HEAT_STRESS,
    ANCHOR_SMART_ADAPTATION,
    ANCHOR_VARIATION,
    ANCHOR_ZOOMING_IN,
    ANCHOR_URBAN_ADAPTATION,
    ANCHOR_NEIGHBOURHOODS,
    ANCHOR_FURTHER_STUDIES,
  } from './config.js';
  export let data;

  $: console.log(data);

  $: city = data.city;

  $: sections = [
    {
      props: { name: LABEL_CURRENT_CONTEXT, slug: ANCHOR_CURRENT_CONTEXT },
      sections: [
        { props: { name: LABEL_FUTURE_HEAT_STRESS, slug: ANCHOR_FUTURE_HEAT_STRESS } },
        { props: { name: LABEL_FUTURE_HAZARDS, slug: ANCHOR_FUTURE_HAZARDS } },
        { props: { name: LABEL_FUTURE_IMPACTS, slug: ANCHOR_FUTURE_IMPACTS } },
        { props: { name: LABEL_LINKING_HEAT_STRESS, slug: ANCHOR_LINKING_HEAT_STRESS } },
      ],
    },

    {
      props: { name: LABEL_SMART_ADAPTATION, slug: ANCHOR_SMART_ADAPTATION },
      sections: [
        { props: { name: LABEL_VARIATION, slug: ANCHOR_VARIATION } },
        { props: { name: LABEL_ZOOMING_IN, slug: ANCHOR_ZOOMING_IN } },
        { props: { name: LABEL_URBAN_ADAPTATION, slug: ANCHOR_URBAN_ADAPTATION } },
        { props: { name: LABEL_NEIGHBOURHOODS, slug: ANCHOR_NEIGHBOURHOODS } },
      ],
    },

    { props: { name: LABEL_FURTHER_STUDIES, slug: ANCHOR_FURTHER_STUDIES } },
  ];
</script>

<ContentPageLayout {sections} title="Extreme heat in {city.name}" intro="The potential and limits of adaptation via tree planting in the YYY and ZZZ neighbourhoods." />
