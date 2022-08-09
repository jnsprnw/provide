<script context="module">
  import { loadFromStrapi, loadFromAPI } from '$lib/../routes/api/utils.js';
  import { get, find, compact } from 'lodash-es';
  import qs from "qs";

  export const load = async ({ fetch }) => {
    const meta = await loadFromAPI(`/api/meta/`, '', fetch);
    const stories = await loadFromStrapi('stories', fetch);

    const datum = compact(stories.map(({ attributes }) => {
      // TODO: Add geography type and change name from country to geography
      const { indicator: indicatorUID, type, country: geographyUID, scenario: scenarioUID } = attributes;
      const geography = find(get(meta, ['admin0'], []), { uid: geographyUID });
      const indicator = find(get(meta, 'indicators', []), { uid: indicatorUID });
      const scenario = find(get(meta, 'scenarios', []), { uid: scenarioUID });
      if (geography && indicator && scenario) {
        const query = qs.stringify(
          {
            indicator: indicatorUID,
            geography: geographyUID,
            scenario: scenarioUID
          },
          {
            encodeValuesOnly: true,
          }
        );
        return {
          geography,
          indicator,
          scenario,
          url: `explore/${type}?${query}`
        }
      } else {
        return false;
      }
    }))

    return {
      props: {
        data: datum
      }
    };
  }
</script>

<script>
  export let data;
</script>

<svelte:head>
  <title>Provide Project</title>
</svelte:head>

<ul>
  {#each data as datum}
  <li><a href={datum.url}>How will <strong>{datum.indicator.label}</strong> in <strong>{datum.geography.label}</strong> develop under a <strong>{datum.scenario.label}</strong>?</a></li>
  {/each}
</ul>
