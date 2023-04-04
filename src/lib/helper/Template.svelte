<script>
  import { compile, render } from 'squirrelly';

  let clazz;
  export { clazz as class };
  export let template = '';
  export let data = {};
  export let el;

  // For squirrelly every template parameter needs to be prefixed with `it.` so we do this here instead of doing it in the template everywhere
  $: processedTemplate = template.replace(/\{\{/g, '{{it.');
  $: compiledTemplate = compile(processedTemplate);

  let renderedTemplate;
  $: try {
    renderedTemplate = render(compiledTemplate, data);
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
