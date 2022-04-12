# JavaScript 주요 개념

## 변수
변수는 데이터를 담는 공간을 의미한다. `let`, `var`로 변수를 생성할 수 있지만, 보통 `let`이 권장된다.
```javascript
let num
num = 1;

let str = "Hello World"
str = "Nice to meet you";

console.log(num);               // 브라우저의 콘솔에 출력
console.log(str);

document.write(num);            // 웹 페이지에 출력
document.write(str);

let n1 = 1;
let n2 = 2;
let s1 = "1";
let s2 = "2";

document.write(n1 + n2 + '<br>');
document.write(s1 + s2);
```

## String DataType의 Method
문자열 메서드로는 `length`, `charAt`, `split` 등이 있다. [참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String)
```javascript
var str1 = "Hi!Elice";

str1.length;  // 8
str1.charAt(1);  // i
str1.split("!");  // [Hi, Elice]
```

```javascript
function repeatString(str, num) {
    return str.repeat(num);
};
```

## Number DataType
### `Math` 객체
`Math` 객체의 메서드로는 `abs`, `ceil`, `floor`, `random` 등이 있다. [참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math)
```javascript
Math.abs(-12);  // 12
Math.ceil(3.4);  // 4
Math.floor(5.6);  //5
Math.random();  // 0과 1 사이의 임의의 숫자 출력
```

## 연산자

### 증감 연산자
`++`, `--`는 숫자를 하나 늘리거나 줄이는 데 사용되는 연산자이다.
```javascript
var number = 5;

console.log(number++);        // 5 출력 후 연산 +1 진행
console.log(--number);        // -1 연산 이후 결과 값 5 출력
```

### 비교 연산자
`>`, `>=`, `<`, `<=`로 대소 비교를 할 수 있고, `==`,`===`, `!=`, `!==` 연산자를 활용해 동등 비교를 할 수 있다.
```javascript
console.log(1 > 2);             // false
console.log(1 >= 2);            // false
console.log(1 < 2);             // true
console.log(1 <= 2);            // true
console.log(1 == '1');          // true
console.log(1 != '1');          // false
console.log(1 === '1');         // false
console.log(1 !== '1');         // true
```

## 조건문
### `if` ~ `else if` ~ `else`문
`if` ~ `else if` ~ `else`문은 여러 개의 조건문을 생성할 때 사용되는 조건문이다.
```javascript
var a = 3;
var b = 6;
var c = 9;

if ( a > b ) { 
 document.write("a는 b보다 크다.");
} else if ( b > c ) { 
 document.write("b는 c보다 크다.");
} else if ( a < c ) { 
 document.write("a는 c보다 작다.");
} else if ( b < c ) { 
 document.write("b는 c보다 작다.");
} else { 
 document.write("모든 조건을 만족하지 않는다.");
}
```

## `switch`문
복수의 `if` 조건문은 `switch`문으로 바꿀 수 있다. `switch`문을 사용하면 특정 변수를 다양한 상황에서 비교할 수 있어 코드 자체가 비교 상황을 잘 설명한다는 장점이 있다.
```javascript
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

## 배열
배열은 비슷한 성격을 갖고 있는 복수의 데이터를, 하나의 변수 안에 관리하기 위해 사용된다. 배열은 `index`와 `value`로 구성되어 있다.
```javascript
var vegetables = ["carrot", "cucumber", "onion"];
```

배열의 맨 앞이나 끝에 요소를 추가, 제거하는 Method는 다음과 같다.
- `arr.push(...items)` – 맨 끝에 요소 추가
- `arr.pop()` – 맨 끝 요소 제거
- `arr.shift()` – 맨 앞 요소 제거
- `arr.unshift(...items)` – 맨 앞에 요소 추가

### 배열의 정렬: `sort()`
```javascript
function sortStringArray(arr) {
    return arr.sort();
}

const reverseStringArray = (arr) => {
  return arr.sort().reverse();
}
```

### 배열의 반복 작업 실행: `forEach()`
arr.forEach는 주어진 함수를 배열 요소 각각에 대해 실행할 수 있게 해준다.
```javascript
arr.forEach(function(item, index, array) {
  // 요소에 무언가를 할 수 있습니다.
});
```
### 배열의 `map()`
`map()`은 배열 요소 전체를 대상으로 함수를 호출하고, 함수 호출 결과를 배열로 반환한다.
```javascript
let result = arr.map(function(item, index, array) {
  // 요소 대신 새로운 값을 반환합니다.
});
```
### 배열의 `join()`
배열 요소를 모두 합친 후 하나의 문자열을 만들어준다.
```javascript
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // 배열 요소 모두를 ;를 사용해 하나의 문자열로 합칩니다.

alert( str ); // Bilbo;Gandalf;Nazgul
```

## JavaScript 활용 - 소수 출력하기
while문과 if~else문을 사용해 약수가 1과 자기 자신밖에 없는 수인 소수를 판별할 수 있다.
```javascript
function isPrime(n) {
  var divisor = 2;
  if (n == 1) return false;
  while (n > divisor) {
    if (n % divisor === 0) {
      return false;
    } else {
      divisor++;
    }
  }
  return true;
}
```

## JavaScript 활용 - 문자열 거꾸로 출력하기
for문을 사용하여, 함수의 인자로 전달된 문자를 거꾸로 출력하는 함수를 작성할 수 있다.
```javascript
function reverse(str) {
    let reverStr = "";
    for (let i = str.length-1; i >= 0; i--) {
        reverStr += str.charAt(i);
    }
    return reverStr
}
```