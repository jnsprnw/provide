<script>
  import renderTemplate from '$lib/utils/renderTemplate';

  let clazz = '';
  export { clazz as class };
  export let template = '';
  export let data = {};
  export let el = undefined;

  let renderedTemplate;

  $: try {
    renderedTemplate = renderTemplate(template, data);
  } catch (e) {
    console.error(e);
    renderedTemplate = '';
  }
</script>

{#if el}
  <svelte:element this={el} class={clazz}>{renderedTemplate}</svelte:element>
{:else}
  {renderedTemplate}
{/if}
