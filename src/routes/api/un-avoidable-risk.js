import data from "$lib/../data/un-avoidable-risk.json";

export function get() {
  return {
    body: {
      ...data,
    },
  };
}
