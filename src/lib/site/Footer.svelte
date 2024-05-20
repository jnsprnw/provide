<script>
  import { LABEL_DOCUMENTATION, LABEL_CONTACT, PATH_GLOSSARY, LABEL_GLOSSARY, LABEL_ABOUT, PATH_ABOUT, PATH_CONTACT, PATH_DOCUMENTATION } from '$config';
  import { version } from '$app/environment';
  import Logo from './Logo.svelte';
</script>

<footer class="bg-surface-weaker">
  <div class="mx-auto max-w-7xl pt-10 px-6 flex gap-x-6 justify-between">
    <div class="flex gap-3">
      <Logo />
    </div>
  </div>
  <div class="mx-auto max-w-7xl pt-4 pb-10 px-6 grid grid-cols-1 sm:grid-cols-5 gap-y-12 gap-x-12">
    <div class="flex gap-3 flex-col sm:col-span-2">
      <span class="text-sm max-w-prose text-contour-weak"
        >The development of the dashboard was led by <a
          href="https://climateanalytics.org/"
          class="underline decoration-theme-base hover:text-theme-stronger hover:decoration-theme-stronger transition-colors">Climate Analytics</a
        >, with contributions from the
        <a href="https://www.provide-h2020.eu/" class="underline decoration-theme-base hover:text-theme-stronger hover:decoration-theme-stronger transition-colors">PROVIDE</a> consortium.</span
      >
    </div>
    <div class="flex gap-x-4 items-start sm:col-span-3 lg:col-span-2">
      <img class="max-w-[100px]" alt="Logo of the European Union reading 'Funded by the European Union'" src="/img/eu-flag.svg" />
      <p class="text-xs text-text-weaker">This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No. 101003687.</p>
    </div>
    <nav class="place-self-end w-full sm:col-span-5 lg:col-span-1">
      <ul class="flex flex-wrap justify-between sm:justify-start gap-x-4 flex-row lg:flex-col">
        <li><a class="text-sm text-theme-base hover:text-theme-stronger transition-colors" href="/{PATH_DOCUMENTATION}">{LABEL_DOCUMENTATION}</a></li>
        <li><a class="text-sm text-theme-base hover:text-theme-stronger transition-colors" href="/{PATH_GLOSSARY}">{LABEL_GLOSSARY}</a></li>
        <li><a class="text-sm text-theme-base hover:text-theme-stronger transition-colors" href="/{PATH_ABOUT}">{LABEL_ABOUT}</a></li>
        <li><a class="text-sm text-theme-base hover:text-theme-stronger transition-colors" href="/{PATH_CONTACT}">{LABEL_CONTACT}</a></li>
      </ul>
    </nav>
  </div>
  <div class="border-contour-weakest border-t py-3">
    <div class="text-sm mx-auto max-w-7xl px-6 flex justify-between">
      <span class="text-contour-weak"><a href="https://climateanalytics.org/">Climate Analytics</a> <time datetime={new Date().getFullYear()}>{new Date().getFullYear()}</time></span>
      <span class="text-contour-weaker text-xs"
        >Version {version}. Build
        <time title={new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())} datetime={new Date().toISOString()}
          >{new Date().toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</time
        ></span
      >
    </div>
  </div>
</footer>
