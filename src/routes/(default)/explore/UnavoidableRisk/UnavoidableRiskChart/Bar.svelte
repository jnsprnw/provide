<script>
  export let color;
  export let baseY;
  export let totalHeight;
  export let index;
  export let hasNoRange;
  export let differentYears;
  export let y2;
</script>

<div
  class={`absolute flex border-l-4 ${color}`}
  style={`top: ${y2}px; height: ${totalHeight}px; left: ${hasNoRange ? 10 : differentYears ? index * 10 : 0}px;`}
></div>
