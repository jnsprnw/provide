<script>
  import NavLink from '$lib/helper/NavLink.svelte';
  import Logo from './Logo.svelte';

  const items = [
    { href: '/explore/impacts', label: 'Explore' },
    { href: '/about', label: 'About' },
    { href: '/documentation', label: 'Documentation' },
    { href: '/glossary', label: 'Glossary' },
    { href: '/contact', label: 'Contact' },
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
