const SIZE = 100;

const mod = (a, n) => ((a % n) + n) % n;

function rotate(
  current: number,
  rotation: string
): { newValue: number; zeroCount: number } {
  const direction = rotation[0] as "L" | "R";
  const quantity = Number(rotation.slice(1));
  return direction === "L"
    ? rotateLeft(current, quantity)
    : rotateRight(current, quantity);
}

function rotateLeft(current: number, quantity: number) {
  const tempValue = current - quantity;
  const newValue = mod(tempValue, SIZE);
  let zeroCount = Math.abs(Math.floor(tempValue / SIZE));
  if (newValue === 0) zeroCount++;
  if (current === 0) zeroCount--;
  return { newValue, zeroCount };
}

function rotateRight(current: number, quantity: number) {
  const tempValue = current + quantity;
  return {
    newValue: mod(tempValue, SIZE),
    zeroCount: Math.floor(tempValue / SIZE),
  };
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
  let totalZeroCount = 0;
  let current = 50;
  for (const rotation of input) {
    const { newValue, zeroCount } = rotate(current, rotation);
    totalZeroCount += zeroCount;
    current = newValue;
  }
  return totalZeroCount;
}

console.log(solve());
