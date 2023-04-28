<script>
  import { TITLE_PROJECT, TITLE_SITE } from '$config';

  export let size = 'md';

  $: classes = {
    sm: 'gap-2 text-sm',
    md: 'gap-3 text-md',
  }[size];
</script>

<div class="inline-flex {classes}">
  <h1 class="text-theme-base font-bold uppercase tracking-widest">
    {TITLE_PROJECT}
  </h1>
  <span class="text-foreground-weakest" role="presentation" aria-hidden="true"
    >|</span
  >
  <span class="text-foreground-weak">{TITLE_SITE}</span>
</div>
