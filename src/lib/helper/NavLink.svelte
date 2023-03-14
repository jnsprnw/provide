<script>
  import { page } from '$app/stores';

  let clazz;
  export let href = '';
  export let loc = 'page';
  export let disabled = false;
  export { clazz as class };
  export let activeClass;

  $: active =
    $page.url.pathname === href || $page.url.pathname.startsWith(href);
  $: ariaLabel = active ? loc : null;
</script>

<a
  class={`${clazz} ${active && activeClass}`}
  {href}
  aria-current={ariaLabel}
  aria-disabled={disabled}><slot /></a
>
