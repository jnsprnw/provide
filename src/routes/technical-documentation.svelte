<script context="module">
	import { parse } from 'marked';
	import { loadFromAPI } from '$lib/utils.js';

  export const load = async ({ fetch }) => {
  	const data = await loadFromAPI('technical-documentation', fetch);
    const { Models, Scenarios } = data.attributes;

    return {
    	props: {
    		models: Models.map(({ Title, Description, Link }) => {
    			return {
    				title: Title,
    				description: parse(Description),
    				link: Link
    			}
    		}),
				scenarios: Scenarios.map(({ Title, Description }) => {
    			return {
    				title: Title,
    				description: parse(Description)
    			}
    		}),
    	}
    };
  }
</script>

<script>
	export let models;
	export let scenarios;
</script>

<svelte:head>
	<title>Technical Documentation</title>
</svelte:head>

<div class="faq-header container">
	<div class="wrapper">
		<h1>Technical Documentation</h1>
	</div>
</div>

<div class="faq-content container">
	<div class="wrapper">
		<h2>Models</h2>
		{#each models as { title, description, link }}
		<h3>{ title }</h3>
		{ @html description }
		<a href={link}>More information about { title }</a>
		{/each}
		<h2>Scenarios</h2>
		{#each scenarios as { title, description }}
		<h3>{ title }</h3>
		{ @html description }
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../styles/global.scss';

	.section {
		.topic {
			grid-column: 1 / span 6;
		}
	}
</style>