import { geoStream, geoContains, geoArea, geoTransform } from 'd3-geo';

import { extent } from 'd3-array';
import { interpolateLab } from 'd3-interpolate';
import { scaleLinear } from 'd3-scale';
import { geoProject } from 'd3-geo-projection';
import { featureCollection, multiPolygon, polygon } from '@turf/helpers';
import { geoIdentity } from 'd3-geo';
import { contours } from 'd3-contour';
import { POSITIVE_RANGE, NEGATIVE_RANGE, DIVERGING_RANGE } from '$config';
// import rewind from '@mapbox/geojson-rewind';

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

export const coordinatesToContours = (values, { thresholds, origin, resolution, colorScale }) => {
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

// From https://observablehq.com/@fil/rewind
// a simple duck test for projections and GeoJSON
export function rewind(duck, simple) {
  return duck?.stream ? geoRewindProjection(duck, simple) : duck?.type ? geoRewindFeature(duck, simple) : Array.isArray(duck) ? Array.from(duck, (d) => rewind(d, simple)) : duck;
}

export const geoRewindFeature = (feature, simple) => geoProjectSimple(feature, geoRewindStream(simple));

const geoRewindProjection = (projection, simple) => {
  const { stream: normalize } = geoRewindStream(simple);
  return { stream: (s) => normalize(projection.stream(s)) };
};

function geoRewindStream(simple = true) {
  let ring, polygon;
  return geoTransform({
    polygonStart() {
      this.stream.polygonStart();
      polygon = [];
    },
    lineStart() {
      if (polygon) polygon.push((ring = []));
      else this.stream.lineStart();
    },
    lineEnd() {
      if (!polygon) this.stream.lineEnd();
    },
    point(x, y) {
      if (polygon) ring.push([x, y]);
      else this.stream.point(x, y);
    },
    polygonEnd() {
      for (let [i, ring] of polygon.entries()) {
        ring.push(ring[0].slice());
        if (
          i
            ? // a hole must contain the first point of the polygon
              !geoContains({ type: 'Polygon', coordinates: [ring] }, polygon[0][0])
            : polygon[1]
            ? // the outer ring must contain the first point of its first hole (if any)
              !geoContains({ type: 'Polygon', coordinates: [ring] }, polygon[1][0])
            : // a single ring polygon must be smaller than a hemisphere (optional)
              simple && geoArea({ type: 'Polygon', coordinates: [ring] }) > 2 * Math.PI
        ) {
          ring.reverse();
        }

        this.stream.lineStart();
        ring.pop();
        for (const [x, y] of ring) this.stream.point(x, y);
        this.stream.lineEnd();
      }
      this.stream.polygonEnd();
      polygon = null;
    },
  });
}

function geoProjectSimple(object, projection) {
  const stream = projection.stream;
  let project;
  if (!stream) throw new Error('invalid projection');
  switch (object && object.type) {
    case 'Feature':
      project = projectFeature;
      break;
    case 'FeatureCollection':
      project = projectFeatureCollection;
      break;
    default:
      project = projectGeometry;
      break;
  }
  return project(object, stream);
}

function projectFeatureCollection(o, stream) {
  return { ...o, features: o.features.map((f) => projectFeature(f, stream)) };
}

function projectFeature(o, stream) {
  return { ...o, geometry: projectGeometry(o.geometry, stream) };
}

function projectGeometryCollection(o, stream) {
  return {
    ...o,
    geometries: o.geometries.map((o) => projectGeometry(o, stream)),
  };
}

function projectGeometry(o, stream) {
  return !o ? null : o.type === 'GeometryCollection' ? projectGeometryCollection(o, stream) : o.type === 'Polygon' || o.type === 'MultiPolygon' ? projectPolygons(o, stream) : o;
}

function projectPolygons(o, stream) {
  let coordinates = [];
  let polygon, line;
  geoStream(
    o,
    stream({
      polygonStart() {
        coordinates.push((polygon = []));
      },
      polygonEnd() {},
      lineStart() {
        polygon.push((line = []));
      },
      lineEnd() {
        line.push(line[0].slice());
      },
      point(x, y) {
        line.push([x, y]);
      },
    })
  );
  if (o.type === 'Polygon') coordinates = coordinates[0];
  return { ...o, coordinates, rewind: true };
}
