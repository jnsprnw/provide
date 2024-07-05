<script>
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import PopoverButton from '$lib/controls/PopoverButton/PopoverButton.svelte';
  import Spinner from '$lib/helper/Spinner.svelte';
  import { stringify } from 'qs';
  import { snakeCase, delay } from 'lodash-es';
  import { browser } from '$app/environment';
  import saveAs from 'file-saver';

  export let graphParams = {};
  export let width = 1000;
  export let processingIntensity = 1;
  export let embedUid;
  export let formats = ['png', 'pdf'];

  const STATUS_IDLE = 'STATUS_IDLE';
  const STATUS_ERROR = 'STATUS_ERROR';
  const STATUS_LOADING = 'STATUS_LOADING';

  let status = STATUS_IDLE;
  let label;
  let isDisabled = false;

  $: formatOptions = [
    { uid: 'png', label: 'png' },
    { uid: 'pdf', label: 'pdf' },
  ].map((d) => ({ ...d, disabled: !formats.includes(d.uid) }));

  let format = formats[0];

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
        return new URL(`${host}/embed/${embedUid}?${graphQuery}`);
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
    const screenshotQuery = stringify(
      {
        format,
        width,
        processingIntensity,
        url: graphUrl.href,
      },
      {
        encodeValuesOnly: false,
      }
    );

    const host = import.meta.env.VITE_SCREENSHOT_URL; // 'http://127.0.0.1:8888/api/puppeteer'

    if (!host) {
      console.warn(`Screenshot build URL variable not set. Graph download will not be available.`);
      return null;
    }
    try {
      return new URL(`${host}/screengrab?${screenshotQuery}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  $: screenshotUrl = buildScreenshotUrl(format, width, processingIntensity, graphUrl);

  //$: console.log({ graphUrl, screenshotUrl });

  $: isDownloadAvailable = graphUrl && screenshotUrl && screenshotName;

  $: downloadImage = async () => {
    if (browser) {
      if (isDownloadAvailable) {
        status = STATUS_LOADING;
        try {
          const response = await fetch(screenshotUrl);
          if (response.status !== 200) {
            status = STATUS_ERROR;
          } else {
            const blob = await response.blob();
            saveAs(blob, screenshotName);
            status = STATUS_IDLE;
          }
        } catch (error) {
          console.error(error);
          status = STATUS_ERROR;
        }
      }
    }
  };

  $: switch (status) {
    case STATUS_IDLE:
      label = `Download graph as ${format} file`;
      isDisabled = false;
      break;
    case STATUS_LOADING:
      label = 'Generating graph file';
      isDisabled = true;
      break;
    case STATUS_ERROR:
      label = 'Error occured while generating file';
      isDisabled = true;
      delay(() => {
        status = STATUS_IDLE;
      }, 5000);
      break;
    default:
      isDisabled = true;
  }
</script>

{#if isDownloadAvailable}
  <PopoverButton label="Download graph">
    <div class="max-w-xs px-3 py-3 flex gap-y-4 flex-col">
      <div class="flex gap-2 items-center">
        <span class="text-contour-weak text-sm">Format</span>
        <div>
          <PillGroup size="sm" allowWrap={false} options={formatOptions} bind:currentUid={format} />
        </div>
      </div>
      <button
        data-screenshot={screenshotUrl}
        data-graph={graphUrl}
        disabled={isDisabled}
        on:click={downloadImage}
        class="transition-colors bg-theme-base text-white hover:enabled:bg-theme-stronger disabled:text-white disabled:bg-theme-weaker w-full py-2 text-theme-base text-sm px-3 grid grid-cols-[15px_auto_15px] gap-x-3 items-center"
      >
        {#if status === STATUS_LOADING}<Spinner color="stroke-white" size={15} strokeWidth={2} />{/if}
        <span class="col-start-2 block min-w-[200px] font-bold">{label}</span>
      </button>
    </div>
  </PopoverButton>
{/if}
