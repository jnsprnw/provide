<script>
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import PopoverButton from '$lib/controls/PopoverButton/PopoverButton.svelte';
  import { stringify } from 'qs';

  export let graphParams = {};
  export let width = 1200;
  export let embedUid;

  const formats = [
    { uid: 'png', label: 'png' },
    { uid: 'pdf', label: 'pdf' },
  ];
  let format = 'png';

  $: graphQuery = stringify(graphParams);
  $: graphUrl = new URL(
    `${import.meta.env.VITE_APP_URL}/embed/${embedUid}/?${graphQuery}`
  );

  $: screenshotQuery = stringify({ format, width, url: graphUrl.href });
  $: screenshotUrl = new URL(
    `${import.meta.env.VITE_SCREENSHOT_URL}?${screenshotQuery}`
  );
</script>

<PopoverButton label="Download graph" isDropdown={true}>
  <div class="max-w-xs px-3 pb-3">
    <div class="py-2.5 grid grid-cols-7 gap-2 items-center">
      <span class="col-span-2 text-foreground-weak text-sm">Format</span>

      <div class="col-span-5 col-start-3">
        <PillGroup size="sm" options={formats} bind:currentUid={format} />
      </div>
    </div>
    <div class="bg-background-weaker text-center py-2">
      <a href={screenshotUrl} class="text-theme-base font-bold text-sm" download
        >Download graph</a
      >
    </div>
  </div>
</PopoverButton>
