import { error } from '@sveltejs/kit';
import { loadFromStrapi } from '$utils/apis.js';
import { parse } from 'marked';

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

  const caseStudyRaw = caseStudiesRaw.find((d) => d.attributes.CityUid === params.city)?.attributes;
  if (!caseStudyRaw)
    error(404, {
      message: 'City not available',
    });

  const caseStudy = {
    city: meta.cities.find(({ uid }) => uid === caseStudyRaw.CityUid),
    abstract: caseStudyRaw.Abstract,
    mainContent: caseStudyRaw.MainContent.map((c) => {
      const type = c.__component.split('.')[1];
      switch (type) {
        case 'avoiding-impacts':
          return {
            type,
            explorerUrl: c.ExplorerUrl,
            description: c.Description,
            geography: meta.cities.find((d) => d.uid === c.Geography),
            indicator: meta.indicators.find((d) => d.uid === c.Indicator),
            studyLocation: meta.studyLocations.find((d) => d.uid === c.StudyLocation),
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
            attribueLabel: c.AttributeLabel,
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
    }),
  };

  const caseStudies = caseStudiesRaw.map((study) => ({
    id: study.id,
    city: meta.cities.find((c) => c.uid === study.attributes.CityUid),
    abstract: study.attributes.Abstract,
  }));

  return { caseStudy, caseStudies, caseStudyRaw };
};
