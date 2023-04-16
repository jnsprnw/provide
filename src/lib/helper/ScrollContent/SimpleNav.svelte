<script>
  import { getContext } from 'svelte';
  export let sections = [];
  const { index } = getContext('scrollContent');

  $: console.log($index)
</script>

{#each sections as { slug, title, disabled, description }, i}
  {#if slug}
    {@const isActive = $index === i}
    <a
      {disabled}
      href={`#${slug}`}
      class="inline-block w-48 pl-3 border-l-3"
      class:border-theme-base={isActive}
      class:border-transparent={!isActive}
      aria-current={isActive ? 'step' : 'false'}
    >
      <div
        class="font-bold mb-1 -mt-1 leading-tight"
        class:text-theme-base={isActive}
      >
        {title}
      </div>
      <div
        class="text-foreground-weak leading-tight text-sm -mb-1"
        class:text-theme-weaker={isActive}
      >
        {description}
      </div>
    </a>
  {/if}
{/each}
