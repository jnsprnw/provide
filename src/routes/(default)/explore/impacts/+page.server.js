import { generatePageTitle } from '$utils/meta.js';

export const load = async () => {
  const title = generatePageTitle('Explore impacts');

  return {
    title,
  };
};
