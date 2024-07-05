import { generatePageTitle } from '$utils/meta.js';
import { LABEL_AVOID_IMPACTS } from '$config';

export const load = async () => {
  return {
    title: generatePageTitle(LABEL_AVOID_IMPACTS),
  };
};
