const calc = require('./calc');
const func = require('./func');
// calc.js 처럼 확장자를 끝까지 작성하지 않아도 된다.

console.log(calc.add1(10, 20));
console.log(calc.sub(20, 10));
console.log(calc.mul(10, 20));
console.log(calc.div(20, 10));
console.log('========')
// console.log('Called: ' + func());

// for (let i = 0; i < 10; i++) {
//   // console.log(func);
//   console.log(func());
// }

for (let i = 0; i < 10; i++) {
  console.log(func.num1)
}
console.log('========')
for (let i = 0; i < 10; i++) {
  console.log(func.func1())
}

console.log('========')

const a = func();
console.log(a()); // 1
console.log(a()); // 2

// number 초기화
const b = func();
console.log(b()); // 1
console.log(b()); // 2