<script>
  import { LABEL_DOCUMENTATION, LABEL_EXPLAINERS, LABEL_CONTACT, LABEL_ABOUT, PATH_ABOUT, PATH_CONTACT, PATH_EXPLAINERS, PATH_DOCUMENTATION, TITLE_SITE, TITLE_PROJECT } from '$config';
  import Logo from './Logo.svelte';
</script>

<footer class="bg-surface-weaker">
  <div class="mx-auto max-w-7xl py-10 px-6 flex justify-between">
    <div class="flex gap-3 flex-col">
      <div class="flex gap-3">
        <Logo />
      </div>
      <span class="text-sm max-w-prose text-contour-weak"
        >The development of the dashboard was led by <a
          href="https://climateanalytics.org/"
          class="underline decoration-theme-base hover:text-theme-stronger hover:decoration-theme-stronger transition-colors">Climate Analytics</a
        >, with contributions from the
        <a href="https://www.provide-h2020.eu/" class="underline decoration-theme-base hover:text-theme-stronger hover:decoration-theme-stronger transition-colors">PROVIDE</a> consortium.</span
      >
    </div>
    <nav>
      <ul>
        <li><a class="text-sm text-theme-base hover:text-theme-stronger transition-colors" href="/{PATH_ABOUT}">{LABEL_ABOUT}</a></li>
        <li><a class="text-sm text-theme-base hover:text-theme-stronger transition-colors" href="/{PATH_DOCUMENTATION}">{LABEL_DOCUMENTATION}</a></li>
        <li><a class="text-sm text-theme-base hover:text-theme-stronger transition-colors" href="/{PATH_EXPLAINERS}">{LABEL_EXPLAINERS}</a></li>
        <li><a class="text-sm text-theme-base hover:text-theme-stronger transition-colors" href="/{PATH_CONTACT}">{LABEL_CONTACT}</a></li>
      </ul>
    </nav>
  </div>
  <div class="border-contour-weakest border-t py-3">
    <div class="text-sm mx-auto max-w-7xl px-6 flex justify-between">
      <span class="text-contour-weak"><a href="https://climateanalytics.org/">Climate Analytics</a> <time datetime={new Date().getFullYear()}>{new Date().getFullYear()}</time></span>
      <span class="text-contour-weaker text-xs">Version {__APP_VERSION__}. Build {new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
    </div>
  </div>
</footer>
