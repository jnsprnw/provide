<script>
  export let items;
</script>

<dl class="flex flex-wrap gap-x-4 my-4">
  {#each items as { label, color, uid }}
    <div class="flex gap-x-2 items-center" id={uid}>
      <dt>
        <i
          title={label}
          class="w-3 h-3 block rounded-sm bg-background-weakest"
          style:background-color={color}
        />
      </dt>
      <dd><span class="font-semibold text-sm">{label}</span></dd>
    </div>
  {/each}
</dl>
