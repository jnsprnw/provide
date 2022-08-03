<script context="module">
  import { template } from "lodash-es";

  const compiled = template('Welcome to <%= project %>!');

  export function load () {
    return { props: { text: compiled({ 'project': 'Provide' }) }};
  }
</script>

<script>
  export let text;
</script>

<svelte:head>
  <title>Provide Project</title>
</svelte:head>

<h1>{ text }</h1>
