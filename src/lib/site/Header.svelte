<script>
  import { LABEL_DOCUMENTATION, LABEL_EXPLAINERS, LABEL_CONTACT, LABEL_ABOUT, PATH_ABOUT, PATH_CONTACT, PATH_EXPLAINERS, PATH_DOCUMENTATION } from '$config';
  import NavLink from '$lib/helper/NavLink.svelte';
  import Logo from './Logo.svelte';

  const items = [
    { href: '/explore/impacts', label: 'Explore' },
    { href: `/${PATH_ABOUT}`, label: LABEL_ABOUT },
    { href: `/${PATH_DOCUMENTATION}`, label: LABEL_DOCUMENTATION },
    { href: `/${PATH_EXPLAINERS}`, label: LABEL_EXPLAINERS },
    { href: `/${PATH_CONTACT}`, label: LABEL_CONTACT },
  ];
</script>

<nav class="border-b border-contour-weakest py-7">
  <div
    class="mx-auto max-w-7xl px-6 flex justify-between gap-y-4 flex-col md:flex-row"
  >
    <NavLink href="/"><Logo /></NavLink>
    <ul class="flex flex-wrap gap-x-3 md:gap-x-4 lg:gap-x-5">
      {#each items as { label, href }}
        <NavLink
          activeClass="text-theme-base font-bold"
          class="text-contour-weak text-sm md:text-base"
          {href}>{label}</NavLink
        >
      {/each}
    </ul>
  </div>
</nav>
