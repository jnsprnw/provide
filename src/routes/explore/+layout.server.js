import { loadMetaData } from '$utils/apis.js';
export const load = async ({ fetch }) => {
  const meta = await loadMetaData(fetch);
  return {
    meta,
  };
};
