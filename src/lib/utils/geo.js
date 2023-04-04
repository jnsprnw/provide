import { featureCollection } from '@turf/helpers';
import { polygon } from '@turf/helpers';

export const coordinatesToRectGrid = (
  data = [],
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
