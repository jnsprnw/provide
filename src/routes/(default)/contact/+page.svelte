<script>
  import HtmlContent from '$lib/helper/HtmlContent.svelte';
  import { LABEL_CONTACT } from '$config';
  import PageIntro from '$lib/site/PageIntro.svelte';
  export let data;

  $: ({ text } = data);
</script>

<PageIntro isCompact={true}>
  <div class="flex flex-col gap-y-3.5">
    <h1 class="text-4xl font-bold">{LABEL_CONTACT}</h1>
    <p class="max-w-xl">Did you spot a bug or want to collaborate? We are always happy to hear from you.</p>
  </div>
</PageIntro>

<div class="grid grid-rows-[auto_auto] grid-cols-1 mx-auto max-w-4xl px-6 my-12">
  <HtmlContent content={text} />
</div>
