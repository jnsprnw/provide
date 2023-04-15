<script>
  import { extent } from 'd3-array';
  import { scaleLinear } from 'd3-scale';

  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import Spinner from '$lib/helper/Spinner.svelte';
  import {
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
    TEMPLATE_PROPS,
  } from '$src/stores/state';
  import { END_GEO_SHAPE, END_IMPACT_GEO } from '$src/config.js';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import { interpolateLab } from 'd3-interpolate';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';
  import { coordinatesToRectGrid } from '$utils/geo.js';

  import Controls from './Controls.svelte';
  import Maps from './Maps.svelte';

  let displayOption = 'side-by-side';
  let year = '2030';

  const POSITIVE_RANGE = ['#F9CEA6', '#C91C1C'];
  const NEGATIVE_RANGE = ['#437E8E', '#DACFBF'];
  const DIVERGING_RANGE = ['#437E8E', '#F4E4D6', '#C91C1C'];

  let IMPACT_GEO_DATA = writable([]);
  let GEO_SHAPE_DATA = writable({});

  $: fetchData(
    IMPACT_GEO_DATA,
    $CURRENT_SCENARIOS_UID.map((scenario) => ({
      endpoint: END_IMPACT_GEO,
      params: {
        geography: $CURRENT_GEOGRAPHY?.uid,
        indicator: $CURRENT_INDICATOR?.uid,
        scenario,
        year,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    }))
  );

  $: fetchData(GEO_SHAPE_DATA, {
    endpoint: END_GEO_SHAPE,
    params: {
      geography: $CURRENT_GEOGRAPHY?.uid,
    },
  });

  $: process = ({ data, shape }, { scenarios }) => {
    const isDoubleMap = data.length === 2;
    const showDifference = displayOption === 'difference' && isDoubleMap;
    const isMultipMap = data.length > 1 && !showDifference;

    const calculateDifference = () => {
      const [grid1, grid2] = data;
      return {
        ...grid1.data,
        data: grid1.data.data.map((row, lngIndex) =>
          row.map((value, latIndex) =>
            value === null ? null : grid2.data.data[lngIndex][latIndex] - value
          )
        ),
      };
    };

    // The data that is actually being rendered
    const renderedData = showDifference
      ? [calculateDifference()]
      : data.map((d, i) => ({
          ...(isMultipMap ? scenarios[i] : {}),
          ...d.data,
        }));

    const colorScale = (() => {
      let range;
      const flatData = renderedData.map((grid) => grid.data).flat(3);
      let domain = extent(flatData);
      let [min, max] = domain;
      // Include 0 values to prevent dividing by zero when creating a diverging scale
      const isSequential = (min >= 0 && max >= 0) || (min <= 0 && max <= 0);
      if (isSequential) {
        range = min >= 0 ? POSITIVE_RANGE : NEGATIVE_RANGE;
      } else {
        // Is positive extent bigger than negative? Every calculation later on depends on this
        const leansPositive = Math.abs(min) <= max;
        // Set min/max extents according to which side the scale leans
        const maxExtent = leansPositive ? max : min;
        const minExtent = leansPositive ? min : max;
        const extentRatio = Math.abs(minExtent / maxExtent);
        // Color for the side that extends fully
        const maxColor = leansPositive
          ? DIVERGING_RANGE[2]
          : DIVERGING_RANGE[0];
        // Color for the side that gets cut somwhere
        const fullMinColor = leansPositive
          ? DIVERGING_RANGE[0]
          : DIVERGING_RANGE[2];
        // Find color at the correct ratio
        const minRange = scaleLinear()
          .domain([0, minExtent])
          .range([DIVERGING_RANGE[1], fullMinColor])(extentRatio * minExtent);

        range = leansPositive
          ? [minRange, DIVERGING_RANGE[1], maxColor]
          : [maxColor, DIVERGING_RANGE[1], minRange];
        domain = leansPositive
          ? [minExtent, 0, maxExtent]
          : [maxExtent, 0, minExtent];
      }

      return scaleLinear()
        .interpolate(interpolateLab)
        .domain(domain)
        .range(range);
    })();

    const geoData = renderedData.map(
      ({ data, coordinatesOrigin, resolution, ...d }) => ({
        ...d,
        data: coordinatesToRectGrid(data, {
          origin: coordinatesOrigin,
          resolution,
          colorScale,
        }),
      })
    );

    const { model, source, resolution } = data[0].data;
    const chartInfo = [
      { label: 'Model', value: model },
      { label: 'Source', value: source },
      {
        label: 'Spatial resolution',
        value: `${resolution} × ${resolution}°`,
      },
    ];

    return {
      showDifference,
      geoData,
      geoShape: shape.data.data.features[0],
      colorScale,
      chartInfo,
    };
  };

  const title =
    'Change in {{indicator.label}} in {{geography.label}} in {{year}}';

  const description =
    'This map shows the change in {{indicator.label}} (expressed in {{indicator.unit.labelLong}}) in {{geography.label}} in {{year}} compared to the reference period {{indicatorOptions.reference.label}}.';
</script>

<LoadingWrapper
  let:asyncProps
  let:props
  asyncProps={{ data: $IMPACT_GEO_DATA, shape: $GEO_SHAPE_DATA }}
  props={{ ...$TEMPLATE_PROPS, year }}
  {process}
  let:isLoading
>
  <ChartFrame
    {title}
    {description}
    templateProps={props}
    chartInfo={asyncProps.chartInfo}
  >
    <svelte:fragment slot="controls">
      <Controls scenarios={props.scenarios} bind:displayOption bind:year />
    </svelte:fragment>
    <Maps {...props} {...asyncProps} />
  </ChartFrame>
  <Spinner {isLoading} />
</LoadingWrapper>
