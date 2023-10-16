import { writable } from 'svelte/store';
import tippy from 'tippy.js';

export const ACTIVE_POPOVER = writable(null);

export default function popover(node, params) {
  const instance = tippy(node, {
    theme: 'light-border',
    allowHTML: true,
    maxWidth: params.maxWidth || 350,
    interactive: params.interactive || false,
    placement: params.placement || 'top',
    duration: params.duration || 0,
    arrow: false,
    onShow() {
      // await tick
      ACTIVE_POPOVER.set(params.uid);
      params.IS_ACTIVE?.set(true);
    },
    onHide() {
      ACTIVE_POPOVER.set(null);
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
