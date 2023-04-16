<script>
  export let items;
</script>

<dl class="flex flex-wrap gap-x-4 my-4">
  {#each items as { label, color, uid }}
    <div class="flex gap-x-1.5 items-center" id={uid}>
      <dt>
        <i
          title={label}
          style:width="10px"
          style:height="14px"
          class="block bg-background-weakest"
          style:background-color={color}
        />
      </dt>
      <dd><span class="font-bold text-sm">{label}</span></dd>
    </div>
  {/each}
</dl>
