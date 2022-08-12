<script>
	export let indicator;
	export let geography;
	export let hasSingleScenario;
	export let impactTimeData;
	export let distributionData;

	function getMaxYear (hasSingleScenario, time_series, distribution) {
    if (hasSingleScenario && distribution?.mean?.length) {
      return Math.max(...distribution.mean.map(({ year }) => {
        return year;
      }))
    } else if (!hasSingleScenario && time_series.length) {
      return Math.max(...time_series.map(({ values }) => {
        return Math.max(...values.map(({ year }) => year))
      }))
    } else {
      return undefined;
    }
  }

	$: maxYearEnd = getMaxYear(hasSingleScenario, impactTimeData, distributionData);
</script>

<h2>
  {indicator.label} in {geography.label} {#if maxYearEnd}until { maxYearEnd }{/if}
</h2>
