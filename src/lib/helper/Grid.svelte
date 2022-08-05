<script>
  import { onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  export let style = '';
  export let debug = false;
  export let gutter = null;
  export let center = false;

  let clazz = '';
  export { clazz as class };
  export let maxWidth = false;
  export let container = false;

  export let columns = 12;
  const columnsStore = writable(columns);

  export let xs = false;
  export let sm = false;
  export let md = false;
  export let lg = false;
  export let xl = false;

  let classGeneral = '';
  let styleGeneral = '';

  let localColumns;

  const unsubscribe = columnsStore.subscribe((value) => (localColumns = value));

  $: {
    classGeneral = container ? 'grid-container' : `col ${createClassSize()}`;

    if (container) {
      styleGeneral =
        (gutter ? '--gutter:var(--space-' + gutter + ');' : '--gutter:0px;') +
        '--paddingSGR:calc(var(--gutter)/2);--marginSGR: calc(-1 * var(--gutter)/2);';
      columnsStore.update(() => columns);
    } else {
      styleGeneral = createStyleSize();

      if (xs || sm || md || lg || xl) {
        styleGeneral += `--colFlexSGR:0;`;
      } else {
        styleGeneral = `--colFlexSGR:1;`;
      }
    }
  }

  $: getValue = (breakpoint) => {
    if (breakpoint > localColumns) {
      breakpoint = localColumns;
    }

    return breakpoint ? `${(breakpoint / localColumns) * 100}%` : false;
  };

  $: createClassSize = () => {
    let newClass = 'col-xs ';

    newClass += sm ? 'col-sm ' : '';
    newClass += md ? 'col-md ' : '';
    newClass += lg ? 'col-lg ' : '';
    newClass += xl ? 'col-xl ' : '';

    return newClass;
  };

  $: createStyleSize = () => {
    let newStyle = '';

    newStyle += xs ? `--xsWidthSGR:${getValue(xs)}; ` : `--xsWidthSGR:100%; `;
    newStyle += sm ? `--smWidthSGR:${getValue(sm)}; ` : '';
    newStyle += md ? `--mdWidthSGR:${getValue(md)}; ` : '';
    newStyle += lg ? `--lgWidthSGR:${getValue(lg)}; ` : '';
    newStyle += xl ? `--xlWidthSGR:${getValue(xl)}; ` : '';

    return newStyle;
  };

  onDestroy(() => unsubscribe());
</script>

{#if maxWidth}
  <div class="max-width">
    <div
      style="{styleGeneral} {style}"
      class:debug
      class:center
      class="{classGeneral} {clazz || ''}"
    >
      <slot />
    </div>
  </div>
{:else}
  <div
    style="{styleGeneral} {style}"
    class:center
    class:debug
    class="{classGeneral} {clazz || ''}"
  >
    <slot />
  </div>
{/if}

<style lang="scss">
  @import '../../styles/theme/theme.scss';

  .debug {
    border: 1px dotted red;
    &.grid-container {
      border-color: secondary;
    }
  }

  .grid-container {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    // for IE11
    width: 100%;

    width: calc(100% + (var(--paddingSGR) * 2));
    margin: var(--marginSGR);
  }

  .center {
    place-content: center;
    place-items: center;
    display: flex;
  }

  .col {
    position: relative;
    box-sizing: border-box;
    flex-grow: var(--colFlexSGR);
    padding: var(--paddingSGR);
  }
  .col-xs {
    flex-basis: var(--xsWidthSGR);
    max-width: var(--xsWidthSGR);
  }

  @media (min-width: $size-breakpoint-sm) {
    .col-sm {
      flex-basis: var(--smWidthSGR);
      max-width: var(--smWidthSGR);
    }
  }

  @media (min-width: $size-breakpoint-md) {
    .col-md {
      flex-basis: var(--mdWidthSGR);
      max-width: var(--mdWidthSGR);
    }
  }

  @media (min-width: $size-breakpoint-lg) {
    .col-lg {
      flex-basis: var(--lgWidthSGR);
      max-width: var(--lgWidthSGR);
    }
  }

  @media (min-width: $size-breakpoint-xl) {
    .col-xl {
      max-width: var(--xlWidthSGR);
    }
  }

  .max-width {
    max-width: $size-max-content-width;
    width: 100%;
    margin: 0 auto;
  }
</style>
