<script>
  import { LABEL_ABOUT } from '$config';
  import SectionDefault from '$lib/helper/ContentPages/SectionDefault.svelte';
  import ContentPageLayout from '$lib/helper/ContentPages/ContentPageLayout.svelte';
  export let data;

  $: sections = data.content.map((s) => ({ component: SectionDefault, props: s, content: true }));
</script>

<ContentPageLayout {sections} title={LABEL_ABOUT} />
