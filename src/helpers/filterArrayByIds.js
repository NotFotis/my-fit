export function filterArrayByIds(array, ids) {
    return array.filter(item => ids.includes(item.id));
  }