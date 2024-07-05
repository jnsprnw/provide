import { rewind } from '$lib/utils/geo-rewind.js';
import intersect from '@turf/intersect';
import { featureCollection } from '@turf/helpers';
import { WORKER_MESSAGE_START, STATUS_FAILED, STATUS_FINISHED, STATUS_PROCESSING } from '$config';

self.onmessage = (e) => {
  const { geoData, geoShape, message } = e.data;
  if (message === WORKER_MESSAGE_START) {
    if (geoData && geoShape) {
      const maskedGeoData = createMask(geoData, geoShape);
      postMessage({ data: maskedGeoData, status: STATUS_FINISHED });
    } else {
      console.warn(`No geoData and geoShape send to web worker.`);
      postMessage({ message: 'Can not process data. Data is missing.', status: STATUS_FAILED });
    }
  } else {
    console.warn(`Unknown message posted to web worker.`);
    postMessage({ message: 'Can not process data. Unknown command.', status: STATUS_FAILED });
  }
};

function createMask(geoData, geoShape) {
  // We need to build our own masking of the data and the shapefile of the geo shape provided by the API
  const lengthTotal = geoData.reduce((acc, { features }) => acc + features.length, 0);
  let counter = 0;
  // postMessage({ status: STATUS_PROCESSING, stepsCurrent: counter, stepsTotal: lengthTotal });
  return geoData.map(({ features, label }) => {
    // Loop through the different data layer
    const processedFeatures = rewind(features).map((feature) => {
      // The feature collection consists of multiple features. They all need to be masked individually
      // We calculate the intersection of the feature (data layer) and the geo shape
      let intersection;
      try {
        intersection = intersect(feature, geoShape);
      } catch (error) {
        // console.error(error);
        console.warn(`Invalid geography. Could not calculate intersection.`);
        intersection = feature;
      }
      postMessage({ status: STATUS_PROCESSING, stepsCurrent: counter++, stepsTotal: lengthTotal });
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
