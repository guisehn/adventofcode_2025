const SIZE = 100;

const mod = (a, n) => ((a % n) + n) % n;

function rotate(current: number, rotation: string) {
  const direction = rotation[0] as "L" | "R";
  const quantity = Number(rotation.slice(1));

  if (direction === "L") {
    return mod(current - quantity, SIZE);
  }

  return mod(current + quantity, SIZE);
}

function readInput() {
  const content = require("fs").readFileSync("./input.txt", "utf8") as string;
  return content
    .trim()
    .split("\n")
    .map((line) => line.trim());
}

function solve() {
  const input = readInput();
  let zeroCount = 0;
  let current = 50;
  for (const rotation of input) {
    current = rotate(current, rotation);
    if (current === 0) zeroCount++;
  }
  return zeroCount;
}

console.log(solve());
