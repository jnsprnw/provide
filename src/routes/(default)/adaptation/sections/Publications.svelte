<script>
  import { LABEL_ADAPTATION_RESOURCES } from '$config';
  import { timeFormat } from 'd3-time-format';

  import SubsectionHeadline from '$src/lib/helper/ContentPages/SubsectionHeadline.svelte';
  export let title;
  export let publications;

  const formatTime = timeFormat('%B %Y');
</script>

<div class="flex flex-col gap-y-10 mt-10 pt-10">
  <div>
    <SubsectionHeadline {title} />
    <div class="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
      {#each publications as publication}
        <a
          class="p-4 bg-surface-weakest h-64 border-l-4 shadow-md flex flex-col justify-between"
          class:border-theme-weakest={publication.type === 'publication'}
          class:border-theme-base={publication.type === 'deliverable'}
          href={publication.url}
          ><div>
            <div class="uppercase text-xs tracking-widest mb-1.5 text-text-weaker">{publication.type}</div>
            <strong class="font-bold">{publication.name}</strong>
          </div>
          <time class="text-sm text-text-weaker" datetime={publication.date}>{formatTime(publication.date)}</time>
        </a>
      {/each}
    </div>
  </div>
</div>
