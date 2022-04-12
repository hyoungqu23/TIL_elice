# JavaScript 기초
```javascript
var number = 5;

console.log(number++);        // 5 출력 후 연산 +1 진행
console.log(--number);        // -1 연산 이후 결과 값 5 출력
```

## 변수 생성
변수는 데이터를 담는 공간을 의미합니다.

자바스크립트에서 변수를 생성하려면 var 변수명;을, 변수의 데이터를 콘솔에서 확인하려면 console.log(변수명);을 작성해야 합니다.

그리고 변수의 데이터를 웹 화면에 출력하기 위해서는 document.write(변수명)을 사용하실 수 있습니다.
```javascript
var num
num = 1;

var str = "Hello World"
str = "Nice to meet you";

console.log(num);
console.log(str);

document.write(num);
document.write(str);

let n1 = 1;
let n2 = 2;
let s1 = "1";
let s2 = "2";

document.write(n1 + n2 + '<br>');
document.write(s1 + s2);
```

## 배열
배열은 비슷한 성격을 갖고 있는 복수의 데이터를, 하나의 변수 안에 관리하기 위해 사용됩니다.

배열은 index와 값으로 구성되어 있습니다.
```javascript
var vegetables = ["carrot", "cucumber", "onion"];
```

## 프로퍼티와 메서드 - 문자열
문자열 메서드로는 length, charAt, split 등이 있습니다. [참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String)
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

## 프로퍼티와 메서드 - Math
Math 객체의 메서드로는 abs, ceil, floor, random 등이 있습니다. [참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math)
```javascript
Math.abs(-12);  // 12
Math.ceil(3.4);  // 4
Math.floor(5.6);  //5
Math.random();  // 0과 1 사이의 임의의 숫자 출력
```

## 조건문 - else if 문
else if문은 여러 개의 조건문을 생성할 때 사용되는 조건문입니다.
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

## 자바스크립트 활용 - 소수 출력하기
while문과 if~else문을 사용하여, 소수를 판별하는 함수 isPrime의 코드를 작성해 봅시다! 소수란 약수가 1과 자기 자신밖에 없는 수입니다. 또, 1은 소수가 아닙니다.
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

## 자바스크립트 활용 - 문자열 거꾸로 출력하기
for문을 사용하여, 함수의 인자로 전달된 문자를 거꾸로 출력하는 함수 reverse의 코드를 작성해 봅시다!
```javascript
function reverse(str) {
    let reverStr = "";
    for (let i = str.length-1; i >= 0; i--) {
        reverStr += str.charAt(i);
    }
    return reverStr
}
```

## 배열의 정렬
```javascript
function sortStringArray(arr) {
    return arr.sort();
}

const reverseStringArray = (arr) => {
    return arr.sort().reverse();
}
```

## 객체 조회하기

## 비교 연산자

## 소수

## 조건 - switch

## 배열 forEach, push, map, join

## toString