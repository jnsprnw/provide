<script>
  import { getContext } from 'svelte';
  export let sections = [];
  const { index } = getContext('scrollContent');
  // role="link" -> https://www.scottohara.me/blog/2021/05/28/disabled-links.html
</script>

{#each sections.filter(({ slug }) => slug) as { slug, title, description, disabled }, i}
  {@const isActive = $index === i}
  <a
    class:cursor-not-allowed={disabled}
    class:opacity-50={disabled}
    class:pointer-events-none={disabled}
    role={disabled ? 'link' : undefined}
    href={disabled ? undefined : `#${slug}`}
    class="hidden md:inline-block py-3 pl-2 pr-6 lg:pr-12 border-r-3 hover:bg-surface-weaker"
    class:border-theme-base={isActive}
    class:border-transparent={!isActive}
    aria-current={isActive ? 'step' : 'false'}
  >
    <div class="font-bold mb-1 -mt-1 leading-tight" class:text-theme-base={isActive && !disabled}>
      {title}
    </div>
    <div class="text-contour-weak leading-tight text-sm -mb-1" class:text-theme-weaker={isActive && !disabled}>
      {description}
    </div>
  </a>
{/each}
