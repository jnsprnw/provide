<script>
  import { getContext } from 'svelte';

  export let icon = '';
  export let loc = 'step';
  export let label = '';
  export let disabled = false;
  export let tabindex = '0';
  export let id = 'ccs-' + Math.random().toString(36);
  export let ref = null;
  const { selectedTab, add, update, change, type, format } = getContext('Tabs');
  add({ id, label, disabled });
  $: selected = $selectedTab === id;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<li
  tabindex="-1"
  role="presentation"
  class:tab={true}
  class={`tab-type-${type}`}
  class:tab--compact={format === 'compact'}
  aria-selected={selected}
  aria-disabled={disabled}
  aria-current={selected ? loc : 'false'}
  title={disabled ? 'Not yet available' : label}
  class:active={selected}
  {...$$restProps}
  on:click|preventDefault={() => {
    if (!disabled) {
      update(id);
    }
  }}
  on:keydown={({ key }) => {
    if (!disabled) {
      if (key === 'ArrowRight' || key === 'ArrowBottom') {
        change(1);
      } else if (key === 'ArrowLeft' || key === 'ArrowTop') {
        change(-1);
      } else if (key === ' ' || key === 'Enter') {
        update(id);
      }
    }
  }}
>
  <div
    bind:this={ref}
    role="tab"
    tabindex={disabled ? '-1' : tabindex}
    aria-selected={selected}
    aria-disabled={disabled}
    {id}
    class:link={true}
  >
    {#if icon}<i class="emoji">{icon}</i>{/if}
    <span class="title">{label}</span>
  </div>
</li>

<style lang="postcss">
  @import '../../../styles/global.scss';

  .tab {
    &.tab-type-list {
      .link {
        display: flex;
        padding: 0;
        flex-direction: row;
        align-items: center;
        gap: var(--space-xs);
        min-width: 170px;

        @include tab();
      }
    }

    &.tab-type-nav {
      @include tab-nav-tab();
    }
  }
</style>
