# 0426 Post

## JavaScript 제어 흐름

### JavaScript 비동기

JavaScript는 다른 Multi Thread 프로그래밍 언어와 달리 Single Thread 방식으로 동작하므로, 비동기 작업을 다른 방식으로 처리한다.

### JavaScript Engine

JavaScript Engine은 하나의 Main Single Thread로 구성되며, 이러한 Main Thread는 코드를 읽어 한 줄씩 실행하고, 브라우저 환경에서는 유저 이벤트를 처리하고 화면을 그려낸다. 이러한 Main Thread는 브라우저 렌더링, 코드의 실행 등의 작업을 하므로, 어떤 작업이 Main Thread를 긴 시간 점유하면, 작업이 실행되는 동안 프로그램은 멈추게 된다. 따라서 긴 시간의 처리가 필요한 작업은 비동기로 실행하도록 로직을 구성하는 것이 좋다.

다만, 비동기 등을 처리하는 모듈은 여러 Thread로 구성될 수 있다.

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

비동기적 제어 흐름의 경우, 코드 흐름과 실제 제어 흐름이 다르며, 비동기 작업을 기다리는 동안 Main Thread는 다른 작업을 처리한다. 즉, JavaScript Engine이 특정 코드를 실행하고 있어도, 비동기 처리에 의한 작업은 JavaScript Engine 외부에서 별도로 실행될 수 있고, 이 경우 비동기 작업이 실행되는 동안에도 Main Thread는 코드를 실행하고 브라우저를 렌더링하게 된다.

```javascript
let a = 10;

setTimeout(() => {
  console.log("a: ", a);          // 3초 후 출력
}, 3000)

console.log("Finished");          // 먼저 출력
```

## Event Loop

JavaScript Engine은 비동기 처리를 제공하지 않는다. 따라서 정해진 함수인 **API**(`setTimeout()`, `XMLHttpRequest`, `fetch()` 등의 Web API)를 활용해 비동기 처리를 할 수 있다. 참고로 Node.js의 경우 비동기 처리 API로 파일 처리 API, 암호화 API 등을 제공한다.(Node.js 환경의 경우 `libuv` 라는 모듈에서 비동기 처리를 담당)

```javascript
// 타이머 비동기 처리
setTimeout(() => console.log("타이머 끝"), 1000)
setInterval(() => console.log("인터벌 타이머"), 1000)

// 네트워크 처리
fetch("https://google.com")
  .then(() => console.log("네트워크 요청 성공"))
  .catch(() => console.log("네트워크 요청 실패"))
```

비동기 함수가 호출되면, Web API에 존재하게 되는데, 이때 특정 조건을 만족하면 비동기 환경의 Task Queue로 넘어가게 된다. 이후, 비동기 함수가 처리되면 내부의 콜백 함수는 Event Loop에 의해 Call Stack이 비어있는 경우 Call Stack로 이동하여 실행된다.

이렇게 비동기 코드를 처리하는 모듈인 Web API, Event Loop, Task Queue, Job Queue 등은 JavaScript Engine 외부에 존재한다. API 모듈은 비동기 요청을 처리한 후에 Task Queue에 콜백 함수를 이동시키고, Call Stack이 비어있는 경우 Event Loop에 의해 해당 콜백 함수가 Call Stack으로 이동되어 실행된다. 즉, 비동기 처리가 끝나면, Task Queue에 콜백 함수가 들어가고, Event Loop가 Call Stack이 비워질 때 Task Queue에서 콜백 함수를 꺼내 Call Stack에 넣는다.

참고로, Event Loop는 콜 스택이 비워졌을 때, Task Queue에서 콜백 함수가 들어온 순서대로 함수를 내보낸다. 단, Queue는 여러 개가 존재하며 그 중 우선순위가 높은 Queue(Job Queue 등)에서 나중에 들어온 콜백 함수가 실행될 수 있다.

```javascript
request("user-data", (userData) => {
  console.log("userData Loaded");
  saveUsers(userData)
});

console.log("DOM 변경");
console.log("유저 입력");
```
