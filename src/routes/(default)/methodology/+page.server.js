import { loadFromStrapi, trimLinebreakAtEnd } from '$utils/apis.js';
import { kebabCase } from 'lodash-es';
import { parse } from 'marked';

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
      models: Models.map(({ UID, Title, Description, Link, Label }) => {
        const title = Title.trim();
        const description = trimLinebreakAtEnd(Description);
        if (!title.length || !description.length) {
          return false;
        }
        return {
          title,
          slug: kebabCase(UID || Label || title),
          content: parse(description),
          link: Link,
          label: Label || title,
        };
      }).filter((d) => Boolean(d)),
      scenariosIntro: parse(ScenariosIntro || ''),
      scenarios: Scenarios.map(({ UID, Title, Description, Label }) => {
        const title = Title.trim();
        const description = Description.trim();
        if (!title.length || !description.length) {
          return false;
        }
        return {
          title,
          slug: kebabCase(UID || Label || title),
          content: parse(description),
          label: Label || title,
        };
      }).filter((d) => Boolean(d)),
      dataProcessingIntro: parse(DataProcessingIntro || ''),
      dataProcessing: DataProcessing.map(({ Title, Description, Label }) => {
        const title = Title.trim();
        const description = Description.trim();
        if (!title.length || !description.length) {
          return false;
        }
        return {
          title,
          slug: kebabCase(Label || title),
          content: parse(description),
          label: Label || title,
        };
      }).filter((d) => Boolean(d)),
    },
  };
};
