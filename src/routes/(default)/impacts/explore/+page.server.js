import { generatePageTitle } from '$utils/meta.js';
import { LABEL_FUTURE_IMPACTS } from '$config';

export const load = async () => {
  return {
    title: generatePageTitle(LABEL_FUTURE_IMPACTS),
  };
};
