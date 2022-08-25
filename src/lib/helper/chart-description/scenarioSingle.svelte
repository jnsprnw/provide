<script>
  export let scenario;
</script>

<em
  class="text-underlined"
  style={`--color: ${scenario.color || 'transparent'}`}
>
  {scenario.label}
</em>
