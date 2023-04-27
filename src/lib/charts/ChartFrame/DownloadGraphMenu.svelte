<script>
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import PopoverButton from '$lib/controls/PopoverButton/PopoverButton.svelte';
  import Spinner from '$lib/helper/Spinner.svelte';
  import { stringify } from 'qs';

  export let graphParams = {};
  export let width = 1000;
  export let embedUid;

  const formats = [
    { uid: 'png', label: 'png' },
    { uid: 'pdf', label: 'pdf' },
  ];
  let format = 'png';

  let loading = false;

  $: graphQuery = stringify({ ...graphParams, static: true });
  $: graphUrl = new URL(
    `${import.meta.env.VITE_APP_URL}/embed/${embedUid}/?${graphQuery}`
  );

  $: screenshotQuery = stringify({ format, width, url: graphUrl.href });
  $: screenshotName = Object.values(graphParams).join('_');
  $: screenshotUrl = new URL(
    `${import.meta.env.VITE_SCREENSHOT_URL}?${screenshotQuery}`
  );

  //$: console.log(graphParams, graphUrl.search);

  $: downloadImage = (url) => {
    loading = true;
    fetch(screenshotUrl)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = screenshotName.replace(/^.*[\\\/]/, '');
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
        loading = false;
      });
  };
</script>

<PopoverButton label="Download graph" isDropdown={true}>
  <div class="max-w-xs px-3 pb-3">
    <div class="py-2.5 grid grid-cols-7 gap-2 items-center">
      <span class="col-span-2 text-foreground-weak text-sm">Format</span>

      <div class="col-span-5 col-start-3">
        <PillGroup size="sm" options={formats} bind:currentUid={format} />
      </div>
    </div>
    <button
      on:click={downloadImage}
      class="bg-background-weaker w-full py-2 text-theme-base font-bold text-sm flex gap-3 items-center justify-center"
      download
      >{#if loading}<Spinner size={15} strokeWidth={2} />{/if} Download graph</button
    >
  </div>
</PopoverButton>
