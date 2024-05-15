import { loadFromStrapi } from '$utils/apis.js';
import { parse } from 'marked';

export const load = async ({ fetch, parent }) => {
  const { meta } = await parent();
  const { attributes } = await loadFromStrapi('adaptation', fetch);
  const caseStudies = await loadFromStrapi('case-study-dynamics', fetch);

  const publications = (attributes.Publications.data || []).map((d) => ({ ...d.attributes }));

  return {
    caseStudies: caseStudies.map((study) => ({ city: meta.cities.find((d) => d.uid === study.attributes.CityUid), description: study.attributes.Description })),
    description: attributes.Description,
    introText: parse(attributes.IntroText ?? ''),
    introTitle: attributes.IntroTitle,

    selfAssessmentSubtitle: attributes.SelfAssessmentSubtitle,
    selfAssessmentText: parse(attributes.SelfAssessmentText ?? ''),
    selfAssessmentTitle: attributes.SelfAssessmentTitle,

    integrationTitle: attributes.IntegrationTitle,
    integrationText: parse(attributes.IntegrationText ?? ''),

    publicationsTitle: attributes.PublicationsTitle,
    publications,

    outroText: parse(attributes.OutroText ?? ''),
    outroTitle: attributes.OutroTitle,
    attributes,
  };
};
