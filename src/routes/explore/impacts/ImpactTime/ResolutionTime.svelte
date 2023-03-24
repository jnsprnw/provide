<script>
  import { uniq, isArray } from 'lodash-es';

  export let hasSingleScenario;
  export let impactTimeData;
  export let distributionData;

  function getSteps(hasSingleScenario, time_series, distribution) {
    if (hasSingleScenario && distribution?.mean?.length) {
      return distribution.yearStep;
    } else if (!hasSingleScenario && time_series.length) {
      return uniq(time_series.map(({ yearStep }) => yearStep));
    } else {
      return undefined;
    }
  }

  function formatYearLabel(year) {
    return `${year} ${year === 1 ? 'year' : 'years'}`;
  }

  const formatter = new Intl.ListFormat('en-GB', {
    style: 'long',
    type: 'conjunction',
  });

  function formatStepsLabel(steps) {
    if (!steps) {
      return undefined;
    } else if (isArray(steps)) {
      return formatter.format(steps.map((year) => formatYearLabel(year)));
    } else {
      return formatYearLabel(steps);
    }
  }

  $: steps = formatStepsLabel(
    getSteps(hasSingleScenario, impactTimeData, distributionData)
  );
</script>

<dt>Data time increments:</dt>
<dd>{impactTimeData[0].yearStep} years</dd>
