<script>
  export let size = 5;
  export let strokeWidth = 1;
  export let color = 'white';
  export let id = 'hatching';
</script>

<pattern {id} width={size} height={size} patternUnits="userSpaceOnUse">
  <g>
    <line
      x1={0}
      x2={size}
      y1={size}
      y2={0}
      style={`stroke: ${color}; stroke-width: ${strokeWidth}`}
    />
    <line
      x1={-strokeWidth}
      x2={strokeWidth}
      y1={strokeWidth}
      y2={-strokeWidth}
      style={`stroke: ${color}; stroke-width: ${strokeWidth}`}
    />
    <line
      x1={size - strokeWidth}
      x2={size + strokeWidth}
      y1={size + strokeWidth}
      y2={size - strokeWidth}
      style={`stroke: ${color}; stroke-width: ${strokeWidth}`}
    />
  </g>
</pattern>
