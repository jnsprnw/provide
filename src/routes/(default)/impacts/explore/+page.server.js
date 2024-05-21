import { generatePageTitle } from '$utils/meta.js';
import { LABEL_FUTURE_IMPACTS } from '$config';
import { loadFromStrapi } from '$src/lib/utils/apis.js';

export const load = async ({ fetch }) => {
  // const caseStudiesRaw = await loadFromStrapi(
  //   'case-study-dynamics',
  //   fetch,
  // );

  return {
    title: generatePageTitle(LABEL_FUTURE_IMPACTS),
  };
};
