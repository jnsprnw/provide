import tippy from 'tippy.js';
import { roundArrow } from 'tippy.js';

export default function popover(node, params) {
  if (params.content) {
    node.setAttribute('aria-label', params.content);
  }

  const instance = tippy(node, {
    theme: 'dark',
    allowHTML: false,
    content: params.content,
    arrow: roundArrow,
    offset: [0, 10],
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
