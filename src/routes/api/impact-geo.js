import data from "$lib/../data/impact-geo.json";

export function get() {
  return {
    body: {
      ...data,
    },
  };
}
