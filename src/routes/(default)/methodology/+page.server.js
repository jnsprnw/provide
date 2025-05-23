import { loadFromStrapi } from '$utils/apis.js';
import { generatePageTitle } from '$utils/meta.js';
import { kebabCase } from 'lodash-es';
import { parse } from 'marked';
import { stringify } from 'qs';
import { LABEL_DOCUMENTATION } from '$config';

export const load = async ({ fetch }) => {
  const methodology = await loadFromStrapi(
    'methodology',
    fetch,
    stringify({
      populate: ['DataType', 'DataType.Model', 'DataType.Simulation', 'DataType.Processing'],
    })
  );

  const title = generatePageTitle(LABEL_DOCUMENTATION);

  if (!methodology) {
    console.warn('No methodology found. This is likely a Strapi issue. Check if you have rights to access the data.');
    return {
      title,
      methodology: [],
    };
  }

  return {
    title,
    methodology: methodology.attributes.DataType.map(({ Label, Model, Simulation, Processing }) => {
      return {
        title: Label.trim(),
        slug: kebabCase(Label),
        models: Model.map(({ Label, Description }) => {
          return {
            title: (Label ?? '').trim(),
            slug: kebabCase(Label),
            description: parse(Description ?? ''),
          };
        }).filter(({ title, description }) => title && description),
        simulation: Simulation.map(({ Label, Description }) => {
          return {
            title: (Label ?? '').trim(),
            slug: kebabCase(Label),
            description: parse(Description ?? ''),
          };
        }).filter(({ title, description }) => title && description),
        processing: Processing.map(({ Label, Description }) => {
          return {
            title: (Label ?? '').trim(),
            slug: kebabCase(Label),
            description: parse(Description ?? ''),
          };
        }).filter(({ title, description }) => title && description),
      };
    }),
  };
};
