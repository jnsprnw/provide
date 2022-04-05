<script>
	import Item from '$lib/faq/item.svelte';
</script>

<svelte:head>
	<title>FAQ</title>
</svelte:head>

<h1>FAQ</h1>

<dl>
	<Item>
		<span slot="term">
			Do models include a dietary change, e.g. meat consumption per capita developments?
		</span>
		<p slot="description">
			The scenarios assume an evolution of dietary change in line with historic trends, so increasing meat consumption with rising affluence. Dedicated lifestyle changes as a mitigation option are not considered in these scenarios.
		</p>
	</Item>
</dl>

<style lang="scss">
	@import '../styles/global.scss';

</style>