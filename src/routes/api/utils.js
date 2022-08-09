// Load data from Strapi
export const loadFromStrapi = function (url, fetch) {
	return new Promise(async (resolve) => {
		const res = await fetch(`https://provide-cms.herokuapp.com/api/${url}?populate=*`);
	  const data = await res.json();
	  resolve(data.data);
	});
}

// Load data from Climate Analytics API
export const loadFromAPI = function (url, query) {
	return new Promise(async (resolve) => {
		const res = await fetch(`${url}?${query}`); // ${import.meta.env.VITE_DATA_API_URL}
	  const data = await res.json();
	  resolve(data);
	});
}
