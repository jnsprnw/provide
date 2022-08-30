import { get as take } from 'lodash-es';
import { loadFromStrapi, loadFromAPI } from '$lib/../routes/api/utils.js';

export async function get() {
  const descriptionIndicators = await loadFromStrapi('indicators', fetch);
  const descriptionScenarios = await loadFromStrapi('scenarios', fetch);
  const meta = await loadFromAPI(
    `${import.meta.env.VITE_DATA_API_URL}/meta/`,
    fetch
  );
  return {
    body: {
      ...meta,
      indicators: meta.indicators.map((indicator) => {
        const description = take(
          descriptionIndicators.find((d) => d.attributes.UID === indicator.uid),
          ['attributes', 'Description']
        );
        return {
          ...indicator,
          description,
        };
      }),
      scenarios: meta.scenarios.map((indicator) => {
        const description = take(
          descriptionScenarios.find((d) => d.attributes.UID === indicator.uid),
          ['attributes', 'Description']
        );
        return {
          ...indicator,
          description,
        };
      }),
    },
  };
}
