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
    A core idea of the PROVIDE scenario design is that global surface temperature (GMT) trajectories are the defining features for assessing climate impacts, rather than emission or concentration pathways. The PROVIDE scenarios are designed to explore a range of different near-term, peak warming and overshoot outcomes and some are extended until 2300 to allow for a systematic assessment of long-term outcomes. Please see the set of scenarios below. By clicking on the research question of comparison, you can see how and why they are grouped in certain ways.
  </p>
</div>
