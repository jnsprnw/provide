<script>
  import { LIKELIHOODS } from '$stores/meta.js';
</script>

<section>
  <strong class="text-text-weaker text-sm">Likelihodd levels</strong>

  <ul class="flex gap-y-1 flex-col mr-2">
    {#each $LIKELIHOODS as { uid, label, value }}
      <li class="flex gap-y-2 flex-row justify-between">
        <strong class="text-xs font-bold">{label}</strong>
        <pre class="text-xs font-mono bg-gray-100 rounded p-1">{value}</pre>
      </li>
    {/each}
  </ul>
</section>
