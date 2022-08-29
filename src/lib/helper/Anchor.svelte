<script>
	export let hash;
	export let label;
	export let isHeadline = false;

	let link;

	function handleClick (e) {
		const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      link.blur();
    }
	}
</script>

<a
	bind:this={link}
	href={`#${hash}`}
	on:click|preventDefault={handleClick}
	class:nav-headline-section={isHeadline}>
	{ label }
</a>