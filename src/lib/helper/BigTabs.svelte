<script>
  import NavLink from '$lib/helper/NavLink.svelte';
  export let tabs = [];
</script>

<ul class="flex gap-7">
  {#each tabs as { href, label, description, disabled }}
    <li>
      <NavLink {href} loc="location" let:isActive>
        <h2 class={`${isActive && 'text-theme-base'}`}>{label}</h2>
        <span class="subtitle">{description}</span>
      </NavLink>
    </li>
  {/each}
</ul>
