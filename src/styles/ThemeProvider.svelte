<script>
  // import { preferredThemeId } from "$state/Responsiveness.js";
  import { interpolateLab, piecewise } from "d3-interpolate";
  import { hsl } from "d3-color";
  import { scaleOrdinal } from "d3-scale";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { get } from "lodash-es";
  import designTokens from "./theme/theme.json";

  export let id = "light";

  export let background = true;

  const themeStore = writable();
  setContext("theme", themeStore);

  $: makeTextColor = (color, factor = 0.2) => {
    const c = hsl(color);
    c.l = id === "light" ? factor : 1 - factor * 0.5;
    return c;
  };

  $: blendMode = id === "light" ? "multiply" : "screen";
  $: mapStyle =
    id === "light"
      ? "mapbox://styles/aa-kk/cl333am3j000z15mfm4pghxso"
      : "mapbox://styles/aa-kk/ckzci0iac003d14qe3vovcyvl";

  $: makeLinearScale = (a) => {
    const steps = range(0, 1.001, 1 / (a.length - 1));
    return scaleLinear().range(a).domain(steps).interpolate(interpolateLab);
  };

  $: hasContrastToBackground = (color) => {
    const c = hsl(color);
    return id === "light" ? c.l < 0.7 : c.l > 0.4;
  };

  $: {
    const colors = designTokens.color[id];
    // const colors = designTokens.color.light;

    const colorSteps = {
      sequential: [
        colors.sequential["0"],
        // colors.sequential["1"],
        // colors.sequential["2"],
        colors.sequential["3"],
      ],

      diverging: [
        colors.diverging["negative-2"],
        // colors.diverging["negative-1"],
        colors.diverging["neutral"],
        // colors.diverging["positive-1"],
        colors.diverging["positive-2"],
      ],

      categorical: [
        colors.category["0"],
        colors.category["1"],
        colors.category["2"],
        colors.category["3"],
        colors.category["4"],
      ],

      "model-aspect": [
        colors["model-aspect"]["climate"],
        colors["model-aspect"]["scope-conditions"],
        colors["model-aspect"]["conflict"],
      ],
    };

    $themeStore = {
      id: id,
      ...designTokens,
      blendMode,
      color: {
        ...colors,
        makeTextColor,
        hasContrastToBackground,
        get: (d) => get(colors, d) || d, // TODO: check if whole lodash is loaded
        steps: colorSteps,
        scales: {
          sequential: piecewise(interpolateLab, colorSteps.sequential),
          diverging: piecewise(interpolateLab, colorSteps.diverging),
          categorical: scaleOrdinal().range(colorSteps.categorical),
          "model-aspect": scaleOrdinal().range(colorSteps["model-aspect"]),
        },
      },
    };
  }
</script>

<div class:background class="theme-{id}">
  <slot />
</div>

<style>
  div {
    /* display: contents; */
  }
</style>
