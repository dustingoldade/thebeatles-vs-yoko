export function returnRandomItemInArray(obj) {
  const index = Math.round((obj.length - 1) * Math.random());
  return obj[index];
}
