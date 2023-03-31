export function isInArray(arr, element) {
    if(!Array.isArray(arr)){
      return false
    }
    return arr.indexOf(element) !== -1;
  }