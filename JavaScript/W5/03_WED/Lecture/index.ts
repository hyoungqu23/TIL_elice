import fs from "fs/promises";
// node `.mgs`여야만 import문 사용할 수 있다.(16버전 이후 변화 중)

function sayHelloTo(target: string) {
  console.log(`Hello, ${target}`);
}

function addTwoValues(first: number, second: number): number {
  return first + second;
}

async function main() {
  sayHelloTo("World");
  addTwoValues(100, 1000);
  const samples = await fs.readFile("./sample.json", "utf8"); // readFile을 읽어올 때 utf-8 방식으로 가져오기 때문에 string
  console.log(samples);
}

main();
