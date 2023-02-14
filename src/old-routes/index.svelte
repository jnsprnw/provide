<script context="module">
  import { loadFromStrapi, loadMetaData } from '$lib/../routes/api/utils.js';
  import { get, find, compact, uniq } from 'lodash-es';
  import qs from 'qs';

  export const load = async ({ fetch }) => {
    const meta = await loadMetaData(fetch);
    const storiesRaw = await loadFromStrapi('stories', fetch);

    const stories = compact(
      storiesRaw.map(({ attributes }) => {
        const {
          Indicator: _indicatorUID,
          Type,
          GeographyType: _GeographyType,
          Geography: _geographyUID,
          Scenarios: scenarioUIDs,
        } = attributes;
        let geographyUID = _geographyUID.trim();
        let indicatorUID = _indicatorUID.trim();
        let geographyType = _GeographyType.trim();
        const geography = find(get(meta, [geographyType], []), {
          uid: geographyUID,
        });
        const indicator = find(get(meta, 'indicators', []), {
          uid: indicatorUID,
        });
        const scenarioList = uniq(scenarioUIDs.map(({ UID }) => UID.trim()));
        const scenarios = compact(
          scenarioList.map((uid) => find(get(meta, 'scenarios', []), { uid }))
        ).slice(0, 3);
        if (geography && indicator && scenarios.length) {
          const query = qs.stringify(
            {
              indicator: indicatorUID,
              geography: geographyUID,
              scenarios: scenarioList,
            },
            {
              encodeValuesOnly: true,
            }
          );
          return {
            geography,
            indicator,
            scenarios,
            url: `explore/${Type}?${query}`,
          };
        } else {
          return false;
        }
      })
    );

    return {
      props: {
        stories,
      },
    };
  };
</script>

<script>
  import Paths from '$lib/landing-page/Paths.svelte';
  import Stories from '$lib/landing-page/Stories.svelte';

  export let stories;
</script>

<svelte:head>
  <title>Provide Project</title>
</svelte:head>

<Stories {stories} />

<div class="paths container">
  <div class="wrapper grid">
    <Paths />
  </div>
</div>

<style lang="scss">
  .paths {
    margin: var(--space-l) 0;
  }
</style>
