<script>
  import { LayerCake, Svg, Html } from "layercake";
  import { timeFormat } from "d3-time-format";
  import { format, precisionFixed } from "d3-format";

  import LineLayer from "./layers/LineLayer.svelte";
  import AxisX from "./axes/AxisX.svelte";
  import AxisY from "./axes/AxisY.svelte";
  import { extent } from "d3-array";

  export let distribution = [];
  export let mean = [];
  export let xKey = "year";
  export let yKey = "value";
  export let zKey = "z";

  const padding = { top: 0, right: 20, bottom: 20, left: 20 };

  const formatTickX = timeFormat("%Y");
  const formatTickY = (d) => format(`.${precisionFixed(d)}f`)(d);

  $: flatDistribution = distribution.reduce((acc, d) => {
    d.forEach((d) => acc.push(d));
    return acc;
  }, []);

  $: flatData = [...flatDistribution, ...mean];
  $: xDomain = extent(flatData, (d) => d[xKey]);
  $: yDomain = extent(flatData, (d) => d[yKey]);
</script>

<div class="chart-container">
  <LayerCake
    {padding}
    {xDomain}
    {yDomain}
    x={xKey}
    y={yKey}
    z={zKey}
    data={mean}
  >
    <Svg>
      <AxisX
        gridlines={false}
        ticks={6}
        formatTick={formatTickX}
        padding={{ top: 10, left: 0, right: 0 }}
      />
      <AxisY ticks={4} xTick={-3} formatTick={formatTickY} />
      <LineLayer />
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
