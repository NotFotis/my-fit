// const  removeDuplicateObjects = (arr) =>{
//     const map = new Map();
//     const result = [];
    
//     for (const obj of arr) {
//       if (!map.has(obj.id)) {
//         map.set(obj.id, true);
//         result.push(obj);
//       }
//     }
    
//     return result;
//   }
//   export default removeDuplicateObjects

export function removeDuplicateObjects(arr) {
  if(!Array.isArray(arr)){
    return [arr]
  }
  return arr.filter((obj, index, self) =>
    index === self.findIndex((t) => (
      t.id === obj.id
    ))
  );
}