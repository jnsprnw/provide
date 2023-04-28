<script>
  import NavLink from '$lib/helper/NavLink.svelte';
  export let tabs = [];
</script>

<ul class="flex gap-4 sm:gap-10">
  {#each tabs as { href, label, description, disabled }}
    <li class="">
      <NavLink
        {href}
        loc="location"
        let:isActive
        {disabled}
        class="flex flex-col sm:min-w-[200px] sm:max-w-min pb-3"
        activeClass="border-b-4 border-theme-base"
      >
        <span
          class:text-theme-base={isActive}
          class:font-bold={isActive}
          class="text-2xl sm:text-3xl mb-1 whitespace-nowrap"
        >
          {label}
        </span>
        <span
          class:text-theme-weaker={isActive}
          class="w-full text-foreground-weak text-sm sm:text-base">{description}</span
        >
      </NavLink>
    </li>
  {/each}
</ul>
