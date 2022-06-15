<script>
	export let link = '';
	export let currentPath = '';
	export let loc = 'page';
	export let startsWith = false;
	export let disabled = false;

	$: isCurrent = startsWith && currentPath.startsWith(link) || currentPath === link;
	$: ariaLabel = isCurrent ? loc : 'false';
</script>

<li class:list-link--disabled={disabled}>
	<a
		href={`/${link}`}
		aria-current={ariaLabel}
		aria-disabled={disabled}><slot /></a>
</li>

<style lang="scss">
	a[aria-current="page"], a[aria-current="location"], a[aria-current="step"] {
		font-weight: bold; // TODO
		color: orange; // TODO
	}

	.list-link--disabled,
  .list-link--disabled:hover {   
    &, a {
      color: gray; // TODO
      cursor: not-allowed;
    }
  }
</style>