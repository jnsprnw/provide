<script>
  import { page } from '$app/stores';
  import { checkCurrentLink } from '$utils/url.js';

  export let href = undefined;
  export let loc = 'page';
  export let disabled = false;
  export let activeClass = '';

  $: isActive = checkCurrentLink(href, $page);
  $: ariaLabel = isActive ? loc : null;

  $: isDisabled = href ? disabled : true;

  // role="link" -> https://www.scottohara.me/blog/2021/05/28/disabled-links.html
</script>

<a
  class={`${$$restProps.class || ''} ${isActive && activeClass}`}
  href={isDisabled ? undefined : href}
  role={disabled ? 'link' : undefined}
  class:opacity-40={isDisabled}
  class:cursor-not-allowed={isDisabled}
  aria-current={ariaLabel}
  aria-disabled={isDisabled}><slot {isActive} /></a
>
