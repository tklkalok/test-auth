export const getArrSum = (arr: number[]) =>
  arr.reduce((sum, current) => sum + current, 0);

export const getTotalPointByArray = (pointArr: number[]) => {
  const sum = getArrSum(pointArr);
  return sum % 10;
};
