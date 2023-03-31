export function removeObjectsById(arr, idsToRemove) {
    return arr.filter(obj => !idsToRemove.includes(obj.Id));
  }