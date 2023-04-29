<script>
  export let items;
  export let id;
</script>

<dl class="flex flex-wrap gap-x-4 my-4">
  {#each items as { label, color, uid }}
    <!-- For some reason the updating of the color causes issues if no key block is added -->
    {#key uid}
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
    {/key}
  {/each}
</dl>
