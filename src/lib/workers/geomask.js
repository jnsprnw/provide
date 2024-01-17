import { rewind } from '$lib/utils/geo-rewind.js';
import intersect from '@turf/intersect';
import { featureCollection } from '@turf/helpers';

self.onmessage = (e) => {
  const { geoData, geoShape } = e.data;
  const maskedGeoData = createMaske(geoData, geoShape);
  postMessage({ data: maskedGeoData });
};

function createMaske(geoData, geoShape) {
  // We need to build our own masking of the data and the shapefile of the geo shape provided by the API
  return geoData.map(({ features, label }) => {
    // Loop through the different data layer
    const processedFeatures = rewind(features).map((feature, i) => {
      // The feature collection consists of multiple features. They all need to be masked individually
      // We calculate the intersection of the feature (data layer) and the geo shape
      let intersection = feature;
      try {
        intersection = intersect(feature, geoShape);
      } catch (error) {
        // console.error(error);
        console.warn(`Invalid geography`);
        intersection = feature;
      }
      postMessage({ current: i, max: features.length });
      return {
        ...intersection,
        properties: {
          // because the properties are lost by the intersection, we add them again
          ...feature.properties,
        },
      };
    });
    // We rebuild the geo data object
    return {
      label,
      data: featureCollection(processedFeatures), // The individual features are combined to a feature collection again
    };
  });
}
