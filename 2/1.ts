type IdRange = [number, number];

function isInvalidId(id: number) {
  const str = id.toString();
  if (str.length === 1) return false;

  const part1 = str.slice(0, str.length / 2);
  const part2 = str.slice(str.length / 2);

  return part1 === part2;
}

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

function solve() {
  const input = readInput();
  const invalidIds = input.map(getInvalidIds).flat();
  return sum(invalidIds);
}

console.log(solve());
