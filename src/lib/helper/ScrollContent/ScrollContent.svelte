<script>
  import Scroller from '@sveltejs/svelte-scroller';

  export let sections = [];
  export let query = 'section';
  let index;
  let count;
  let offset;
  let progress;
</script>

<div class="grid grid-cols-12 gap-10 pt-8 mx-auto max-w-7xl px-6">
  <div class="col-span-3">
    <div class="sticky top-0 z-[2]">
      <slot name="navigation" {index} />
    </div>
  </div>
  <div class="col-span-9">
    <Scroller
      bind:count
      bind:index
      bind:offset
      bind:progress
      {query}
      threshold={0.01}
    >
      <div slot="foreground">
        <slot>
          {#each sections as section}
            {#if !section.disabled}
              <section id={section.slug} class="mb-16">
                <svelte:component this={section.component} {...section} />
              </section>
            {/if}
          {/each}
        </slot>
      </div>
    </Scroller>
  </div>
</div>
