import { browser } from '$app/environment';

/**
 * Get a value from localstorage if not running on the server.
 * Uses the passed default value if localstorage is not available or empty.
 * @param {string} key - The location in the localstorage
 * @param {string} defaultValue - The fallback value
 */
export function getLocalStorage(key, defaultValue, process = (v) => v) {
  let local = browser ? window.localStorage.getItem(key) : defaultValue;
  if (local === 'undefined') {
    local = undefined;
  }
  return process(local ?? defaultValue);
}

/**
 * Stores a value in localstorage if not running not on the server
 * @param {string} key - The location in the localstorage
 * @param {string} value - The value to store
 */
export function setLocalStorage(key, value) {
  if (browser) {
    if (Boolean(value)) {
      window.localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }
}
