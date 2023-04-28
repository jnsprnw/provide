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

<nav class="border-b border-foreground-weakest py-7">
  <div class="mx-auto max-w-7xl px-6 flex justify-between">
    <NavLink href="/"><Logo /></NavLink>
    <ul class="flex gap-x-5">
      {#each items as { label, href }}
        <NavLink
          activeClass="text-theme-base font-bold"
          class="text-foreground-weak"
          {href}>{label}</NavLink
        >
      {/each}
    </ul>
  </div>
</nav>
