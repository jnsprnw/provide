<script>
  import { AVAILABLE_INDICATORS, SECTORS } from '$lib/../stores/store.js';
  import Tabs from '$lib/helper/tabs/tabs.svelte';
  import Tab from '$lib/helper/tabs/tab.svelte';
  import TabContent from '$lib/helper/tabs/tab-content.svelte';
  import Indicators from './indicators.svelte';

  let sectorIndex = 0;

  $: sectors = $SECTORS.map((sector) => {
    const indicators = $AVAILABLE_INDICATORS.filter(
      (indicator) => indicator.sector === sector.uid
    );
    return {
      ...sector,
      disabled: indicators.length === 0,
      indicators,
    };
  });
</script>

<div class="sector-selection">
  <Tabs bind:selected={sectorIndex}>
    <span class="text-label text-label--bold">Sectors</span>
    {#each sectors as { icon, label, disabled }}
      <Tab {label} {icon} {disabled} />
    {/each}
    <svelte:fragment slot="content">
      {#each sectors as { indicators }}
        <TabContent>
          <Indicators {indicators} />
        </TabContent>
      {/each}
    </svelte:fragment>
  </Tabs>
</div>

<style lang="scss">
  @import '../../../styles/global.scss';

  .sector-selection {
    @include selection-panel();
  }
</style>
