<script>
  import { LABEL_DOCUMENTATION, LABEL_EXPLAINERS, LABEL_CONTACT, LABEL_ABOUT, PATH_ABOUT, PATH_CONTACT, PATH_EXPLAINERS, PATH_DOCUMENTATION, TITLE_SITE, TITLE_PROJECT } from '$config';
</script>

<footer class="bg-surface-weaker">
  <div class="mx-auto max-w-7xl py-10 px-6 flex justify-between">
    <div class="flex gap-3">
      <strong class="uppercase leading-relaxed text-theme-base">{ TITLE_PROJECT }</strong>
      <span class="text-contour-weak">{ TITLE_SITE }</span>
    </div>
    <nav class="text-theme-base">
      <ul>
        <li><a class="text-sm" href="/{PATH_ABOUT}">{LABEL_ABOUT}</a></li>
        <li><a class="text-sm" href="/{PATH_DOCUMENTATION}">{LABEL_DOCUMENTATION}</a></li>
        <li><a class="text-sm" href="/{PATH_EXPLAINERS}">{LABEL_EXPLAINERS}</a></li>
        <li><a class="text-sm" href="/{PATH_CONTACT}">{LABEL_CONTACT}</a></li>
      </ul>
    </nav>
  </div>
  <div class="border-contour-weakest border-t py-3">
    <div class="text-sm mx-auto max-w-7xl px-6 flex justify-between">
      <span class="text-contour-weak">Climate Analytics 2023</span>
      <span class="text-contour-weak">Version {__APP_VERSION__}</span>
    </div>
  </div>
</footer>
