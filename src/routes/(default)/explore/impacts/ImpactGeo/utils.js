import { extent } from 'd3-array';
import { interpolateLab } from 'd3-interpolate';
import { scaleLinear } from 'd3-scale';
import { geoProject } from 'd3-geo-projection';
import { featureCollection, multiPolygon, polygon } from '@turf/helpers';
import { geoIdentity } from 'd3-geo';
import { rewind } from '$lib/utils/geo';
import { contours } from 'd3-contour';

const POSITIVE_RANGE = ['#F9CEA6', '#C91C1C'];
const NEGATIVE_RANGE = ['#437E8E', '#DACFBF'];
const DIVERGING_RANGE = ['#437E8E', '#F4E4D6', '#C91C1C'];

export const getColorScale = (data) => {
  let range;
  const flatData = data.map((grid) => grid.data).flat(3);
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
    const maxColor = leansPositive ? DIVERGING_RANGE[2] : DIVERGING_RANGE[0];
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

  return scaleLinear().interpolate(interpolateLab).domain(domain).range(range);
};

export const calculateDifference = (data) => {
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

export const coordinatesToRectGrid = (
  data,
  { colorScale, resolution, origin }
) => {
  const features = data?.reduce((acc, cells, latIndex) => {
    cells.forEach((value, lngIndex) => {
      if (value === null) return;
      const lat = origin[1] + resolution * lngIndex - resolution / 2;
      const lng = origin[0] + resolution * latIndex - resolution / 2;
      const coordinates = [
        [
          [lng, lat],
          [lng + resolution, lat],
          [lng + resolution, lat + resolution],
          [lng, lat + resolution],
          [lng, lat],
        ],
      ];
      const properties = { value, color: colorScale(value) };
      acc.push(polygon(coordinates, properties));
    });

    return acc;
  }, []);

  return featureCollection(features);
};

export const coordinatesToContours = (
  values,
  { thresholds, origin, resolution, colorScale }
) => {
  const width = values[0].length;
  const height = values.length;
  const flatValues = values.flat();
  const generateContours = contours().size([width, height]).smooth(true);

  if (thresholds) generateContours.thresholds(thresholds);
  const rawContours = generateContours(flatValues).map((contour) =>
    multiPolygon(contour.coordinates, {
      value: contour.value,
      color: colorScale(contour.value),
    })
  );
  // .reduce((acc, p) => {
  //   try {
  //     const smoothed = polygonSmooth(p, { iterations: 4 });
  //     polygonSmooth
  //     return [...acc, ...smoothed.features];
  //   } catch {
  //     //console.log("Smoothing failed");
  //     return [...acc, p];
  //   }
  // }, []);

  const unprojectedContours = featureCollection(rawContours);

  const contoursGeojson = geoProject(
    unprojectedContours,
    // Not entirely sure why reflectX and angle are needed to get the correct map...
    geoIdentity().translate(origin).scale(resolution).reflectX(true).angle(90)
  );

  contoursGeojson.features = contoursGeojson.features.map((f) => rewind(f));
  return contoursGeojson;
};
