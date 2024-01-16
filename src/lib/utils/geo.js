import { extent } from 'd3-array';
import { interpolateLab } from 'd3-interpolate';
import { scaleLinear } from 'd3-scale';
import { geoProject } from 'd3-geo-projection';
import { featureCollection, multiPolygon, polygon } from '@turf/helpers';
import { geoIdentity } from 'd3-geo';
import { contours } from 'd3-contour';
import { POSITIVE_RANGE, NEGATIVE_RANGE, DIVERGING_RANGE } from '$config';
import { rewind } from './geo-rewind.js';

export const getColorScale = (data) => {
  let range;
  const flatData = data.flat(3);
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
    const fullMinColor = leansPositive ? DIVERGING_RANGE[0] : DIVERGING_RANGE[2];
    // Find color at the correct ratio
    const minRange = scaleLinear().domain([0, minExtent]).range([DIVERGING_RANGE[1], fullMinColor])(extentRatio * minExtent);

    range = leansPositive ? [minRange, DIVERGING_RANGE[1], maxColor] : [maxColor, DIVERGING_RANGE[1], minRange];
    domain = leansPositive ? [minExtent, 0, maxExtent] : [maxExtent, 0, minExtent];
  }

  return scaleLinear().interpolate(interpolateLab).domain(domain).range(range);
};

export const calculateDifference = (data) => {
  const [grid1, grid2] = data;
  return {
    ...grid1.data,
    data: grid1.data.data.map((row, lngIndex) => row.map((value, latIndex) => (value === null ? null : grid2.data.data[lngIndex][latIndex] - value))),
  };
};

export const coordinatesToRectGrid = (data, { colorScale, resolution, origin }) => {
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

export const coordinatesToContours = (values, { origin, resolution, colorScale }) => {
  const width = values[0].length;
  const height = values.length;
  const flatValues = values.flat();
  const generateContours = contours().size([width, height]).smooth(true);

  // This function generates contours based in the list of values
  const rawContours = generateContours(flatValues).map(({ coordinates, value }) =>
    // Each contour is transformed into a multipolygon
    multiPolygon(coordinates, {
      value,
      color: colorScale(value), // Getting the color from the previously generated color scale
    })
  );

  // This takes the array of polygons and transforms it into a feature collection
  const unprojectedContours = featureCollection(rawContours);

  const contoursGeojson = geoProject(
    unprojectedContours,
    // Not entirely sure why reflectX and angle are needed to get the correct map...
    // Translation is done with origin being the bottom left position
    geoIdentity().translate(origin).scale(resolution).reflectX(true).angle(90)
  );

  // We rewind all features. This is necessary some times. Read more here: https://observablehq.com/@fil/rewind
  contoursGeojson.features = contoursGeojson.features.map((f) => rewind(f));
  return contoursGeojson;
};
