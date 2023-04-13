<script>
  let clazz;
  export let color = 'text-theme-weaker';
  export let size = 'text-xs';
  export { clazz as class };
</script>

<span class={`uppercase tracking-widest inline-block ${color} ${size} ${clazz}`}
  ><slot /></span
>
