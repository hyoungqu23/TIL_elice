## JavaScript 제어 흐름

### JavaScript 비동기

JavaScript는 다른 Multi Thread 프로그래밍 언어와 달리 Single Thread 방식으로 동작하므로, 비동기 작업을 다른 방식으로 처리한다.

### JavaScript Engine

JavaScript Engine은 하나의 Main Single Thread로 구성되며, 이러한 Main Thread는 코드를 읽어 한 줄씩 실행하고, 브라우저 환경에서는 유저 이벤트를 처리하고 화면을 그려낸다.

```javascript
setTimeout(() => {
  console.log("콜백 함수 입니다.");
}, 10000);
```

예를 들어, JavaScript의 대표적인 비동기 함수 `setTimeout()`의 실행 흐름을 확인해보면, `setTimeout()` 함수의 비동기 API가 작동하여 해당 함수를 JavaScript Engine이 아닌 별도의 Queue에 저장하고, 설정된 지연 시간이 지난 후에 Task Queue에 `setTimeout()` 함수의 종료와 콜백 함수의 실행을 알린다. JavaScript Engine은 Task Queue를 확인하여 현재 하는 일이 없다면 콜백 함수를 실행한다.

### 동기적 제어 흐름

동기적 방식의 제어 흐름은 현재 실행 중인 코드가 종료되기 전까지 다음 줄의 코드를 실행하지 않는 블로킹 방식을 의미한다. 분기문, 반복문, 함수 호출 등이 동기적으로 실행되는 대표적인 예이다.

즉, 이러한 동기적 방식의 제어 흐름은 코드의 실제 흐름이 동일하다. 다만, Single Thread 환경에서 Main Thread를 긴 시간 점유하면, 프로그램이 멈추게 된다는 점에 유의해야 한다.

```javascript
let a = 10;
console.log("a: ", a);

function foo(n) {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
}

foo(a);
```

또한, 이러한 동기적인 방식은 사용자의 요청에 따라 데이터를 반환하는 경우, 해당 사용자에 대한 데이터 반환 작업이 모두 종료되어야 다음 사용자에게 다른 요청을 받을 수 있다.

### 비동기적 제어 흐름

비동기적 제어 흐름은 현재 실행 중인 코드가 종료되기 전에 다음 라인의 코드를 실행하는 것을 의미한다. 대표적으로 Promise, 콜백 함수를 호출하는 함수(`setTimeout()` 등)은 비동기적으로 실행된다.

비동기적 제어 흐름의 경우, 코드 흐름과 실제 제어 흐름이 다르며, 비동기 작업을 기다리는 동안 Main Thread는 다른 작업을 처리한다.

```javascript
let a = 10;

setTimeout(() => {
  console.log("a: ", a);          // 3초 후 출력
}, 3000)

console.log("Finished");          // 먼저 출력
```
