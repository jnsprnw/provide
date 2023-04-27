<script>
  import NavLink from '$lib/helper/NavLink.svelte';
  import { TITLE_PROJECT, TITLE_SITE } from '$config';

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
    <div class="flex">
      <h1 class="text-theme-base font-bold uppercase tracking-widest">
        <NavLink href="/">Provide</NavLink>
      </h1>
      <span
        class="px-3 text-foreground-weakest"
        role="presentation"
        aria-hidden="true">|</span
      >
      <span class="text-foreground-weak">{TITLE_SITE}</span>
    </div>
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
