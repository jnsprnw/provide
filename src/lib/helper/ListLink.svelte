<script>
	export let link = '';
	export let currentPath = '';
	export let loc = 'page';
	export let startsWith = false;
	export let disabled = false;
	export let type = 'default';

	$: isActive = startsWith && currentPath.startsWith(link) || currentPath === link;
	$: ariaLabel = isActive ? loc : 'false';
</script>

<li class="list-link--{type}" class:disabled={disabled} class:active={isActive}>
	{#if !disabled}
	<a
		class="link"
		href={`/${link}`}
		aria-current={ariaLabel}
		aria-disabled={disabled}><slot /></a>
	{:else}
	<div
		class="link"
		aria-disabled={disabled}><slot /></div>
	{/if}
</li>

<style lang="scss">
	@import '../../styles/global.scss';

	li {
	  &.list-link--tab {
	  	@include tab-nav-tab();
  	}
  }
</style>