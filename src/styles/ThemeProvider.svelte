<script>
  import { browser } from '$app/environment';
  // import { preferredThemeId } from "$state/Responsiveness.js";
  import { interpolateLab, piecewise, scaleOrdinal, hsl } from 'd3';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { get } from 'lodash-es';
  import designTokens from './theme/json/global.json';
  import designTokensLight from './theme/json/theme-light.json';
  import designTokensDark from './theme/json/theme-dark.json';

  export let id;

  const themeStore = writable();
  setContext('theme', themeStore);

  $: mapStyle =
    id === 'light'
      ? 'mapbox://styles/flaviogortana/cl441r0ed007014pl9ap5a52a'
      : 'mapbox://styles/flaviogortana/cl441r0ed007014pl9ap5a52a';

  $: makeTextColor = (color, factor = 0.2) => {
    const c = hsl(color);
    c.l = id === 'light' ? factor : 1 - factor * 0.5;
    return c;
  };

  $: hasContrastToBackground = (color) => {
    const c = hsl(color);
    return id === 'light' ? c.l < 0.7 : c.l > 0.4;
  };

  $: {
    if (!id) {
      if (browser) {
        id = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      } else {
        id = 'light';
      }
    }
  }

  $: {
    const colors = {
      light: designTokensLight,
      dark: designTokensDark,
    }[id].color;

    // console.log(colors);

    const colorSteps = {
      sequential: [
        colors.sequential['0'],
        colors.sequential['1'],
        colors.sequential['2'],
        colors.sequential['3'],
      ],

      diverging: [
        colors.diverging.negative['2'],
        colors.diverging.negative['1'],
        colors.diverging.neutral,
        colors.diverging.positive['1'],
        colors.diverging.positive['2'],
      ],

      categorical: [
        colors.category.base['0'],
        colors.category.base['1'],
        colors.category.base['2'],
        colors.category.base['3'],
        colors.category.base['4'],
        colors.category.base['5'],
      ],

      'categorical-stronger': [
        colors.category.stronger['0'],
        colors.category.stronger['1'],
        colors.category.stronger['2'],
        colors.category.stronger['3'],
        colors.category.stronger['4'],
        colors.category.stronger['5'],
      ],

      'categorical-weaker': [
        colors.category.weaker['0'],
        colors.category.weaker['1'],
        colors.category.weaker['2'],
        colors.category.weaker['3'],
        colors.category.weaker['4'],
        colors.category.stronger['5'],
      ],
    };

    $themeStore = {
      id: id,
      ...designTokens,
      mapStyle,
      color: {
        ...colors,
        makeTextColor,
        hasContrastToBackground,
        steps: colorSteps,
        get: (d) => get(colors, d) || d,
        scales: {
          sequential: piecewise(interpolateLab, colorSteps.sequential),
          diverging: piecewise(interpolateLab, colorSteps.diverging),
          categorical: scaleOrdinal().range(colorSteps.categorical),
          'categorical-stronger': scaleOrdinal().range(
            colorSteps['categorical-stronger']
          ),
          'categorical-weaker': scaleOrdinal().range(
            colorSteps['categorical-weaker']
          ),
        },
      },
    };
  }
</script>

<div
  class="theme-{id}"
  style="
    display: contents;
  "
>
  <slot />
</div>

<style>
</style>
