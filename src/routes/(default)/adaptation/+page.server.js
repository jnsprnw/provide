import { loadFromStrapi } from '$utils/apis.js';
import { parse } from 'marked';

export const load = async ({ fetch }) => {
  const { attributes } = await loadFromStrapi('adaptation', fetch);
  const caseStudies = await loadFromStrapi('case-studies', fetch);

  const publications = (attributes.Publications.data || []).map((d) => ({ ...d.attributes, type: 'publication' }));
  const deliverables = (attributes.Deliverables.data || []).map((d) => ({ ...d.attributes, type: 'deliverable' }));

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
    publications: [...publications, ...deliverables],

    outroText: parse(attributes.OutroText ?? ''),
    outroTitle: attributes.OutroTitle,
  };
};
