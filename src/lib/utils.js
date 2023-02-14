import { uniq } from 'lodash-es';

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
      value:
        obj.type === 'literal'
          ? obj.value
          : arr.find((d) => d[key] === obj.value),
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
