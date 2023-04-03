<script>
  import Template from '$lib/helper/Template.svelte';

  export let title;
  export let description;
  export let templateProps;

  $: console.log(description);
</script>

<div class="chart-info">
  <h3 class="font-bold text-lg">
    <Template template={title} data={templateProps} />
  </h3>
  <p><Template template={description} data={templateProps} /></p>

  <slot />
</div>
