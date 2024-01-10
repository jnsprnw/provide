<script>
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import PopoverButton from '$lib/controls/PopoverButton/PopoverButton.svelte';
  import Spinner from '$lib/helper/Spinner.svelte';
  import { stringify } from 'qs';
  import { snakeCase } from 'lodash-es';
  import { browser } from '$app/environment';

  export let graphParams = {};
  export let width = 1000;
  export let processingIntensity = 1;
  export let embedUid;
  export let formats = ['png', 'pdf'];

  let label = 'Download graph';
  let isDisabled = false;

  $: formatOptions = [
    { uid: 'png', label: 'png' },
    { uid: 'pdf', label: 'pdf' },
  ].map((d) => ({ ...d, disabled: !formats.includes(d.uid) }));

  let format = formats[0];

  let loading = false;

  $: screenshotName = Object.values(graphParams)
    .map((str) => snakeCase(str))
    .join('-');

  $: graphQuery = stringify({ ...graphParams, static: true });

  function buildGraphURL(embedUid, graphQuery) {
    if (browser) {
      const host = window?.location?.origin;
      if (!host) {
        console.warn(`Host URL is not defined. Graph download will not be available.`);
        return null;
      }
      try {
        return new URL(`${host}/embed/${embedUid}/?${graphQuery}`);
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    return null;
  }

  $: graphUrl = buildGraphURL(embedUid, graphQuery);

  function buildScreenshotUrl(format, width, processingIntensity, graphUrl) {
    if (!(graphUrl || graphUrl.hasOwnProperty('href'))) {
      console.warn(`Screenshot build URL is not defined. Graph download will not be available.`);
      return null;
    }

    const screenshotQuery = stringify({
      format,
      width,
      processingIntensity,
      url: graphUrl.href,
    });

    const host = import.meta.env.VITE_SCREENSHOT_URL;

    if (!host) {
      console.warn(`Screenshot build URL variable not set. Graph download will not be available.`);
      return null;
    }

    try {
      return new URL(`${host}?${screenshotQuery}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  $: screenshotUrl = buildScreenshotUrl(format, width, processingIntensity, graphUrl);

  $: isDownloadAvailable = graphUrl && screenshotUrl && screenshotName;

  $: downloadImage = async () => {
    if (browser) {
      if (isDownloadAvailable) {
        loading = true;
        try {
          const response = await fetch(screenshotUrl);
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.download = screenshotName;
          a.href = blobUrl;
          document.body.appendChild(a);
          a.click();
          a.remove();
          loading = false;
        } catch (error) {
          console.error(error);
          loading = false;
          label = 'Could not download graph';
          isDisabled = true;
        }
      }
    }
  };
</script>

{#if isDownloadAvailable}
  <PopoverButton label="Download graph">
    <div class="max-w-xs px-3 pb-3">
      <div class="py-2.5 grid grid-cols-7 gap-2 items-center">
        <span class="col-span-2 text-contour-weak text-sm">Format</span>

        <div class="col-span-5 col-start-3">
          <PillGroup size="sm" allowWrap={false} options={formatOptions} bind:currentUid={format} />
        </div>
      </div>
      <button disabled={isDisabled} on:click={downloadImage} class="bg-surface-weaker disabled:text-theme-weaker w-full py-2 text-theme-base font-bold text-sm flex gap-3 items-center justify-center"
        >{#if loading}<Spinner size={15} strokeWidth={2} />{/if}
        {label}</button
      >
    </div>
  </PopoverButton>
{/if}
