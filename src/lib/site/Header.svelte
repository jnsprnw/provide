<script>
  import {
    PATH_GLOSSARY,
    LABEL_GLOSSARY,
    LABEL_EXPLORE,
    PATH_EXPLORE,
    PATH_IMPACT,
    LABEL_DOCUMENTATION,
    LABEL_CONTACT,
    LABEL_ABOUT,
    PATH_ABOUT,
    PATH_CONTACT,
    PATH_DOCUMENTATION,
    PATH_ADAPTATION,
    LABEL_ADAPTATION,
  } from '$config';
  import NavLink from '$lib/helper/NavLink.svelte';
  import Logo from './Logo.svelte';

  const items = [
    { href: `/${PATH_EXPLORE}/${PATH_IMPACT}`, label: LABEL_EXPLORE },
    { href: `/${PATH_ADAPTATION}`, label: LABEL_ADAPTATION },
    { href: `/${PATH_DOCUMENTATION}`, label: LABEL_DOCUMENTATION },
    { href: `/${PATH_GLOSSARY}`, label: LABEL_GLOSSARY },
    { href: `/${PATH_ABOUT}`, label: LABEL_ABOUT },
    { href: `/${PATH_CONTACT}`, label: LABEL_CONTACT },
  ];
</script>

<nav class="border-b border-contour-weakest py-7">
  <div class="mx-auto max-w-7xl px-6 flex justify-between gap-y-4 flex-col lg:flex-row">
    <NavLink href="/" class="hover:text-theme-base transition-colors"><Logo /></NavLink>
    <ul class="flex flex-wrap gap-x-3 md:gap-x-4 lg:gap-x-5">
      {#each items as { label, href }}
        <NavLink
          activeClass="text-theme-base font-bold underline decoration-contour-weakest underline-offset-4"
          class="text-contour-weak hover:text-theme-base text-sm md:text-base transition-colors"
          {href}>{label}</NavLink
        >
      {/each}
    </ul>
  </div>
</nav>
