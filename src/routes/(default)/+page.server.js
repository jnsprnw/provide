import { PATH_EXPLORE, URL_PATH_INDICATOR, URL_PATH_GEOGRAPHY, URL_PATH_SCENARIOS, URL_PATH_SCENARIO, END_IMPACT_GEO, COLOR_SCALES } from '$config';
import qs from 'qs';
import { loadFromAPI, loadFromStrapi, loadMetaData } from '$utils/apis.js';
import { buildURL } from '$utils/url.js';
import { get, find, compact, uniq, orderBy, mapValues } from 'lodash-es';
import { coordinatesToContours, coordinatesToRectGrid, getColorScale } from '$src/lib/utils/geo.js';
import simplify from '@turf/simplify';

const STORIES_ORDER_GEOGRAPHY_TYPE = ['admin0', 'eez', 'cities'];
const STORIES_ORDER_MODES = ['explore', 'avoid', 'adaptation'];

export const prerender = true;

export const load = async ({ fetch }) => {
  const meta = await loadMetaData(fetch);
  const storiesRaw = await loadFromStrapi('stories', fetch);
  const caseStudies = await loadFromStrapi('case-study-dynamics', fetch);
  const videos = await loadFromStrapi('videos', fetch);

  const stories = orderBy(
    compact(
      storiesRaw.map(({ attributes }) => {
        const { Title: _title, Order: order, Indicator: _indicatorUID, Type, GeographyType: _GeographyType, Geography: _geographyUID, Scenarios: scenarioUIDs } = attributes;
        let geographyUID = _geographyUID.trim();
        let title = _title?.trim();
        let indicatorUID = _indicatorUID.trim();
        let geographyType = _GeographyType.trim();
        const geography = find(get(meta, [geographyType], []), {
          uid: geographyUID,
        });
        const indicator = find(get(meta, 'indicators', []), {
          uid: indicatorUID,
        });
        const scenarioList = uniq(scenarioUIDs.map(({ UID }) => UID.trim()));
        const scenarios = compact(scenarioList.map((uid) => find(get(meta, 'scenarios', []), { uid }))).slice(0, 3);
        if (geography && indicator && scenarios.length) {
          const query = buildURL(Type, { [URL_PATH_INDICATOR]: indicatorUID, [URL_PATH_GEOGRAPHY]: geographyUID, [URL_PATH_SCENARIOS]: scenarioList });
          return {
            id: `${Type}-${geographyType}`,
            title,
            geography,
            indicator,
            scenarios,
            geographyType,
            mode: Type,
            url: `${PATH_EXPLORE}/${Type}${query}`,
            order,
          };
        } else {
          return false;
        }
      })
    ),
    [(d) => STORIES_ORDER_GEOGRAPHY_TYPE.indexOf(d.geographyType), (d) => STORIES_ORDER_MODES.indexOf(d.mode)]
  );

  // const storiesDataRequests = stories.map(({ geography, indicator, scenarios }) => {
  //   const query = qs.stringify({
  //     [URL_PATH_GEOGRAPHY]: geography.uid,
  //     [URL_PATH_INDICATOR]: indicator.uid,
  //     [URL_PATH_SCENARIO]: scenarios[0].uid,
  //     ...mapValues(indicator.parameters, (options) => options[0]),
  //   });

  //   return loadFromAPI(`${import.meta.env.VITE_DATA_API_URL}/${END_IMPACT_GEO}?${query}`, undefined, { indicator });
  // });

  // const storiesData = (await Promise.all(storiesDataRequests)).map(({ data, coordinatesOrigin: origin, resolution }) => {
  //   const colorScale = getColorScale([data], COLOR_SCALES.simple);
  //   const geoData =
  //     resolution < 0.5
  //       ? coordinatesToContours(data, { resolution, origin, colorScale })
  //       : coordinatesToRectGrid(data, {
  //           origin,
  //           resolution,
  //           colorScale,
  //         });
  //   return geoData;
  // });

  return {
    stories,
    videos: (videos ?? []).map(({ attributes }) => ({ video: attributes.video, title: attributes.title })),
    caseStudies: caseStudies.map((study) => ({
      city: meta.cities.find((d) => d.uid === study.attributes.CityUid) || { uid: 'nassau', label: 'Nassau' },
      abstract: study.attributes.Abstract,
    })),
  };
};
