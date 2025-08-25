export const initialItems = new Array(29_999_999).fill(0).map((_, index) => ({
  id: index,
  isselected: index === 29_999_999,
}));
