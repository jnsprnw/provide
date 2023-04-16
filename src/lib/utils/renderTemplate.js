import { compile, render } from 'squirrelly';

export default function renderTemplate(template, data) {
  const processedTemplate = template.replace(/\{\{/g, '{{it.');
  const compiledTemplate = compile(processedTemplate);

  let renderedTemplate;
  try {
    renderedTemplate = render(compiledTemplate, data);
  } catch (e) {
    console.error(e);
    renderedTemplate = '';
  }
  return renderedTemplate;
}
