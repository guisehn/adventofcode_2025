type IdRange = [number, number];

function isInvalidId(id: number) {
  const str = id.toString();
  if (str.length === 1) return false;

  for (let parts = 2; parts <= str.length; parts++) {
    const partsList = splitId(str, parts);
    if (partsList && allEqual(partsList)) return true;
  }

  return false;
}

// splitId('123456', 2) -> ['123', '456']
// splitId('123456', 3) -> ['12', '34', '56']
// splitId('123456', 4) -> ['1', '2', '3', '4', '5', '6']
function splitId(id: string, parts: number) {
  if (id.length % parts !== 0) return null;

  const step = id.length / parts;
  const result: string[] = [];
  for (let i = 0; i < id.length; i += step) result.push(id.slice(i, i + step));
  return result;
}

// rangeToList([1, 5]) -> [1, 2, 3, 4, 5]
function rangeToList([start, end]: IdRange) {
  let list: number[] = [];
  for (let i = start; i <= end; i++) list.push(i);
  return list;
}

function getInvalidIds(range: IdRange) {
  const list = rangeToList(range);
  return list.filter(isInvalidId);
}

function readInput() {
  const content = require("fs").readFileSync("./input.txt", "utf8") as string;
  return content
    .trim()
    .split(",")
    .map((range) => range.split("-").map(Number) as IdRange);
}

const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

const allEqual = (arr: any[]) => arr.every((item) => item === arr[0]);

function solve() {
  const input = readInput();
  const invalidIds = input.map(getInvalidIds).flat();
  return sum(invalidIds);
}

console.log(solve());
