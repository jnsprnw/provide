<script>
  export let title;
  export let description;
  export let parameters;
  export let primaryKeys;
  export let secondaryKeys;
</script>

<div class="chart-info">
  <h3 class="font-bold text-lg">{title}</h3>
  <p>{description}</p>

  <slot />
</div>
