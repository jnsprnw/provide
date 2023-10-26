<script>
  import { STUDY_LOCATIONS } from '$stores/meta.js';
</script>

<section>
  <strong class="text-text-weaker text-sm">Location</strong>

  <ul class="flex gap-y-2 flex-col mr-2">
    {#each $STUDY_LOCATIONS as { uid, label }}
      <li class="flex gap-y-2 flex-row justify-between">
        <strong class="font-bold text-xs">{label}</strong>
      </li>
    {/each}
  </ul>
</section>
