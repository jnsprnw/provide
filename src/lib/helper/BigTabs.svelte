<script>
  import NavLink from '$lib/helper/NavLink.svelte';
  export let tabs = [];
</script>

<ul class="flex gap-10">
  {#each tabs as { href, label, description, disabled }}
    <li class="">
      <NavLink
        {href}
        loc="location"
        let:isActive
        class="flex flex-col min-w-[200px] max-w-min pb-3"
        activeClass="border-b-4 border-theme-base"
      >
        <span
          class:text-theme-base={isActive}
          class:font-bold={isActive}
          class="text-3xl mb-1 whitespace-nowrap"
        >
          {label}
        </span>
        <span
          class:text-theme-weaker={isActive}
          class="w-full text-foreground-weak">{description}</span
        >
      </NavLink>
    </li>
  {/each}
</ul>
