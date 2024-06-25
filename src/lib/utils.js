import _, { kebabCase, uniq } from 'lodash-es';
import { extractEndYear } from '$utils/meta.js';
import { formatValue } from '$utils/formatting';

export const formatReadableList = function (arr, key) {
  const segments = formatObjArr(arr, key);
  return segments.map((s) => (s.type === 'element' ? s.value[key] : s.value)).join('');
};

export const formatObjArr = function (arr, key) {
  const formatter = new Intl.ListFormat('en-GB', {
    style: 'long',
    type: 'conjunction',
  });
  // We have to do an two extra steps because the formatToParts function does not allow object but requires strings
  // First, we map a string from each object
  // Second, we use the find function to bring back the object
  const list = formatter.formatToParts(arr.map((d) => d[key]));
  return list.map((obj) => {
    return {
      ...obj,
      value: obj.type === 'literal' ? obj.value : arr.find((d) => d[key] === obj.value),
    };
  });
};

export const formatList = function (_arr = []) {
  const arr = _arr.filter(Boolean);
  if (arr.length === 0) {
    return '';
  }
  const formatter = new Intl.ListFormat('en-GB', {
    style: 'long',
    type: 'conjunction',
  });
  const list = uniq(arr.map((d) => String(d)));
  return {
    label: formatter.format(list),
    length: list.length,
  };
};

export function extractEndYearFromScenarios(available, selectable) {
  const valid = uniq(selectable.map((s) => s.endYear));

  return _(available)
    .map((s) => extractEndYear(s))
    .uniq()
    .sort()
    .map((uid) => ({ uid: parseInt(uid), label: uid, disabled: !valid.includes(uid) }))
    .value();
}

export function slugify(name) {
  return kebabCase(
    name
      .toString()
      .trim()
      .toLowerCase()
      .replace(/ô|ö|ò|ó/g, 'o')
      .replace(/è|é|ë/g, 'e')
      .replace(/ü/g, 'u')
      .replace(/ï|ì|í/g, 'i')
      .replace(/\W+/g, '-')
      .replace(/^\W|\W$/g, '')
  );
}

export function getMarginLeft(valueMax, unit, minMargin = 40) {
  const str = String(formatValue(valueMax, unit));
  return Math.max(str.length * 8, minMargin);
}

// Returns the largest availalbe image url based on the specified size
// Valid sizes are the ones provided by strapi/cloudinary (large, medium, small, thumbnail)
export const getStrapiImageAtSize = (image) => {
  const { hash, url } = image;
  const regex = /(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload)/;

  const match = url.match(regex);
  const extractedUrl = match ? match[0] : '';
  const newURL = extractedUrl + '/f_auto,q_auto/' + hash;

  return newURL;
};
