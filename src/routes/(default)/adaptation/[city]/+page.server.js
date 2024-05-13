import { error } from '@sveltejs/kit';
import { loadFromStrapi } from '$utils/apis.js';

export const load = async ({ fetch, parent, params }) => {
  const data = await loadFromStrapi('case-studies', fetch);
  const caseStudies = data.map((study) => ({ city: study.attributes.CityName, uid: study.attributes.CityUid, description: study.attributes.Abstract }));

  const city = caseStudies.find((d) => d.uid === params.city);
  if (!city)
    error(404, {
      message: 'City not available',
    });

  return { city, caseStudies };
};
