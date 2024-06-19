import { PATH_EXPLORE, URL_PATH_INDICATOR, URL_PATH_GEOGRAPHY, URL_PATH_SCENARIOS } from '$config';
import { loadFromStrapi, loadMetaData } from '$utils/apis.js';
import { buildURL } from '$utils/url.js';
import { get, find, compact, uniq, orderBy } from 'lodash-es';

const STORIES_ORDER_GEOGRAPHY_TYPE = ['admin0', 'eez', 'cities'];
const STORIES_ORDER_MODES = ['explore', 'avoid', 'adaptation'];

export const load = async ({ fetch }) => {
  const meta = await loadMetaData(fetch);
  const storiesRaw = await loadFromStrapi('stories', fetch);
  const caseStudies = await loadFromStrapi('case-study-dynamics', fetch);
  const videos = await loadFromStrapi('videos', fetch);

  const stories = orderBy(
    compact(
      storiesRaw.map(({ attributes }) => {
        const { Title: _title, Indicator: _indicatorUID, Type, GeographyType: _GeographyType, Geography: _geographyUID, Scenarios: scenarioUIDs } = attributes;
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
          };
        } else {
          return false;
        }
      })
    ),
    [(d) => STORIES_ORDER_GEOGRAPHY_TYPE.indexOf(d.geographyType), (d) => STORIES_ORDER_MODES.indexOf(d.mode)]
  );

  return {
    stories,
    videos: (videos ?? []).map(({ attributes }) => ({ video: attributes.video, title: attributes.title })),
    caseStudies: caseStudies.map((study) => ({
      city: meta.cities.find((d) => d.uid === study.attributes.CityUid) || { uid: 'nassau', label: 'Nassau' },
      abstract: study.attributes.Abstract,
    })),
  };
};
