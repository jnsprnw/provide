<script>
  /** Set to `true` to check the tile */
  export let checked = false;
  /** Set to `true` to enable the light variant */
  export let light = false;
  /** Set to `true` to disable the tile */
  export let disabled = false;
  /** Specify the value of the radio input */
  export let value = "";
  /** Specify the tabindex */
  export let tabindex = "0";
  /** Specify the ARIA label for the radio tile checkmark icon */
  export let iconDescription = "Tile checkmark";
  /** Set an id for the input element */
  export let id = "ccs-" + Math.random().toString(36);
  /** Specify a name attribute for the input */
  export let name = "";
  import { getContext } from "svelte";
  import CheckmarkFilled from "$lib/helper/icons/CheckmarkFilled.svelte";
  const { add, update, selectedValue } = getContext("TileGroup");
  add({ value, checked });
  $: checked = value === $selectedValue;
</script>

<input
  type="radio"
  id="{id}"
  name="{name}"
  value="{value}"
  checked="{checked}"
  tabindex="{disabled ? undefined : tabindex}"
  disabled="{disabled}"
  class:tile-input="{true}"
  on:change
  on:change="{() => {
    if (disabled) return;
    update(value);
  }}"
  on:keydown
  on:keydown="{(e) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      update(value);
    }
  }}"
/>
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<label
  for="{id}"
  class:tile="{true}"
  class:tile--selectable="{true}"
  class:tile--is-selected="{checked}"
  class:tile--light="{light}"
  class:tile--disabled="{disabled}"
  {...$$restProps}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
>
  <span class:tile__checkmark="{true}">
    {#if checked}Y{:else}N{/if}
  </span>
  <span class:tile-content="{true}">
    <slot />
  </span>
</label>

<style lang="scss">
  @import "../../../styles/global.scss";

  .tile {
    @include tab();
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: var(--size-spacer-large-xs);
  }

  .tile-input {
    @include visually-hidden;
  }

  .tile-input:focus + .tile {
    @include tab-focus();
  }
</style>