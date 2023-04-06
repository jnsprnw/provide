import { parse } from 'marked';
import { kebabCase } from 'lodash-es';
import { loadFromStrapi } from '$utils/apis.js';

export const load = async ({ fetch }) => {
  const data = await loadFromStrapi('technical-documentation', fetch);

  const {
    Models,
    Scenarios,
    ModelsIntro,
    ScenariosIntro,
    DataProcessing,
    DataProcessingIntro,
  } = data.attributes;

  return {
    content: {
      modelsIntro: parse(ModelsIntro || ''),
      models: Models.map(({ Title, Description, Link, Label }) => {
        return {
          title: Title,
          slug: kebabCase(Label || Title),
          description: Description && parse(Description),
          link: Link,
          label: Label || Title,
        };
      }),
      scenariosIntro: parse(ScenariosIntro || ''),
      scenarios: Scenarios.map(({ Title, Description, Label }) => {
        return {
          title: Title,
          slug: kebabCase(Label || Title),
          description: Description && parse(Description),
          label: Label || Title,
        };
      }),
      dataProcessingIntro: parse(DataProcessingIntro || ''),
      dataProcessing: DataProcessing.map(({ Title, Description, Label }) => {
        return {
          title: Title,
          slug: kebabCase(Label || Title),
          description: Description && parse(Description),
          label: Label || Title,
        };
      }),
    },
  };
};
