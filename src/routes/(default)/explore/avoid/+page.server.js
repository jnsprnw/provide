import { generatePageTitle } from '$utils/meta.js';

export const load = async () => {
  const title = generatePageTitle('Avoiding impacts');

  return {
    title,
  };
};
