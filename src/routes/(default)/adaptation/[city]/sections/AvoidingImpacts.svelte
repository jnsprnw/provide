<script>
  import PillGroup from '$src/lib/controls/PillGroup/PillGroup.svelte';
  import { uniqBy } from 'lodash-es';
  import { writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import { formatValue } from '$utils/formatting';

  export let explorerUrl;
  export let description;
  export let data;

  const theme = getContext('theme');

  $: console.log($theme);

  const colorKeyMapping = {
    never: 'weaker',
    always: 'strong',
  };

  $: indicators = uniqBy(data, '[0].indicator.uid').map((d) => d[0].indicator);
  $: studyLocations = uniqBy(data, '[0].studyLocation.uid').map((d) => d[0].studyLocation);
  $: scenarios = uniqBy(data[0], 'scenario.uid').map((d) => d.scenario);
  $: likelihoods = uniqBy(data[0], 'likelihood.uid').map((d) => d.likelihood);

  $: indicator = writable(indicators[0]?.uid);
  $: studyLocation = writable(studyLocations[0]?.uid);

  $: currentData = data.find((d) => d[0].indicator.uid === $indicator && d[0].studyLocation.uid === $studyLocation);
  $: byScenario = scenarios.map((scenario, i) => {
    const scenarioData = currentData.filter((d) => scenario.uid === d.scenario.uid);
    return likelihoods
      .map((likelihood) => scenarioData.filter((d) => likelihood.uid === d.likelihood.uid))
      .map((impactLevels) =>
        impactLevels.map((impactLevel) => {
          const colorKey = colorKeyMapping[impactLevel.year.uid] || 'base';

          return {
            ...impactLevel,
            bgColor: $theme.color.category[colorKey][i],
            textColor: colorKey === 'weaker' ? $theme.color.contour.base : $theme.color.surface.base,
          };
        })
      );
  });
  $: console.log(byScenario, likelihoods);
</script>

{#if indicators.length > 1}
  <PillGroup class="mb-3" label="Indicator" size="sm" allowWrap={false} options={indicators} bind:currentUid={$indicator} />
{/if}
{#if studyLocations.length > 1}
  <PillGroup class="mb-8" label="Study location" size="sm" allowWrap={false} options={studyLocations} bind:currentUid={$studyLocation} />
{/if}

<table class="w-full mb-10 max-w-[45em]">
  <caption class="caption-bottom text-text-weaker text-sm mt-3 text-left">{description}</caption>
  <thead>
    <th class="text-xs text-text-weaker font-normal text-right px-2 max-w-12">Impact&nbsp;→<br />Probability&nbsp;↓</th>
    {#each byScenario[0][0] as col}
      <th class="text-text-weaker text-sm font-normal">{formatValue(col.impactLevel, col.indicator.unit)}</th>
    {/each}
  </thead>
  {#each byScenario as scenarioData, i}
    <tbody>
      {#each scenarioData as row}
        <tr
          ><th class="p-2 text-right text-sm font-normal text-text-weaker">{formatValue(row[0].likelihood.value, 'percent')}</th>
          {#each row as cell}
            <td class="py-3 px-3 border border-surface-base font-bold text-center text-sm" style:background={cell.bgColor} style:color={cell.textColor}>{cell.year.label}</td>
          {/each}
        </tr>
      {/each}
      <tr class="font-bold text-sm mt-1"><td colspan="100" class="text-center pt-1" class:pb-10={i < byScenario.length - 1}>{scenarioData[0][0].scenario.label}</td></tr>
    </tbody>
  {/each}
</table>
