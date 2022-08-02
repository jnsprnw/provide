<script>
  import { LayerCake, Svg, Canvas, Html } from "layercake";
  import { timeFormat } from "d3-time-format";
  import { format, precisionFixed } from "d3-format";

  import LineLayer from "./layers/LineLayer.svelte";
  import AxisX from "./axes/AxisX.svelte";
  import AxisY from "./axes/AxisY.svelte";
  import { extent } from "d3-array";
  import ColorMatrix from "./layers/ColorMatrix.svelte";
  import { getContext } from "svelte";

  const theme = getContext("theme");

  console.log();

  export let distribution = [];
  export let mean = [];
  export let yearStep;
  export let valueStep;
  export let xKey = "year";
  export let yKey = "value";
  export let zKey = "distribution";

  const padding = { top: 0, right: 20, bottom: 20, left: 20 };

  const formatTickY = (d) => format(`.${precisionFixed(d)}f`)(d);

  $: flatData = distribution
    .reduce((acc, d) => {
      d.forEach((d) => acc.push(d));
      return acc;
    }, [])
    .filter((d) => d.distribution > 0.001);
</script>

<div class="chart-container">
  <LayerCake
    custom={{ xStep: yearStep, yStep: valueStep }}
    {padding}
    x={xKey}
    y={yKey}
    z={zKey}
    zRange={["white", $theme.color.category[0]]}
    data={mean}
    {flatData}
  >
    <Canvas>
      <ColorMatrix />
    </Canvas>
    <Svg>
      <AxisX
        gridlines={false}
        ticks={6}
        padding={{ top: 10, left: 0, right: 0 }}
      />
      <AxisY ticks={4} xTick={-3} formatTick={formatTickY} />
      <LineLayer stroke={$theme.color.background.base} strokeWidth={6} />
      <LineLayer stroke={$theme.color.category[0]} />
    </Svg>
  </LayerCake>
</div>

<style lang="scss">
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
