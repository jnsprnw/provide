<script>
  export let term;
  export let definition;
  export let href = undefined;
</script>

<div class="text-xs text-contour-weak flex gap-1">
  <dt class="font-bold text-contour-base">{term}</dt>
  {#if href}
    <dd>
      <a
        {href}
        target="_blank"
        rel="noreferrer external"
        class="text-theme-base">{definition}</a
      >
    </dd>
  {:else}
    <dd>{definition}</dd>
  {/if}
</div>
