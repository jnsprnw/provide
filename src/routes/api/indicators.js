// This file loads the list of indicators and merges it with a list of indicator descriptions.
import { parse } from 'marked';
import { loadFromStrapi } from './utils.js';
import { find, get } from "lodash-es";

export const load = async ({ fetch }) => {
	const indicators = await fetch(`${import.meta.env.VITE_DATA_API_URL}/meta/`);
	const descriptions = await loadFromStrapi('indicators', fetch);
	return indicators.map(indicator => {
		const description = get(find(descriptions, ['attributes', 'UID']), 'Description', '');
		return {
			...indicator,
			description: parse(description)
		}
	})

  return {
  	props: {
  		indicators
  	}
  };
}
