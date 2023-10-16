import tippy from 'tippy.js';

export default function popover(node, params) {
  if (params.content) {
    node.setAttribute('aria-label', params.content);
  }

  const instance = tippy(node, {
    theme: 'tomato',
    allowHTML: false,
    content: params.content,
    arrow: false,
    offset: [0, 5],
    duration: [300, 0],
  });

  if (typeof params.content === 'undefined') {
    instance.disable();
  } else {
    instance.enable();
  }

  return {
    update: (newParams) => {
      if (typeof newParams.content === 'undefined') {
        instance.disable();
      } else {
        instance.setProps({ content: newParams.content });
        instance.enable();
      }
    },
    destroy: () => instance.destroy(),
  };
}
