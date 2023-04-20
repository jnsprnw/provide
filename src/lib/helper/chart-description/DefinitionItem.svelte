<script>
  export let term;
  export let definition;
  export let href;
</script>

<div class="text-xs text-foreground-weak flex gap-1">
  <dt class="font-bold text-foreground-base">{term}</dt>
  {#if href}
    <dd>
      <a {href} target="_blank" rel="noreferrer" class="text-theme-base"
        >{definition}</a
      >
    </dd>
  {:else}
    <dd>{definition}</dd>
  {/if}
</div>
