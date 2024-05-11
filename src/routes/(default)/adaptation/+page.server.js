import { loadFromStrapi } from '$utils/apis.js';
import { parse } from 'marked';

export const load = async ({ fetch }) => {
  const { attributes } = await loadFromStrapi('adaptation', fetch);
  const caseStudies = await loadFromStrapi('case-studies', fetch);

  return {
    caseStudies: caseStudies.map((study) => ({ city: study.attributes.CityName, uid: study.attributes.CityUid, description: study.attributes.Abstract })),
    description: attributes.Description,
    introText: parse(attributes.IntroText ?? ''),
    introTitle: attributes.IntroTitle,

    selfAssessmentSubtitle: attributes.SelfAssessmentSubtitle,
    selfAssessmentText: parse(attributes.SelfAssessmentText ?? ''),
    selfAssessmentTitle: attributes.SelfAssessmentTitle,

    integrationTitle: attributes.IntegrationTitle,
    integrationText: parse(attributes.IntegrationText ?? ''),

    publicationsTitle: attributes.PublicationsTitle,
    publications: attributes.Publications.data || [],
    deliverables: attributes.Deliverables.data || [],

    outroText: parse(attributes.OutroText ?? ''),
    outroTitle: attributes.OutroTitle,
  };
};
