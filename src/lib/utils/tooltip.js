import tippy from 'tippy.js';

export default function popover(node, params) {
  node.setAttribute('aria-label', params.content);

  const instance = tippy(node, {
    theme: 'tomato',
    allowHTML: false,
    content: params.content,
    arrow: false,
    offset: [0, 5],
    duration: [300, 0],
  });

  return {
    update: (newParams) => tip.setProps({ content, ...newParams }),
    destroy: () => instance.destroy(),
  };
}
