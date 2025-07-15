function getLabelArray(num: number): number[] {
  const result: number[] = [];

  for (let i = 1; i <= num; i++) {
    result.push(i);
  }
  return result;
}

export default getLabelArray;
