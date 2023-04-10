<script>
  import { max } from 'd3-array';

  export let indicator;
  export let geography;
  export let impactTimeData;

  // function getMaxYear(hasSingleScenario, time_series, distribution) {
  //   if (hasSingleScenario && distribution?.mean?.length) {
  //     return Math.max(
  //       ...distribution.mean.map(({ year }) => {
  //         return year;
  //       })
  //     );
  //   } else if (!hasSingleScenario && time_series.length) {
  //     return Math.max(
  //       ...time_series.map(({ values }) => {
  //         return Math.max(...values.map(({ year }) => year));
  //       })
  //     );
  //   } else {
  //     return undefined;
  //   }
  // }

  // $: maxYearEnd = getMaxYear(
  //   hasSingleScenario,
  //   impactTimeData,
  //   distributionData
  // );

  $: startYear = impactTimeData[0].values[0].year;
  $: endYear = max(impactTimeData[0].values, (d) => d.year);
</script>

<h2>
  {indicator.label} in {geography.label} from {startYear} to {endYear}
</h2>
