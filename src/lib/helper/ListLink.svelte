<script>
	export let link = '';
	export let currentPath = '';
	export let loc = 'page';
	export let startsWith = false;

	$: isCurrent = startsWith && currentPath.startsWith(link) || currentPath === link;
	$: ariaLabel = isCurrent ? loc : 'false';
</script>

<li><a href={`/${link}`} aria-current={ariaLabel}><slot /></a></li>

<style lang="scss">
	a[aria-current="page"], a[aria-current="location"], a[aria-current="step"] {
		font-weight: bold; // TODO
		color: orange; // TODO
	}
</style>