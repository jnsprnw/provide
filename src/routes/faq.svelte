<script context="module">
	import { parse } from 'marked';

  export const load = async () => {
    const res = await fetch('https://provide-cms.herokuapp.com/api/faqs');
    const data = await res.json();

    return {
    	props: {
    		questions: data.data.map((d) => {
    			const { question, answer } = d.attributes;
    			return {
    				question,
    				answer: parse(answer)
    			}
    		})
    	}
    };
  }
</script>

<script>
	import Item from '$lib/faq/item.svelte';

	export let questions;
</script>

<svelte:head>
	<title>FAQ</title>
</svelte:head>

<h1>FAQ</h1>

<dl>
	{#each questions as { question, answer }}
	<Item>
		<span slot="term">
			{ question }
		</span>
		<p slot="description">
			{ @html answer }
		</p>
	</Item>
	{/each}
</dl>

<style lang="scss">
	@import '../styles/global.scss';

</style>