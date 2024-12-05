<script>
  import SectionHeadline from '$src/lib/helper/ContentPages/SectionHeadline.svelte';
  export let title;
  export let publications;

  const formatDate = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  }).format;
</script>

<div class="flex flex-col gap-y-10 pt-5 pb-10 mb-5">
  <SectionHeadline {title} />
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
        <time class="text-sm text-text-weaker" datetime={publication.date}>{formatDate(publication.date)}</time>
      </a>
    {/each}
  </div>
</div>
