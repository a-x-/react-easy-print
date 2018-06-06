export const spliced = (array, i) => {
  const array_ = [...array];
  array_.splice(i, 1);
  return array_;
};

export const debug = (...args) => {
  if (!window.localStorage['react-easy-print-debug']) return;
  console.log(...args); // eslint-disable-line
};
