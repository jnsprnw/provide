<script>
  export let warningBackground = true;
  export let warningSizeSmall = false;
  export let warningSign = false;
  export let headline;
</script>

<div
  class="text-center py-36 px-2 flex flex-col gap-y-2 border-surface-weakest rounded-sm"
  class:bg-surface-weaker={warningBackground}
  class:border={warningBackground}
  class:py-8={warningSizeSmall}
  role="alert"
>
  <span
    class="text-lg font-bold leading-tight"
    class:text-base={warningSizeSmall}
    >{#if warningSign}⚠️
    {/if}{headline}</span
  >
  <div
    class="flex-col text-sm"
    class:flex={!warningSizeSmall}
    class:text-xs={warningSizeSmall}
  >
    <slot />
  </div>
</div>
