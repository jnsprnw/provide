import data from "$lib/../data/global_h-ssp119.json";

export function get() {
  return {
    body: {
      ...data,
    },
  };
}
