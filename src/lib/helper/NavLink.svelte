<script>
  import { page } from '$app/stores';

  let clazz;
  export let href = '';
  export let loc = 'page';
  export let disabled = false;
  export { clazz as class };
  export let activeClass;

  $: isActive =
    $page.url.pathname === href || $page.url.pathname.startsWith(href);
  $: ariaLabel = isActive ? loc : null;
</script>

<a
  class={`${clazz} ${isActive && activeClass}`}
  {href}
  class:pointer-events-none={disabled}
  class:opacity-40={disabled}
  aria-current={ariaLabel}
  aria-disabled={disabled}><slot {isActive} /></a
>
