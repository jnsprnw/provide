import tippy from 'tippy.js';
import { roundArrow } from 'tippy.js';

export default function popover(node, params) {
  const instance = tippy(node, {
    theme: 'dark',
    allowHTML: true,
    maxWidth: params.maxWidth || 350,
    interactive: params.interactive || false,
    placement: params.placement || 'top',
    duration: params.duration || 0,
    arrow: roundArrow,
    onShow() {
      params.IS_ACTIVE?.set(true);
    },
    onHide() {
      params.IS_ACTIVE?.set(false);
    },
    content() {
      return params.content;
    },
  });
  return {
    update: ({ template, content }) => {
      instance.setContent(template ? template : content);
    },

    destroy: () => instance.destroy(),
  };
}
