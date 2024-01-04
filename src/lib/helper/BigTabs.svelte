<script>
  import NavLink from '$lib/helper/NavLink.svelte';
  import tooltip from '$lib/utils/tooltip';
  export let tabs = [];
</script>

<ul class="flex gap-4 sm:gap-10 border-b border-theme-weaker">
  {#each tabs as { href, label, description, disabled, tooltip: content }}
    <li use:tooltip={{ content }}>
      <NavLink
        {href}
        loc="location"
        let:isActive
        {disabled}
        class="flex flex-col h-full sm:min-w-[200px] sm:max-w-min pb-3 border-b-4 border-transparent transition-colors"
        activeClass="border-b-theme-base"
      >
        <span class:text-theme-base={isActive} class="font-bold text-2xl sm:text-3xl mb-1 whitespace-nowrap">
          {label}
        </span>
        <span class:text-theme-base={isActive} class="w-full text-contour-weak text-sm sm:text-base">{description}</span>
      </NavLink>
    </li>
  {/each}
</ul>
