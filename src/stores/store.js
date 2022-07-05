import { writable } from 'svelte/store';

export const CURRENT_INDICATOR = writable(null);
export const CURRENT_SECTOR = writable(null);
export const CURRENT_GEOGRAPHY = writable(null);
export const CURRENT_SCENARIOS = writable([]);
