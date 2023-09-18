<script>
  // import { browser } from '$app/environment';
  import { scaleOrdinal } from 'd3-scale';
  import { interpolateLab, piecewise } from 'd3-interpolate';
  import { hsl } from 'd3-color';
  import { setContext } from 'svelte';
  import { get } from 'lodash-es';
  import THEME from './theme-store.js';
  import designTokensLight from './theme/color-tokens-light.json';
  // import designTokensDark from './theme/json/theme-dark.json';

  export let id = 'light';

  setContext('theme', THEME);

  $: mapStyle = import.meta.env.VITE_MAPBOX_STYLE_LIGHT;
  // $: mapStyle =
  //   id === 'light'
  //     ? import.meta.env.VITE_MAPBOX_STYLE_LIGHT
  //     : import.meta.env.VITE_MAPBOX_STYLE_LIGHT;

  $: makeTextColor = (color, factor = 0.2) => {
    const c = hsl(color);
    c.l = id === factor; // 'light' ? factor : 1 - factor * 0.5;
    return c;
  };

  $: hasContrastToBackground = (color) => {
    const c = hsl(color);
    return id === c.l < 0.7; // 'light' ? c.l < 0.7 : c.l > 0.4;
  };

  // $: getContrastColor = (background, color1, color2) => {
  //   const c1 = hsl(color).l;
  //   const c2 = hsl(color).l;
  //   const b = hsl(background).l;
  //   return b - c1 > b - c2 ? color1 : color2;
  // };

  // $: {
  //   if (!id) {
  //     if (browser) {
  //       id = window.matchMedia('(prefers-color-scheme: dark)').matches
  //         ? 'dark'
  //         : 'light';
  //     } else {
  //       id = 'light';
  //     }
  //   }
  // }

  $: {
    const colors = designTokensLight.color;

    $THEME = {
      id: id,
      ...designTokens,
      mapStyle,
      color: {
        ...colors,
        makeTextColor,
        hasContrastToBackground,
        get: (d) => get(colors, d) || d,
      },
    };
  }
</script>

<div class="theme-{id}" style="display: contents;">
  <slot />
</div>
