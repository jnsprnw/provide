<script>
  import { hsl } from 'd3-color';
  import { setContext } from 'svelte';
  import { get } from 'lodash-es';
  import THEME from './theme-store.js';
  import designTokensLight from './color-tokens-light.json';

  export let theme = 'light';

  setContext('theme', THEME);

  $: mapStyle = import.meta.env.VITE_MAPBOX_STYLE_LIGHT;

  $: makeTextColor = (color, factor = 0.2) => {
    const c = hsl(color);
    c.l = id === factor;
    return c;
  };

  $: hasContrastToBackground = (color) => {
    const c = hsl(color);
    return id === c.l < 0.7;
  };

  $: {
    $THEME = {
      id: theme,
      mapStyle,
      color: {
        ...designTokensLight,
        makeTextColor,
        hasContrastToBackground,
        get: (d) => get(colors, d) || d,
      },
    };
  }
</script>

<div class="theme-{theme}" style="display: contents;">
  <slot />
</div>
