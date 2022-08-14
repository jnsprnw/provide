// Load data from Strapi
export const loadFromStrapi = function (url, fetch) {
  return new Promise(async (resolve) => {
    const res = await fetch(
      `https://provide-cms.herokuapp.com/api/${url}?populate=*`
    );
    const data = await res.json();
    resolve(data.data);
  });
};

//const timeout = () => new Promise((res) => setTimeout(() => res(), 2000));

// Load data from Climate Analytics API
// We use the fetch function provided by Svelte if provided.
export const loadFromAPI = function (url, query, svelteFetch = fetch) {
  return new Promise(async (resolve) => {
    const res = await svelteFetch(`${url}?${query}`); // ${import.meta.env.VITE_DATA_API_URL}
    const data = await res.json();
    //await timeout();
    resolve(data);
  });
};
