# 0502

## JavaScript 심화

### Single Thread vs Multi Thread

Thread는 비유적으로 일하는 사람을 말한다. 즉, 한 사람이 주어진 작업을 하나씩 처리하는 방식을 Single Thread라고 한다. 이와 달리 Multi Thread는 여러 사람이 주어진 작업을 처리하는 방식을 의미한다.

Single Thread는 경쟁 상태가 존재하지 않고, 코드의 복잡도가 낮은 반면(문제에 대비하기 위해 코드의 길이가 길어질 수 밖에 없다.)에 병렬적 처리보다 평균적으로 성능이 떨어지게 된다.

Multi Thread는 평균적으로 Single Thread보다 성능이 매우 높지만, 사용 시 경쟁 상태를 고려해야 하고, 코드 복잡도가 높아진다.

#### 경쟁 상태

둘 이상이 동시에 작업을 진행하면 실시간 데이터가 적용되지 않는 정보의 불일치와 같은 비정상적인 작업 흐름이 발생할 수 있다.(한 사람이 작업을 할 때 다른 사람이 작업할 수 없게끔 lock, mutex가 필요)

```javascript
// Lock 걸기 -> 해당 작업을 소유
let lock = 0;  // 0 or 1

function deposit(amount) {
  while (lock === 1) {}        // lock 걸려있으면 무한 대기
  lock = 1;                    // lock 걸기(해당 작업을 소유함)
  let value = getDataFromAccount();
  value += amount;
  savaDataToAccount(value);
  lock = 0;                    // lock 풀기(해당 작업 소유를 해제함)
}

function withdraw(amount) {
  while (lock === 1) {}
  lock = 1;
  let value = getDataFromAccount();
  value -= amount;
  savaDataToAccount(value);
  lock = 0;
}
```

JavaScript는 대표적인 Single Thread 언어인데, 이 상황에서 성능을 극대화하기 위해 비동기 처리 방식을 채용하게 된다.(과거 서버 중심적이었던 웹에서 클라이언트, 유저 중심적으로 변화하면서 브라우저의 역할이 커지게 되었다.)

### Blocking vs non-Blocking

Blocking 방식은 하나의 작업이 마치고 나서 다음 작업이 실행하는 순차적 실행 방식으로, 작업이 길어지면 다음 작업이 지연되는 문제가 있다. JavaScript의 **동기(synchronous)**와 혼용된다.

```javascript
function foo() {
  return 1;
}

function bar() {
  return 'something';
}

function main() {
  foo();
  bar();
}

main();

> 1
> something
```

```javascript
function makeAmericano() {
  const startTime = Data.now();
  while (Data.now() - startTime < 600000) {}
  return 'Americano';
}

function order(itemName) {
  let item;
  if (itemName === "americano") {
    item = makeAmericano();
  }
}

function main() {
  const americano = order("americano");
  console.log("아메리카노 받음")
  moveToSeat();
}
```

non-Blocking 방식은 하나의 작업을 실행시키고, 그 작업이 종료되지 않아도 다음 작업을 실행하는 방식으로, 작업을 실행시켜 놓기만 하는 방식이다. 작업이 길어지더라도 다음 작업이 지연되는 문제가 없고, 보통 결과 값을 return문으로 바로 받지 못하며, 콜백 함수를 통해 받는 경우가 많다.(단, Promise의 증당으로 콜백 함수가 아닌 then 메서드를 통해 받게 된다.) JavaScript에서는 비동기(asynchronous)와 혼용된다.

```javascript
function makeAmericano(callback) {
  setTimeout(() => callback('americano'), 60000)
}

function order(itemName, callback) {
  if (itemName === "americano") {
    makeAmericano(callback);
  }
}

function main() {
  order("americano", (item) => {
    moveToCasher();
    console.log("아메리카노 받음")
  });
  moveToSeat();
  watchYouTube();
}
```

return을 통해 반환할 것이 없고, 콜백 함수(진동벨)를 통해 비동기적으로 처리된다. 비동기 작업은 위임이라고 생각하면 편하다. 위 코드는 setTimeout() Web API에게 위임해 병렬적으로 실행된다. 콜백 함수를 사용한다고 무조건 비동기도 아니고, 병렬적으로 처리되는 것도 아니다.

위임하면, 불러줄때까지 해당 작업이 끝났는지 알 수 없다. 따라서 콜백 함수를 통해 해당 작업이 끝날 때 해당 함수를 호출해 그 작업이 끝난 시점을 인지하고, 그 작업의 결과값을 받기 위해 호출한다. 즉, 비동기는 끝났을 때 본인이 정의한 콜백 함수를 호출하게 된다.

### JavaScript 실행 환경(Runtime)

JavaScript 실행 환경(Runtime)는 크게 3가지로 구성된다. JavaScript Engine, Event Loop와 Queue, 외부 APIs가 있다.

#### JavaScript Engine

JavaScript 코드를 읽어서 해석하고 작업을 수행하는 역할로, 인터프리터 언어인 JavaScript를 읽어 해석하고 작업을 수행한다. 이때, 엔진 자체는 작업을 수행만 할 뿐 비동기/동기와 관계가 없다.(V8, SpiderMonkey, JavaScriptCore(safari))

#### Event Loop와 Queue

JavaScript 코드가 비동기적으로 처리될 수 있도록 도와주는 역할을 담당한다.

**Queue**는 비동기 작업을 마친 후 실행될 **콜백 함수**가 쌓이는 곳이다. Task Queue, Job Queue 등이 있다.(우선순위로 인해 나누어짐)

**Event Loop**는 Queue 쌓여있는 우선순위에 따라 콜백 함수들을 꺼내 JavaScript Engine에게 전달해주는 역할을 담당한다. JavaScript Engine은 해당 함수들을 전달 받은 순서대로 실행하게 된다.(Node.js의 libuv)

#### 외부 APIs

비동기/동기 작업들의 묶음으로, 비동기 작업의 실행은 대부분 외부 API를 통해 일어난다. JavaScript는 외부 API를 사용해 비동기 작업을 위임하며, 작업이 종료되었을 때 실행되는 콜백 함수를 대부분 해당 API의 매개변수로 전달하게 된다. 작업이 완료되면, Queue에 콜백 함수가 등록되게 된다.(브라우저의 WEB APIs, Node.js의 기본 라이브러리, setTimeout, setInterval, fetch, console, fs, path)

> Node.js에서는 특정 모듈은 불러오지 않아도 된다. 자비롭게 제공하기 때문이다.(console, setTimeout 등)
> Node.js는 Web API에 있는 라이브러리를 가져와서 모듈로 제공하는 것이다.(완전히 동일하지 않음)
> `console` 객체의 `log` 메소드는 외부 API이지만 동기적으로 실행되기 때문에 자바스크립트 엔진 해석시 콜 스택에 바로 올라가게 된다.

### JavaScript에서 비동기 작업을 수행하는 방식 << 다시 듣기

#### 콜백 패턴

콜백 함수는 작업이 종료되었을 때 해당 작업이 종료되었음과 해당 작업의 결과 값을 사용할 수 있도록 반환해주는 함수이다.(고차함수와 헷갈리지 않도록 한다.)

비동기 작업들은 return이 아닌 별도의 결과를 반환하는 방식이 필요해 콜백 패턴을 활용하게 되었다. 만약 콜백이 없었다면, JavaScript는 비동기 작업의 완료 여부를 지속적이고 수동적으로 확인해야 했기 때문에 프로그래밍적으로 낭비가 된다. 이는 JavaScript가 함수를 일급 객체(함수의 변수 취급이 가능한 특성)로 취급했기에 가능했다.

```javascript
fs.readFile('/data/sample.json', (err, data) => {
  if (err) throw err;
  console.log('data를 가져왔습니다.');
});

console.log('종료')

> 종료
> data를 가져왔습니다.
```

콜백 패턴의 경우 비동기 작업을 순차적으로 실행하고자 콜백 함수를 중첩적으로 활용하면 이러한 중첩 함수로 인해 가로로 코드가 길어지는 문제가 발생할 수 있다. 이를 콜백 지옥이라고 하는데, 이는 매우 좋지 않은 DX(Developer Experience)를 제공하게 된다.

#### Promise 패턴

콜백 지옥에서 벗어나고, 콜백 패턴을 더 일관성 있는 로직으로 보여주기 위한 필요성이 증대되면서 Promise 패턴이 등장했다. 로직 상 순차적으로 호출되어야 하는 비동기 함수들을 쉽게 연결해주는 `then` 메서드, 비동기 함수에서 에러가 발생했을 때 쉽게 에러 처리를 할 수 있도록 해주는 `catch` 메서드을 활용한다. 즉, 비동기 함수를 일관성 있는 형식으로 관리하게 되었다.(`then`, `catch`, `finally`)

이러한 Promise 패턴은 체이닝 기법과 가독성 향상을 유도하여 DX를 향상시키고, 기타 비동기 함수의 기능(`all`: 일련의 비동기 작업의 결과를 배열로 반환, `allSettled`: 몇개 정도 작업이 성공되면 결과를 가져옴, `any`: 하나라도 성공하면 결과 값을 반환, `race`: 가장 먼저 끝난 비동기 작업의 결과를 반환 등)을 추가하게 되었다.

> 비동기는 사실상 위임 작업의 결과값이 필요하기 때문에 발생한 것이다.

```javascript
Promise.race([fetch, () => setTimeout(() => {}, 3000)]);
```

```javascript
// Promise 패턴 구조

fetch('/data/sample.json')
  .then(response => response.json())
  .then(samples => samples.map(sample => sample.id))
  .catch(error => console.log(error.message))
```

> 이벤트 핸들러는 Promise 패턴으로 할 수 없다.

초기에는 호환성 문제가 있었다. ES 표준이 되기 이전에 만들어진 비동기 함수들은 Promise화를 해야 했다.

```javascript
// Promise화 한 setTimeout
function promisifiedSetTimeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}
```

여전히 연결되는 비동기 함수가 많아질수록 길어지는 then 체인에 의해 아쉬운 DX를 제공하고, 비동기 환경을 처음 접할 때 복잡하기 때문에 이해하기가 어렵다는 점이 문제가 된다.

```javascript
setTimeoutPromise(1000)
  .then(asyncFn1)
  .then(asyncFn2)
  .then(asyncFn3)
  .then(() => {
    // do Something
  })
  .then(asyncFn4)
  .then(asyncFn5)
  ...
```

#### Async/Await 패턴

비동기 코드를 동기 코드처럼 확인할 수 있게 만드는 패턴으로, 가독성 향상, 처음 봐도 읽기 쉬움, 코드 흐름도 알기 쉬움, 많은 사람들에게 익숙한 문법 등이라는 장점을 가지고 있다. 또한, 높은 호환성으로 Promise 패턴으로 되어있는 비동기 함수들을 `async` / `await` 키워드만으로 손쉽게 치환할 수 있다.

```javascript
async function main() {
  try {
    const response = await fetch('/data/sample.json');
  } catch (error) {
    
  }
}
```

> 오늘날의 JavaScript는 Worker Thread를 통해 Multi Thread를 지원한다.
