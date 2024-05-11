import { error } from '@sveltejs/kit';
import { loadFromStrapi } from '$utils/apis.js';

export const load = async ({ fetch, parent, params }) => {
  const data = await loadFromStrapi('case-studies', fetch);

  const cities = [
    {
      uid: 'lisbon',
      name: 'Lisbon',
    },
    {
      uid: 'islamabad',
      name: 'islamabad',
    },
    {
      uid: 'nassau',
      name: 'Nassau',
    },
    {
      uid: 'berlin',
      name: 'Berlin',
    },
  ];

  const city = cities.find((d) => d.uid === params.city);
  if (!city)
    error(404, {
      message: 'City not available',
    });

  return { cities, city, data };
};
