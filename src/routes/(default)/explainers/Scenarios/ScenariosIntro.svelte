<script>
  import { getContext } from 'svelte';
  export let title;
  export let slug;
  const { query } = getContext('scrollContent');
</script>

<h2 id={slug} name={slug} class="scroll-mt-4 font-bold text-2xl mb-2 mt-4 first-of-type:mt-0 {query}">
  {title}
</h2>
<div class="html-content">
  <p>The PROVIDE Climate risk dashboard offers information on potential future climate impacts to understand and plan for a range of different future scenarios.</p>
  <p>We show scenarios covering two timeframes:</p>
  <ul>
    <li>up to 2100 - which is the timeframe referenced in the Paris Agreement, and focuses on impacts in the next few decades, and</li>
    <li>up to 2300, which is important to show impacts on slower to respond systems such as glaciers, or oceans.</li>
  </ul>
  <p>
    The scenarios presented on the climate risk dashboard are mostly characterised by the changes in two key quantities over time: global greenhouse gas emissions, and Global Mean Temperature (GMT).
    Global greenhouse gas emissions are responsible for most of the changes in the climate system observed since the pre-industrial period and those projected for the coming centuries. Global Mean
    Temperature (GMT) is used to quantify global warming compared to a pre-industrial climate (the Intergovernmental Expert Panel on Climate Change, or IPCC, uses the 1850-1900 period for that
    purpose).
  </p>

  <p>
    However, more and more research suggests that GMT won’t solely define the level of climate impacts at the local level. This is the case for overshoot scenarios, where GMT exceeds the 1.5°C warming
    limit of the Paris Agreement, then peaks and declines potentially going back to 1.5°C or lower. This occurs once emissions have been sufficiently reduced and most often compensated by at least
    some removal of carbon dioxide from the atmosphere. In these scenarios, temperatures rise and descend, but not all impacts follow this trajectory - as peak temperatures led to some changes in our
    Earth’s system that are irreversible.
  </p>

  <p>
    Below we offer a choice of research questions that will preselect scenarios included in the dashboard that can answer them. That table shows key characteristics of those scenarios (emissions or
    GMT levels at specific points in time etc.).
  </p>
</div>
