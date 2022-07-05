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

<li class:list-link--disabled={disabled} class="list-link--{type}" class:list-link--active={isActive}>
	<a
		href={`/${link}`}
		aria-current={ariaLabel}
		aria-disabled={disabled}><slot /></a>
</li>

<style lang="scss">
	li {
		&.list-link--active {
			&.list-link--primary {
				// background-color: var(--color-light-green100);
				border-bottom-color: var(--color-functional-accent);

				a {
					color: var(--color-functional-accent);
				}
			}
		}

		&.list-link--primary {
			padding: var(--size-space-large-xs) 0;
			border-bottom: var(--stroke-active-bold) solid transparent;
			transition: border-bottom-color 0.3s ease-out; // TODO

			a {
				color: var(--color-brand-stronger);
				transition: color 0.3s ease-out; // TODO
			}

			&.list-link--disabled,
		  &.list-link--disabled:hover {
		  	a {
		  		color: var(--color-light-blue300); // TODO
		    	cursor: not-allowed;
		  	}
		  }
		}
	}
</style>