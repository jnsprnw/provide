import { writable } from 'svelte/store';
import tippy from 'tippy.js';

export const ACTIVE_TOOLTIP = writable(null);

export default function tooltip(node, params) {
  const instance = tippy(node, {
    theme: 'light-border',
    allowHTML: true,
    maxWidth: params.maxWidth || 350,
    interactive: params.interactive || false,
    placement: params.placement || 'top',
    duration: params.duration || 0,
    //content: params.content,
    onShow() {
      // await tick
      ACTIVE_TOOLTIP.set(params.uid);
      params.IS_ACTIVE?.set(true);
    },
    onHide(instance) {
      ACTIVE_TOOLTIP.set(null);
      params.IS_ACTIVE?.set(false);
    },
    content() {
      return params.content;
    },
  });

  return {
    update: ({ template, content }) => {
      instance.setContent(template ? template.innerHTML : content);
    },

    destroy: () => instance.destroy(),
  };
}
