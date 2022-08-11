import { writable, derived } from 'svelte/store';
import { END_GEO_SHAPE } from '$lib/../config.js';
import { handle } from '$lib/api/api.js';
import { CURRENT_GEOGRAPHY_UID } from './store.js';

export const GEO_SHAPE_CACHE = writable({});

export const GEO_SHAPE_DATA = derived(
  [GEO_SHAPE_CACHE, CURRENT_GEOGRAPHY_UID],
  async ([, $CURRENT_GEOGRAPHY_UID], set) => {
    console.log($CURRENT_GEOGRAPHY_UID);
    set(handle(END_GEO_SHAPE, 'get')[0]);
  }
);
