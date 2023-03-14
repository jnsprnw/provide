<script>
  import NavLink from '$lib/helper/NavLink.svelte';
</script>

<nav class="border-b border-foreground-weak py-5">
  <div class="mx-auto grid max-w-6xl grid-flow-col px-6">
    <div class="flex">
      <h1 class="text-theme-base font-bold uppercase tracking-widest">
        <NavLink href="/">Provide</NavLink>
      </h1>
      <span class="px-3 text-foreground-weakest">|</span>
      <span class="text-foreground-weaker">Climate Risk Dashboard</span>
    </div>
    <ul class="menu-main">
      <NavLink href="/explore/impacts">Explore</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/methodology">Methodology</NavLink>
      <NavLink href="/glossary">Glossary</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </ul>
  </div>
</nav>
