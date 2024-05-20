<script>
  import { Switch } from '@rgossiaux/svelte-headlessui';

  export let value = false;
  export let label;
</script>

<div class="flex items-center gap-2">
  <span class="text-sm text-text-weaker">{label}</span>
  <Switch bind:checked={value} class={`switch ${value ? 'bg-theme-base border-theme-base' : 'bg-surface-weaker border-contour-weaker'} border `}>
    <span class="toggle" class:bg-contour-weaker={!value} class:bg-surface-base={value} class:toggle-on={value} class:toggle-off={!value} />
  </Switch>
</div>

<style>
  :global(.switch) {
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    height: 1.5rem;
    width: 2.75rem;
  }

  .toggle {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    transition: all 0.2s;
  }

  .toggle-on {
    transform: translateX(1.4rem);
  }

  .toggle-off {
    transform: translateX(0.25rem);
  }
</style>
