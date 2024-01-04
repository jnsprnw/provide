<script>
  import { PATH_IMPACT, PATH_AVOID } from '$config';
  import Entrypoint from './Entrypoint.svelte';
</script>

<header class="py-20 justify-center flex-col max-w-7xl mx-auto gap-x-12 grid md:grid-cols-2">
  <div>
    <span class="block font-bold text-3xl mb-3">One dashboard to combine opposing perspectives</span>
    <p class="leading-normal text-xl">
      The PROVIDE <strong>climate risk dashboard</strong> bundles data from a variety of sources. It includes the latest sciences from our partners at lorem ipsum, dolor, something, something.
    </p>
    <p class="leading-normal text-xl">It allows you to explore future impacts from climate change as the world warms. Start by picking a mode below.</p>
  </div>
</header>
<div class="grid md:grid-cols-2 gap-y-6 gap-x-24 max-w-7xl mx-auto">
  <Entrypoint path={PATH_IMPACT} title="what-if approach" audience={['Policy maker', 'City planners', 'Climate scientists']}>
    <span slot="intro">
      Starting at our current year, pick a geography<sup>1</sup>, one of the 20 indicators and explore how future<sup>2</sup> impacts will develop under 6 scenarios.
    </span>
    <img slot="image" src="/img/impacts.png" alt="One scenario and many resulting impacts" />
    <ol slot="footer">
      <li><sup>1</sup> Geographies currently available are countries, cities and exclusive economic zones. More will follow in 2024.</li>
      <li><sup>2</sup> 12 scenarios are focusing on the years until 2100, while 12 scenarios strech until 2300.</li>
    </ol>
  </Entrypoint>
  <Entrypoint path={PATH_AVOID} title="If-how approach" audience={['Policy maker', 'City planners', 'Climate scientists']}>
    <span slot="intro"> Looking back from the future, you can select a threshold for a climate impact and explore scenarios under which the threshold won't be exceeded. </span>
    <img slot="image" src="/img/emission-scenarios.png" alt="One scenario and many resulting impacts" />
    <ol slot="footer">
      <li><sup>1</sup> Geographies currently available are countries, cities and exclusive economic zones. More will follow in 2024.</li>
      <li><sup>2</sup> 12 scenarios are focusing on the years until 2100, while 12 scenarios strech until 2300.</li>
    </ol>
  </Entrypoint>
</div>
<div class="py-20 justify-center flex-col max-w-7xl mx-auto gap-x-12 grid md:grid-cols-2">
  <div>
    <span class="block font-bold text-3xl mb-3">The PROVIDE project aims for a high target</span>
    <p class="leading-normal text-xl">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum esse earum dicta iure. Neque rerum, numquam odio veniam facere consequatur itaque molestias in doloribus recusandae, at ad
      soluta. Quisquam, beatae.
    </p>
  </div>
</div>
