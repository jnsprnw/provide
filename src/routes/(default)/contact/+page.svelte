<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  import { LABEL_CONTACT } from '$config';
  import ContentPageIntro from '$lib/helper/ContentPages/ContentPageIntro.svelte';
  export let data;

  $: ({ text } = data);
</script>

<ContentPageIntro isCompact={true} title={LABEL_CONTACT} intro="Did you spot a bug or want to collaborate? We are always happy to hear from you." />

<div class="grid grid-rows-[auto_auto] grid-cols-1 mx-auto max-w-4xl px-6 my-12">
  <HtmlContent content={text} />
</div>
