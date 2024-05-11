<script>
  import { LABEL_ADAPTATION_RESOURCES } from '$config';
  import SubsectionHeadline from '$src/lib/helper/ContentPages/SubsectionHeadline.svelte';
  export let title;
  export let publications;
</script>

<div class="flex flex-col gap-y-10 mt-10 pt-10">
  <div>
    <SubsectionHeadline {title} />
    <div class="grid grid-cols-4 gap-6">
      {#each publications as publication}
        <a
          class="p-3 bg-surface-weakest h-64 border-l-4 shadow-md"
          class:border-theme-weakest={publication.type === 'publication'}
          class:border-theme-base={publication.type === 'deliverable'}
          href="{import.meta.env.VITE_HEROKU_URL}{publication.url}"><strong class=" font-bold">{publication.name}</strong></a
        >
      {/each}
    </div>
  </div>
</div>
