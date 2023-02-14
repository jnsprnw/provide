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
    modelsIntro: parse(ModelsIntro || ''),
    models: Models.map(({ Title, Description, Link, Label }) => {
      let description = undefined;
      if (Description) {
        description = parse(Description);
      }
      return {
        title: Title,
        slug: kebabCase(Label || Title),
        description,
        link: Link,
        label: Label || Title,
      };
    }),
    scenariosIntro: parse(ScenariosIntro || ''),
    scenarios: Scenarios.map(({ Title, Description, Label }) => {
      let description = undefined;
      if (Description) {
        description = parse(Description);
      }
      return {
        title: Title,
        slug: kebabCase(Label || Title),
        description,
        label: Label || Title,
      };
    }),
    dataProcessingIntro: parse(DataProcessingIntro || ''),
    dataProcessing: DataProcessing.map(({ Title, Description, Label }) => {
      let description = undefined;
      if (Description) {
        description = parse(Description);
      }
      return {
        title: Title,
        slug: kebabCase(Label || Title),
        description,
        label: Label || Title,
      };
    }),
  };
};
