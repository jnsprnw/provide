<script>
  export let direction;
</script>

<dl class="chart-info-facts" class:chart-info-facts--horizontal={direction === 'horizontal'}>
  <slot />
</dl>

<style lang="scss">
  .chart-info-facts {
    color: var(--color-text-weaker);
    font-size: var(--font-size-large-s);
    line-height: var(--font-line-height-tightest);
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: var(--size-spacer-large-xxxs) var(--size-spacer-large-xs);

    &.chart-info-facts--horizontal {
      grid-auto-flow: column;
      grid-template-rows: auto auto;
      grid-gap: var(--size-spacer-large-xxxs) var(--size-spacer-large-xs);
    }
  }
</style>