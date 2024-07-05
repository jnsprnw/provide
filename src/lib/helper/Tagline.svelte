<script>
  export let color = 'text-theme-weaker';
  export let size = 'text-xs';
</script>

<span class={`uppercase tracking-widest inline-block ${color} ${size} ${$$props.class}`}><slot /></span>
