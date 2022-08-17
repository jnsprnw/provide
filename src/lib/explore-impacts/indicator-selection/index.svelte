<script>
  import { AVAILABLE_INDICATORS, SECTORS } from '$lib/../stores/store.js';
  import Tabs from '$lib/helper/tabs/tabs.svelte';
  import Tab from '$lib/helper/tabs/tab.svelte';
  import TabContent from '$lib/helper/tabs/tab-content.svelte';
  import Indicators from './indicators.svelte';
  import IndicatorParameters from './IndicatorParameters.svelte';

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

<div class="indicator-selection">
  <Tabs>
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
<div class="indicator-parameters"><IndicatorParameters /></div>

<style lang="scss">
  @import '../../../styles/global.scss';

  .indicator-selection {
    @include selection-panel();
    padding-bottom: var(--space-m);
  }

  .indicator-parameters {
    padding: var(--space-xs) 0;
    border-top: 1px solid var(--color-light-background-stronger); // Do we need another very light foreground color?
  }
</style>
