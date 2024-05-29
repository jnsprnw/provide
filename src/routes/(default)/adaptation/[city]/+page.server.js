import { error } from '@sveltejs/kit';
import { loadFromAPI, loadFromStrapi } from '$utils/apis.js';
import qs from 'qs';
import { parse } from 'marked';
import { END_AVOIDING_IMPACTS, END_AVOIDING_REFERENCE, URL_PATH_CERTAINTY_LEVEL, URL_PATH_GEOGRAPHY, URL_PATH_INDICATOR, URL_PATH_LEVEL_OF_IMPACT } from '$src/config.js';
import { scaleLinear } from 'd3-scale';
import { each } from 'lodash-es';

export const load = async ({ fetch, parent, params }) => {
  const { meta } = await parent();

  const caseStudiesRaw = await loadFromStrapi(
    'case-study-dynamics',
    fetch,
    [
      `populate[MainContent][on][future-impacts.future-impacts][populate][ImpactTimeSnapshot][populate]=Image`,
      `populate[MainContent][on][future-impacts.future-impacts][populate][ImpactGeoSnapshot][populate]=Image`,
      `populate[MainContent][on][image-slider.image-slider][populate][ImageSliderPair][populate]=Image1`,
      `populate[MainContent][on][image-slider.image-slider][populate][ImageSliderPair][populate]=Image2`,
      `populate[MainContent][on][avoiding-impacts.avoiding-impacts][populate]=*`,
      `populate[MainContent][on][section.section][populate]=*`,
    ].join('&')
  );

  const caseStudyOutro = (await loadFromStrapi('case-study-outro', fetch)).attributes;

  const caseStudyRaw = caseStudiesRaw.find((d) => d.attributes.CityUid === params.city)?.attributes;
  if (!caseStudyRaw) error(404, { message: 'No case study available for this city' });

  const city = meta.cities.find((c) => c.uid === caseStudyRaw.CityUid);
  if (!city) error(404, { message: 'City not found in data' });

  const loadAvoidingImpactsData = async ({ Indicators, StudyLocations }) => {
    // Load all avoiding impacts reference data
    const refRequests = Indicators.map(({ Uid: indicatorUid }) => {
      const indicator = meta.indicators.find((d) => d.uid === indicatorUid);
      if (!indicator) error(404, { message: `Indicator ${indicatorUid} not found in metadata` });

      const query = qs.stringify({
        [URL_PATH_GEOGRAPHY]: caseStudyRaw.CityUid,
        [URL_PATH_INDICATOR]: indicator.uid,
      });

      return loadFromAPI(`${import.meta.env.VITE_DATA_API_URL}/${END_AVOIDING_REFERENCE}?${query}`, undefined, { indicator });
    }, []);

    const refData = await Promise.all(refRequests);

    // For each indicator load a number of sample impact levels and likelihood
    const dataRequests = refData.reduce((acc, { impact_levels, indicator }) => {
      const impactSteps = scaleLinear().domain(impact_levels.range_of_interest).ticks(5);

      impactSteps.forEach((impactLevel) => {
        meta.likelihoods.forEach((likelihood) => {
          const query = qs.stringify({
            [URL_PATH_GEOGRAPHY]: caseStudyRaw.CityUid,
            [URL_PATH_INDICATOR]: indicator.uid,
            [URL_PATH_LEVEL_OF_IMPACT]: impactLevel,
            [URL_PATH_CERTAINTY_LEVEL]: likelihood.uid,
          });

          acc.push(loadFromAPI(`${import.meta.env.VITE_DATA_API_URL}/${END_AVOIDING_IMPACTS}?${query}`, undefined, { indicator, impactLevel, likelihood }));
        });
      });
      return acc;
    }, []);

    const data = await Promise.all(dataRequests);

    // Process loaded data so we have an array of study location/indicator combinations each
    // containing an array of scenario/impact level/likelihood combination
    const processedData = refData.reduce((acc, { indicator }) => {
      const indicatorData = data.filter((d) => d.indicator.uid === indicator.uid);

      StudyLocations.forEach(({ Uid: studyLocationUid }) => {
        const studyLocation = meta.studyLocations.find((d) => d.uid === studyLocationUid);
        if (!studyLocation) error(404, { message: `Study location ${studyLocationUid} not found in metadata` });
        const table = [];
        indicatorData.forEach((indicatorData) => {
          each(indicatorData.study_locations[studyLocationUid].scenarios, ({ year }, scenario) => {
            table.push({
              ...indicatorData,
              studyLocation,
              indicator,
              year: { uid: year, label: year },
              scenario: meta.scenarios.find((d) => d.uid === scenario),
            });
          });
        });
        acc.push(table);
      });

      return acc;
    }, []);

    return processedData;
  };

  const caseStudy = {
    city,
    abstract: caseStudyRaw.Abstract,
    authors: caseStudyRaw.Authors,
    mainContent: await Promise.all(
      caseStudyRaw.MainContent.map(async (c) => {
        const type = c.__component.split('.')[1];
        switch (type) {
          case 'avoiding-impacts':
            return {
              type,
              explorerUrl: c.ExplorerUrl,
              description: c.Description,
              indicators: c.Indicators,
              title: c.Title,
              data: await loadAvoidingImpactsData(c),
            };
          case 'future-impacts':
            return {
              type,
              explorerUrl: c.ExplorerUrl,
              impactGeoDescription: c.ImpactGeoDescription,
              impactTimeDescription: c.ImpactTimeDescription,
              impactGeoSnapshots: c.ImpactGeoSnapshot.map((snpsht) => ({
                indicator: meta.indicators.find((d) => d.uid === snpsht.Indicator),
                year: snpsht.Year,
                image: snpsht.Image.data?.attributes,
              })),
              impactTimeSnapshots: c.ImpactTimeSnapshot.map((snpsht) => ({
                indicator: meta.indicators.find((d) => d.uid === snpsht.Indicator),
                image: snpsht.Image.data?.attributes,
              })),
            };
          case 'image-slider':
            return {
              type,
              explorerUrl: c.ExplorerUrl,
              description: c.Description,
              attributeLabel: c.AttributeLabel,
              groupingLabel: c.GroupingLabel,
              allowImageSelection: c.AllowImageSelection,
              showThumbnails: c.ShowThumbnails,
              imagePairs: c.ImageSliderPair.map((img) => ({
                image1: img.Image1.data?.attributes,
                image2: img.Image2.data?.attributes,
                description: img.Description?.trim(),
                attribute: { uid: img.AttributeValue?.trim(), label: img.AttributeValue?.trim() },
                group: { uid: img.GroupValue?.trim(), label: img.GroupValue?.trim() },
              })),
            };
          default:
            return {
              type,
              title: c.Title,
              text: parse(c.Text),
            };
        }
      })
    ),
  };

  const caseStudies = caseStudiesRaw.map((study) => ({
    id: study.id,
    city: meta.cities.find((c) => c.uid === study.attributes.CityUid),
    abstract: study.attributes.Abstract,
  }));

  return { caseStudy, caseStudies, caseStudyOutro: { title: caseStudyOutro?.Title, text: caseStudyOutro?.Text }, author: caseStudy.authors, description: caseStudy.abstract };
};
