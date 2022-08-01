// This file loads the list of indicators and merges it with a list of indicator descriptions.
import { parse } from 'marked';
import { loadFromAPI } from './utils.js';
import { INDICATORS } from '$lib/../config.js';
import { find, get } from "lodash-es";

export const load = async ({ fetch }) => {
	const descriptions = await loadFromAPI('indicators', fetch);
	const indicators = INDICATORS.map(indicator => {
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
