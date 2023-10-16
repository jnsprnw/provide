<script>
  import { page } from '$app/stores';

  let clazz;
  export let href = undefined;
  export let loc = 'page';
  export let disabled = false;
  export { clazz as class };
  export let activeClass;

  $: isActive = $page.url.pathname === href || $page.url.pathname.startsWith(href);
  $: ariaLabel = isActive ? loc : null;

  $: isDisabled = href ? disabled : true;

  // role="link" -> https://www.scottohara.me/blog/2021/05/28/disabled-links.html
</script>

<a
  class={`${clazz} ${isActive && activeClass}`}
  href={isDisabled ? undefined : href}
  role="link"
  class:opacity-40={isDisabled}
  class:cursor-not-allowed={isDisabled}
  aria-current={ariaLabel}
  aria-disabled={isDisabled}><slot {isActive} /></a
>
