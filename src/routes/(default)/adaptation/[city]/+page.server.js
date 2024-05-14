import { error } from '@sveltejs/kit';
import { loadFromStrapi } from '$utils/apis.js';

export const load = async ({ fetch, parent, params }) => {
  const data = await loadFromStrapi(
    'case-studies',
    fetch,
    [`populate[0]=CurrentContext`, `populate[1]=FutureHeatstress.ImpactTimeSnapshot.Snapshot`, `populate[2]=FutureHeatstress.ImpactGeoSnapshot.Image`].join('&')
  );
  //const caseStudiesDynamic = await loadFromStrapi('case-study-dynamics', fetch, [`populate[MainContent][populate]=*`].join('&'));

  const caseStudiesDynamic = await loadFromStrapi(
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

  const caseStudies = data.map((study) => ({
    id: study.id,
    city: study.attributes.CityName,
    uid: study.attributes.CityUid,
    description: study.attributes.Abstract,
    ...study.attributes,
    //content: study.attributes.MainContent.map((component) => ({ ...component, type: component.__component.split('.')[1] })),
  }));

  const caseStudy = caseStudies[0]; //.find((d) => d.uid === params.city);
  if (!caseStudy)
    error(404, {
      message: 'City not available',
    });

  //const fullCaseStudy = await loadFromStrapi(`case-studies/${caseStudy.id}`, fetch, 'populate[MainContent][populate]=*');

  return { caseStudy, caseStudies, caseStudiesDynamic };
};
