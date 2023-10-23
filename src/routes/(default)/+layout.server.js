import { loadMetaData } from '$utils/apis.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
  const meta = await loadMetaData(fetch);
  return {
    meta,
  };
}
