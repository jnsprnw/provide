<script>
  import { getContext } from 'svelte';
  export let title;
  export let slug;
  const { query } = getContext('scrollContent');
</script>

<h2
  id={slug}
  name={slug}
  class="scroll-mt-4 font-bold text-2xl mb-2 mt-4 first-of-type:mt-0 {query}"
>
  {title}
</h2>
<div class="html-content">
  <p>
    This text describes how to read the chart and what the individual elements mean. It is a static text that stays the same, no matter what the selected. This text describes how to read the chart and
    what the individual elements mean. It is a static text that stays the same, no matter what the selected parameters are.
  </p>
</div>
