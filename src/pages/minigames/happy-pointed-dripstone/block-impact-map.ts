const ImpactMap = new Map([
  [1, [0, 15]],
  [2, [2, 13]],
  [3, [3, 12]],
  [4, [5, 10]],
  [5, [4, 11]],
  [6, [0, 15]],
  [7, [2, 13]],
  [8, [3, 12]],
  [9, [5, 10]],
  [10, [4, 11]],
]);

export default function checkImpact(offset: number, id: number) {
  if (id > 10) return true;
  if (id == 0) return false;
  const impact = ImpactMap.get(id);
  if (impact == undefined) return false;
  console.log(id)
  return offset > impact[0] * 2 && offset <= impact[1] * 2;
}
