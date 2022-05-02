# 0502

## JavaScript 심화

### Single Thread vs Multi Thread

Thread는 비유적으로 일하는 사람을 말한다. 즉, 한 사람이 주어진 여러 작업을 하나씩 처리하는 방식을 Single Thread 방식이라고 한다. 이와 달리 Multi Thread 방식은 여러 사람이 주어진 여러 작업을 처리하는 방식을 의미한다.

Single Thread 방식은 경쟁 상태가 존재하지 않고, 코드의 복잡도가 낮은 반면(문제 상황을 모두 대비하기 위해 코드의 길이가 길어질 수 밖에 없다.)에 병렬적 처리보다 평균적으로 성능이 떨어지게 된다.

Multi Thread 방식은 평균적으로 Single Thread보다 성능이 매우 높지만, 사용 시 경쟁 상태를 고려해야 하고, 코드 복잡도가 높아진다.

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

JavaScript는 대표적인 Single Thread 방식의 언어인데, 이 상황에서 성능을 극대화하기 위해 비동기 처리 방식을 채용하게 된다.

과거 서버, 제공자 중심적이었던 WEB 1.0에서의 JavaScript는 단순히 웹 페이지에 약간의 기능을 추가하는 정도의 역할만 맡은 것에 비해 WEB 2.0으로 발전하면서, 클라이언트와 브라우저, 유저 중심적이 되면서 사용자도 브라우저에서 데이터를 입력, 수정하게 되었다. 따라서 이러한 흐름에 따라 JavaScript와 브라우저의 역할이 커지게 되었다.

### Blocking vs non-Blocking

#### Blocking 방식

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
  while (Data.now() - startTime < 600000) {}      // 아메리카노를 만드는 시간동안 아무것도 하지 못함.
  return 'Americano';
}

function order(itemName) {
  let item;
  if (itemName === "americano") {
    item = makeAmericano();
  }
  return item;
}

function main() {
  const americano = order("americano");
  console.log("아메리카노 받음")
  moveToSeat();
}

main();
```

#### non-Blocking 방식

non-Blocking 방식은 하나의 작업을 실행시키고, 그 작업이 종료되지 않아도 다음 작업을 실행하는 방식으로, **작업을 실행시켜 놓기만 하는 방식**이다.

작업이 길어지더라도 다음 작업이 지연되는 문제가 없고, 보통 결과 값을 `return`으로 바로 받지 않으며, 콜백 함수를 통해 받는 경우가 많다.(단, Promise의 등장으로 콜백 함수가 아닌 `then` 메서드를 통해 받게 된다.) JavaScript에서는 **비동기(asynchronous)**와 혼용된다.

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

main();
```

위 예시를 보면, `return`을 통해 반환하는 것이 없고, 콜백 함수를 통해 비동기적으로 처리되는 것을 확인할 수 있다.

비동기 작업은 위임이라고 생각하면 편하다. 위 코드는 `setTimeout()` Web API에게 위임해 Web API는 그 순간만큼은 병렬적으로 작업을 처리하게끔 만들고, 콜백 함수를 통해 다시 Single Thread가 되어 해당 비동기 작업이 언제 끝났는지, 끝난 시점의 결과 값은 무엇인지를 전달한다.

위임하면 불러줄때까지 해당 작업이 끝났는지 알 수 없다. 따라서 콜백 함수를 통해 해당 작업이 끝날 때 해당 함수를 호출해 그 작업이 끝난 시점을 인지하고, 그 작업의 결과값을 받기 위해 호출한다. 즉, 비동기는 끝났을 때 본인이 정의한 콜백 함수를 호출하게 된다.

다만, 반드시 콜백 함수를 사용한다고 무조건 비동기도 아니고, 병렬적으로 처리되는 것도 아니다.

### JavaScript 실행 환경(Runtime)

JavaScript 실행 환경(Runtime)는 크게 3가지로 구성된다. JavaScript Engine, Event Loop와 Queue, 외부 APIs가 있다.

#### JavaScript Engine

JavaScript 코드를 읽어서 해석하고 작업을 수행하는 역할로, Interpreter 언어인 JavaScript를 즉시 읽어 해석하고 작업을 수행한다. 이때, 엔진 자체는 작업을 수행만 할 뿐 비동기/동기 처리 방식과는 관계가 없다.(V8(Chrome), SpiderMonkey(Firefox), JavaScriptCore(Safari))

#### Event Loop와 Queue

JavaScript 코드가 비동기적으로 처리될 수 있도록 도와주는 중심적인 역할을 담당한다.

**Queue**는 비동기 작업을 마친 후 실행될 **콜백 함수**가 쌓이는 곳이다. Task Queue, Job Queue 등이 있다.(우선순위에 의해 나누어짐)

**Event Loop**는 Queue 쌓여있는 우선순위에 따라 콜백 함수들을 꺼내 JavaScript Engine에게 전달해주는 역할을 담당한다. JavaScript Engine은 해당 함수들을 전달 받은 순서대로 실행하게 된다.(Node.js의 libuv)

#### 외부 APIs

비동기/동기 작업들의 묶음으로, 비동기 작업의 실행은 대부분 외부 API를 통해 일어난다. JavaScript는 외부 API를 사용해 비동기 작업을 위임하며, 작업이 종료되었을 때 실행되는 콜백 함수를 대부분 해당 API의 매개변수로 전달하게 된다. 작업이 완료되면, Queue에 콜백 함수가 등록되게 된다.(브라우저의 WEB APIs, Node.js의 기본 라이브러리, setTimeout, setInterval, fetch, console, fs, path)

> Node.js에서는 특정 모듈은 불러오지 않아도 된다. 자비롭게 제공하기 때문이다.(console, setTimeout 등)
> Node.js는 Web API에 있는 라이브러리를 가져와서 모듈로 제공하는 것이다.(완전히 동일하지 않음)
> `console` 객체의 `log` 메소드과 같은 코드는 외부 API이지만 동기적으로 실행되기 때문에 JavaScript Engine 해석시 Call Stack에 바로 올라가게 된다.

### JavaScript에서 비동기 작업을 수행하는 방식

#### 콜백 패턴

**콜백 함수**는 작업이 종료되었을 때 해당 작업이 종료되었음과 해당 작업의 결과 값을 사용할 수 있도록 반환해주는 함수이다.(고차함수와 헷갈리지 않도록 한다.)

비동기 작업들은 `return`으로 해당 작업의 결과 값을 반환하는 것이 아니라 별도의 결과를 반환하는 방식이 필요해 **콜백 패턴**을 활용하게 되었다. 만약 콜백 패턴이 없었다면, JavaScript는 비동기 작업의 완료 여부를 지속적이고 수동으로 확인해야 했기 때문에 프로그래밍적으로 낭비가 된다. 이러한 콜백 패턴은 JavaScript가 함수를 **일급 객체**(함수의 변수 취급이 가능한 특성)로 취급하기에 가능하다.

```javascript
// 콜백 패턴을 통한 비동기 작업
fs.readFile('/data/sample.json', (err, data) => {
  if (err) throw err;
  console.log('data를 가져왔습니다.');
});

console.log('종료');

> 종료
> data를 가져왔습니다.
```

콜백 패턴의 경우 비동기 작업을 순차적으로 실행하고자 콜백 함수를 중첩적으로 활용하면 이러한 중첩 함수로 인해 가로로 코드가 길어지는 문제가 발생할 수 있다. 이를 **콜백 지옥**이라고 하는데, 이는 매우 좋지 않은 **DX**(Developer Experience)를 제공하게 된다.

> 콜백 함수를 사용한다고 모두 다 비동기 작업은 아니다. 다만, 보통 비동기를 처리할 때 콜백 패턴을 사용하기는 한다.

```javascript
function foo(callback) {
  let a = 1;
  callback();
}

function main() {
  console.log("Hello, World");

  // 동기 함수
  foo(() => {
    console.log("Callback called, but not the end");
  });

  console.log("This is the real end.");
}

main();

> Hello, World
> Callback called, but not the end.
> This is the real end.
```

#### Promise 패턴

콜백 지옥에서 벗어나고, 콜백 패턴을 더 일관성 있고, 통일성 있는 형식으로 보여주기 위한 필요성이 증대되면서 **Promise 패턴**이 등장했다. 로직 상 순차적으로 호출되어야 하는 비동기 함수들을 쉽게 연결해주는 `then` 메서드, 비동기 함수에서 에러가 발생했을 때 쉽게 에러 처리를 할 수 있도록 해주는 `catch` 메서드을 활용한다. 즉, 비동기 함수를 *일관성 있는 형식으로 관리*하게 되었다.(`then`, `catch`, `finally`)

이러한 **Promise 패턴**은 체이닝 기법(자신이 자기를 부르는 기법)을 통해 가독성을 높여 **DX**를 향상시키고, 기타 비동기 함수의 기능(`Promise.all`, `Promise.allSettled`, `Promise.any`, `Promise.race`)을 추가하게 되었다.

- `Promise.all`: 일련의 비동기 작업을 병렬적으로 실행시켜 해당 **결과를 하나의 배열로 반환**한다.

  ```javascript
  Promise.all([asyncFn1, asyncFn2, asyncFn3])
    .then((values) => {
      console.log(values);
    })
    .catch((err) => { console.log(err); });

  > [1, 2, 3]
  ```

- `Promise.allSettled`: 각 프로미스에 대한 결과를 나타내는 객체 배열을 반환한다.
- `Promise.any`: 하나라도 성공하면 결과 값을 반환하고, 모두 reject된다면 에러를 반환한다.
- `Promise.race`: 가장 먼저 끝난 비동기 작업의 결과를 반환한다. 예를 들어, 외부 데이터를 가져올 때 가장 빠르게 가져오는 방식을 택할 수 있다.

  ```javascript
  Promise.race([fetch, () => setTimeout(() => {}, 3000)]);
  ```

> 비동기는 사실상 위임 작업의 결과값이 필요하기 때문에 발생한 것이다.

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

> Error 핸들링에서 단점이 있다.

> 오늘날의 JavaScript는 Worker Thread를 통해 Multi Thread를 지원한다.
> JavaScript Engine은 최적화를 위해 컴파일 역할도 수행한다.(TurboFan)
> axios 등 유명한 라이브러리 코드를 공부하는 것도 좋은 방법이 된다.

### 동기 비동기 타이머 구현하기

> 다시 듣기
> while문, for문, map, filter, reduce 등으로 이벤트 루프를 막지 않게 조심해야 한다.
> 비동기 함수 내부의 콜백이 이벤트 루프를 막는 지 확인해야 한다.
> 함수 단위로 생각하기

```javascript
const Counter = {
  count: 0,

  getCount: function () {
    return this.count;
  },

  resetCount: function () {
    this.count = 0;
  },

  // 동기 타이머의 경우 3초간 웹 페이지의 상호작용이나 렌더링이 모두 정지되는 것을 확인할 수 있다.
  // 즉, 동시성을 낮추게 된다.(concurrent) 작업을 쪼개서 a, b, c, a, b, c 작업을 잘개 쪼개 번갈아가면서 진행하는데, 외부에서 보면 동시에 3가지 작업이 동시에 처리되는 것처럼 보인다. 따라서 단위 작업을 잘게 만들수록 JavaScript 성능이 높아진다.
  // 병렬은 Parallel
  incrementSync: function () {
    const NOW = Date.now();
    while (Date.now() - NOW <= 3000) {};    // Single Thread를 잡아먹는 중... Event Loop를 막는 중...
    this.count++;
  },

  incrementAsync: function (callback) {
    setTimeout(() => {
        this.count++;
        callback();
    }, 3000)
  },
};

export default Counter;
```

## [Node.js 입문](https://github.com/goldbergyoni/nodebestpractices)

기본적으로 서버 쪽에서 JavaScript를 사용하고자 하는 실행 환경(Runtime)이다.

### Node.js란

JavaScript는 브라우저의 전유물이었다. 즉, 웹 페이지 작성에만 사용하는 언어로, 웹 페이지를 조금 더 interactive하게 만들어주는 언어이다. Web 2.0 이후 JavaScript의 중요도가 높아지고, 여러 개의 브라우저 간의 경쟁이 발생했다.

Ryan Dahl이 2009년에 V8 엔진, libuv(Event Loop) 그리고 Node Bindings로 이루어진 JavaScript Runtime을 만들었다. 여타 Runtime과는 다르게 비동기 실행 방식(Event Loop와 OS 커널에서 지원하는 Low level IO API를 활용)을 기본적으로 지원하여 IO(File input, output) 관련 작업 시 최고의 성능을 보여준다.(Web Proxy 등)

이러한 Node.js의 비동기 모델은 다른 언어에도 큰 영향을 주게 되었고, 적절한 시점에 적절한 성능, npm으로 구성된 생태계로 인해 인기를 끌게 되었다.

### Node.js 구성

V8 엔진, libuv(Event Loop), Node.js 기본 라이브러리(JavaScript, C/C++ 기반)으로 구성된다.

#### libuv

C로 작성된 Event Loop로, 비동기 작업이 마친 후 실행되는 콜백함수들을 각종 Queue(JavaScript보다 많음: Timer Queue, MicroTask Queue 등)에서 우선순위에 맞게 꺼내 JavaScript Engine에 전달한다. Single Thread로 작동하며 Node.js를 위해 개발되었으나, 현재는 다른 언어들도 사용한다.

#### Node.js 기본 라이브러리

브라우저가 아닌 일반 머신 환경에서 실행되기 때문에 브라우저의 Web API와는 다른 라이브러리들이 포함되어 있다. 대표적으로, fs, path, crypto(암호화 관련), Stream(대용량 데이터를 작은 단위로 분리해 데이터를 넘김), zlib(압축 관련), childe_process(프로세스 생성), EventEmitter(프로그램 내 이벤트 발생시키기) 등이 있다.

```javascript
// EventEmitter
async function main() {
  const connection = await dbClient.connect();
  connection.on('connect', () => {
    console.log('DB연결 완료');
  });
  connection.on('disconnect', () => {
    console.log('DB종료 완료');
  })
  await connection.disconnect();
}
```

### Node.js 기본 생태

Node.js Runtime, 패키지 매니저(npm, yarn, pnpm), npm registry(public, private)

#### 패키지 매니저(npm, yarn, pnpm)

Node.js 프로젝트의 의존성 관리, Task 작성, npm registry 배포, 프로젝트 메타 데이터 작성 등을 담당한다. 서드 파티 라이브러리/모듈을 npm registry로부터 다운로드 받아 프로젝트에서 사용할 수 있게 해준다. 또한 개발중인 라이브러리/모듈을 npm registry로 업로드 할 수 있다.

`package.json`이라는 프로젝트 명세 파일에 따라 기능을 수행한다. 대표적으로 npm, yarn, pnpm이 있다.

> 다시 듣기

#### npm registry

Node.js/VanillaJS로 작성한 서드 파티 라이브러리/모듈을 업로드하는 공간으로, Public registry는 누구나 접근 가능한 공간, Private registry는 제한된 공간이다. 개발자들은 registry로부터 필요한 서드 파티 라이브러리/모듈을 받아 본인 코드에서 사용할 수 있다. 회사 내부에서만 사용하는 라이브러리/모듈은 private registry에 올려서 관리하는 경우가 많다

### 정리

- server-side 자바스크립트의 문을 연 Node.js
- Node.js도 브라우저와 동일하게 비동기 방식으로 작동한다(다만 내부 스펙이 다르다)
- 브라우저의 Web API와는 다른 기본 라이브러리들을 제공한다
- 전체적인 프로젝트 관리를 위한 패키지 매니저, 그리고 개발한 모듈을 다른 개발자가 사용할 수 있도록 올려놓을 수 있는 공간인 npm registry
- Node.js는 특성상 IO 관련 작업(file, network)이 많을 수록 효율이 좋고 반대로 싱글스레드 특성상 CPU를 많이 사용하는 작업(고차원 연산)이 많을 수록 효율이 극단적으로 떨어진다.

## 실습 강의

### Async, Await Error Handling

```javascript
async function test() {
  try {
    const bad = undefined;
    bad.x;
    const p = Promise.reject(new Error('Oops!'));
    await p;
  } catch (error) {
    // "cannot read property 'x' of undefined"
    console.log(error.message);
  }
}
```

`try` 문 내부의 동기적인 구문에서 발생하는 문법적인 에러에도 `catch` 구문으로 잡아낼 수 있다. 즉, 어떤 에러라도 먼저 발생하는 에러를 잡아낼 수 있다.

```javascript
const Form = () => {
    const formState = {};

    function register(name, validator = (value) => true) {
        // ! validator 는 기본값으로  `= (value) => true` 가지므로, 기본적으로 true를 반환하는 Boolean 함수이다.
        // register시, state에 필드를 등록합니다.
        // 필드 등록 객체는 { value, validator } 입니다.
        // value는 빈 문자열로 초기화됩니다.
        
        // 예시
        // {
        //     'food' : { 
        //         value: '햄버거',
        //         validator: (value) => value.length > 1;
        //     }
        //     'color' : { 
        //         value: '파란색',
        //         validator: (value) => value.length > 1;
        //     }
        // }
        
        // 유저의 작성과 관계 없이 name을 가진 객체 값에 validator를 삽입한다.
        formState[name] = {
            value: '',                                      // value의 값은 기본값으로 ''
            validator,                 // 인자로 들어온 validator 그대로 사용(생략 가능-객체의 key값과 value값이 이름이 같을 때)
         }
         // console.log(formState)
    }

    function validate() {
        // formState의 전체 필드를 유효성 함수 validator에 의해 검사합니다.
        // `validator(value)` 로 value가 유효한지 검사할 수 있습니다.
        // 전체 필드가 유효해야만 폼이 유효합니다.
        // 세 가지 방법이 있다.(formState에 대해 `forEach`, `every`, `reduce`)
        
        // console.log(Object.values(formState))
        // 예시
        // [
        //     { 
        //         value: '햄버거',
        //         validator: (value) => value.length > 1;
        //     },
        //     { 
        //         value: '파란색',
        //         validator: (value) => value.length > 1;
        //     },
        // ]
        
        // forEach
        // Object.values(formState).forEach((item) => {
        //     let checkPoint = item.validator(item.value);
        //     if (!checkPoint) { return false;}
        // })
        // return true;
        
        // every
        return Object.values(formState).every((item) => {
            return item.validator(item.value);
        })
        
        // reduce
        // Object.values(formState).reduce((prev, {value, validator}) => {
        //     const checkPoint = validator(value);
        //     return prev && checkPoint;
        // }, true);
        // return false;
    }

    function getFormData() {
        // formState의 각 필드에 있는 value를 모아 하나의 객체로 리턴합니다.
        // { name : 'Kim', age: 30 } 의 형식으로 반환해야 합니다.
        
        // forEach
        // let result = {};
        // Object.entries(formState).forEach(([indicator, {value, validator}]) => {
        //     result[indicator] = value;
        // })
        // return result;
        
        // reduce
        Object.entries(formState).reduce((prev, [name, {value, validator}]) => {
            // prev[name] = value;
            // return prev;
            return {...prev, [name]: value, }
        }, {})
    }

    function setValue(name, value) {
        formState[name] = { ...formState[name], value }
        // name -> food or color
        // value -> 유저가 작성한 내용
        // `name`으로 찾은 필드의 `value`를 설정합니다.
        // name에 해당하는 상태는 반드시 있다고 가정합니다.
    }

    return {
        register,
        validate,
        getFormData,
        setValue,
    };
};

export default Form;
```

```javascript
import "./app.css";
import Form from "./Form";

const App = () => {
    // Form -> return { register, validate, getFormData, setValue };
    const favoriteForm = Form();

    favoriteForm.register("food", (value) => value.length > 1);
    favoriteForm.register("color", (value) => value.length > 1);

    // DOM ELEMENT 선택
    const foodInput = document.getElementById("food");
    const colorInput = document.getElementById("color");
    const submitButton = document.getElementById("submit");
    const result = document.getElementById("result");

    // EventListener 추가
    foodInput.addEventListener("input", (e) => {
        favoriteForm.setValue("food", e.target.value);
        // e.target.value는 유저가 input에 작성한 내용
    });

    colorInput.addEventListener("input", (e) => {
        favoriteForm.setValue("color", e.target.value);
        // e.target.value는 유저가 input에 작성한 내용
    });

    submitButton.addEventListener("click", () => {
        const validationResult = favoriteForm.validate();
        
        if (!validationResult) {
            result.innerHTML = "입력된 값을 확인해주세요.";
            return;
        }
        
        result.innerHTML = "제출에 성공했습니다!";
    });
};

export default App;
```

```javasciprt
import App from "./App";
import "./index.css";

// DOMContentLoaded -> 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생한다.(CSS, img, 하위 프레임의 로딩은 배제)

const run = () => {
    window.addEventListener("DOMContentLoaded", () => {
        App();
    });
};

run();
```
