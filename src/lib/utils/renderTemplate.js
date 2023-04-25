import _, { template as compile } from 'lodash-es';

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g,
  evaluate: /\{\{=(.+?)\}\}/g,
};

console.log(compile('ab {{a.b}}')({ a: { b: 2 } }));

export default function renderTemplate(template, data) {
  try {
    return compile(template)(data);
    //console.log(template, data, renderedTemplate);
  } catch (e) {
    console.error(e);
    return '';
  }
}
