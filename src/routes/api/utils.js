export const loadFromAPI = function (url, fetch) {
	return new Promise(async (resolve) => {
		const res = await fetch(`https://provide-cms.herokuapp.com/api/${url}?populate=*`);
	  const data = await res.json();
	  resolve(data.data);
	});
}
