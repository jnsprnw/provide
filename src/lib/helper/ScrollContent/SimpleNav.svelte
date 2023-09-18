<script>
  import { getContext } from 'svelte';
  export let sections = [];
  const { index } = getContext('scrollContent');
</script>

{#each sections as { slug, title, disabled, description }, i}
  {#if slug}
    {@const isActive = $index === i}
    <a
      class:cursor-not-allowed={disabled}
      class:opacity-50={disabled}
      class:pointer-events-none={disabled}
      href={`#${slug}`}
      class="hidden md:inline-block py-3 pl-2 pr-6 lg:pr-12 border-r-3 hover:bg-surface-weaker"
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
        class="text-contour-weak leading-tight text-sm -mb-1"
        class:text-theme-weaker={isActive}
      >
        {description}
      </div>
    </a>
  {/if}
{/each}
