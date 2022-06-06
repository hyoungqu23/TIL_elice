console.log("Hello, world!");

// for Loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while Loop
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

while (i < 5) {
  i++;
  console.log(i);
}

// Conditional Statements
let j = 30;
if (j === 30) {
  console.log(true);
} else {
  console.log(false);
}

// CTO
j === 30 ? console.log(true) : console.log(false);

// Function Statements
let a = 0;
function hello() {
  a++;
  console.log(a);
}

hello();

for (let a = 0; a < 100; a++) { // scope가 달라 `a` 활용 가능하나 권장되지 않음
  hello();
}

// Hoisting (비권장사항)


// parameter 갯수 >> 호출 시 인자 : undefined 할당
// parameter 갯수 << 호출 시 인자 : 초과되는 것 제외

// 46page var 의 이해
function printMessage(message, times) {
  for (var i = 0; i < times; i++) {
    console.log(message);
  }
  console.log(`value of i is ${i}`);
}
printMessage('hello', 3);

function printMessage2(message, times) {
  for (let i = 0; i < times; i++) {
    console.log(message);
  }
  console.log(`value of i is ${i}`);
}
printMessage2('hello', 3);

// array
let arr = [1, 2, 3];
console.log(arr[1]);

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

arr.map(function (value) {
  console.log(value);
});

let obj = {1: 'price', 2: 'tax', 3: 'item'};