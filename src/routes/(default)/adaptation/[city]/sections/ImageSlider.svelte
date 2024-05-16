<script>
  import PillGroup from '$src/lib/controls/PillGroup/PillGroup.svelte';
  import _ from 'lodash-es';
  import { writable } from 'svelte/store';
  export let explorerUrl;
  export let description;
  export let attribueLabel;
  export let groupingLabel;
  export let imagePairs;

  $: groupingValues = _.uniqBy(imagePairs, 'groupName');
  $: attributeValues = _.uniqBy(imagePairs, 'attributeValue');

  $: console.log(groupingValues, attributeValues);
</script>
