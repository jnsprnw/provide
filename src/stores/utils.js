import { browser } from "$app/env";

const cache = {};

export const fetchOrRetrieve = async (urls, set, process) => {
  if (!browser) return;
  const allCached = urls.every((url) => cache[url]);

  if (allCached) {
    const cached = urls.map((url) => cache[url]);
    const processed = process ? process(cached) : { response: cached };
    set({ ...processed, status: "success" });
  } else {
    set({ status: "loading" });

    const promises = urls.map(async (url) => {
      const response = await fetch(url);
      const body = await response.json();
      return body;
    });

    Promise.all(promises).then((responses) => {
      responses.forEach((response, i) => (cache[urls[i]] = response));
      const processed = process ? process(responses) : { response: responses };
      set({ ...processed, status: "success" });
    });
  }
};
