import _, { template as compile } from 'lodash-es';

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g,
  evaluate: /\{\{=(.+?)\}\}/g,
};

export default function renderTemplate(template, data) {
  try {
    return compile(template)(data);
  } catch (e) {
    console.error(e);
    return '';
  }
}
