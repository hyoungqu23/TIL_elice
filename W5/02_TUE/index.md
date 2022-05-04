# 0503

## Node.js 이해하기

### Node.js의 등장 배경

Node.js는 WEB의 발전에 의해 등장한 기술로, 단방향 통신 위주의 WEB 1.0에서 사용자와의 상호작용이 중요해지는 WEB 2.0으로 발전하면서 고성능 JavaScript 실행의 필요성이 대두되었다. 따라서 Chrome 브라우저의 V8 엔진이 등장했다. 이로 인해 JavaScript의 실행 속도가 현저히 빨라졌고, 오픈소스였던 V8 엔진을 활용해 웹 브라우저에서만 사용할 수 있는 것이 아니라, 어느 환경에서나 실행할 수 있게 해주는 실행기로서 Node.js가 탄생했다.

### Node.js 활용

| Browser                     | Node.js                          |
|-----------------------------|----------------------------------|
|브라우저에서 실행            |크로스 플랫폼 실행                |
|웹 내부의 제한된 동작        |제한 없는 동작                    |
|웹 프론트 개발자의 언어      |다양한 어플리케이션 개발 가능     |

- Front-end: `React.js`
- Back-end: `Express.js`
- Mobile-App: `React-Native`
- Desktop-App: `Electron`
- Machine-Learning: `Brain.js`

## Node.js 특징

> Single Thread이기 때문에 비동기로 동작하고, 이를 구현하기 위해 이벤트 기반으로 처리한다.

### Single Thread

Thread는 명령을 실행하는 단위로, 한 개의 Thread는 한 번에 한 가지 동작만 실행할 수 있다. 이와 달리 Multi Thread는 동시에 여러 Thread를 활용하면서 동시에 여러 동작을 수행할 수 있다.

Node.js는 Thread 기반의 작업이 비효율적인 Single Thread 방식이기 때문에 CPU 리소스 관리에 효율적이고, 비동기 동작으로 Thread 기반의 작업을 최소화한다.

### Asynchronous

동작을 실행한 후 완료를 기다리지 않는 방식을 의미한다. 즉, 동작의 완료를 기다리지 않기 때문에 다른 동작을 바로 실행할 수 있다. Node.js는 Single Thread 방식이기 때문에 비동기 방식을 활용하고 있다.

### Event driven

비동기 동작의 완료를 처리하는 방법으로 사용된다. 비동기 방식은 특정 동작을 실행한 후 완료를 신경쓰지 않기 때문에 완료될 경우 실행할 함수를 미리 등록해놓고 있다. 이를 '이벤트를 등록한다'고 한다. 따라서 이러한 비동기 동작이 완료되면 미리 등록된 함수(이벤트)가 실행된다.

## Node.js 시작하기

최신 버전에서는 보안 이슈, 버그 수정, 최신 기술들이 급진적으로 적용되기 떄문에 가장 안정적인 버전인 [LTS(Long-Term Support) 버전](https://nodejs.org/ko/download/)을 선택하는 것이 최선이다.

## ES6 문법

일반적으로 ES6는 ECMAScript 6버전 이후를 통틀어 부르는 현대적인 JavaScript의 표준 문법이다.

기존 JavaScript보다 생산성 향상에 도움을 주고, Node.js는 빠르게 최신 ECMAScript를 지원하기 때문에 적절히 활용해야 한다.

### `let`, `const`

상수와 변수를 구분할 수 있고, Block Scope를 가진다.

```javascript
const TITLE = 'Node.js';
let desc = 'JavaScript';

desc = 'JavaScript & React.js';
TITLE = 'Node';                 // error
```

### Template Literal

문자열 사이에 간단하게 변수를 사용하고, 따옴표를 활용할 수 있으며 줄 바꿈을 지원한다.

```javascript
const NAME = 'Lee';
const AGE = 28;

let introduction = `My name is ${NAME}
  I'm ${AGE} years old.
  Nice to meet you.`

console.log(introduction);
```

### Arrow Function

상수형으로 선언하거나 간결하게 익명 함수를 선언하는 등 다양한 방법으로 선언할 수 있게 되었고, 같은 이름의 상수형 함수를 재선언하는 것은 불가능해졌다.

```javascript
const arrowFunc = (param) => {
  console.log(param);
}

setTimeout(() => {
  console.log('no name')
})
```

### Class

기존에 함수와 prototype을 통해 객체 지향 프로그래밍을 구현했지만, ES6에서는 일반적인 형태의 객체 지향 코드인 Class 구현이 가능하다.

```javascript
class Player {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  getInfo() {
    console.log(this.name, this.age);
  }
}

const player = new Player('Faker', 25);
player.getInfo();
```

### Destructuring

기존에는 배열과 객체에서 index와 key 값을 통해 한 줄씩 값을 조회했는데, ES6에서는 Destructuring 문법을 통해 쉽게 값을 조회하고 사용할 수 있다.

```javascript
const obj = {name: 'Faker', age: 25};

const {name, age} = obj;
console.log(name, age);

const {playerName: name, playerAge: age} = obj;
console.log(playerName, playerAge);

const arr = ['some', 'other'];
const [first, second] = arr;
console.log(first, second);
```

## 비동기

이벤트 기반 동작을 코드로 구현하는 방법으로, Node.js에는 비동기 동작을 구현하는 세 가지 방법이 있다.

### 콜백 패턴: 전통적인 이벤트 기반 코딩 방식

콜백 패턴은 이벤트 함수를 비동기 동작의 인자로 전달하는 방식을 말한다. 비동기 동작이 완료되면, 콜백 함수가 실행된다.

참고로 콜백 함수의 첫 번째 인자는 에러를 전달하는 것이 표준이다.

```javascript
// 비동기
db.getUsers((err, users) => {  // 익명 콜백 함수
  console.log(users);
})
```

콜백을 사용한 비동기 동작을 동기적으로 실행해야 할 경우에 콜백 지옥에 빠질 수 있다.

### Promise 패턴: 콜백 지옥을 해결하기 위한 비동기 코딩 방식

콜백 지옥을 해결하기 위해 등장한 방식으로, 동작이 완료되면 `then` 메서드에 등록된 콜백이 실행되고, 에러가 발생한 경우 `catch` 메서드에 등록된 콜백이 실행된다.

`then` 메서드의 반환 값으로 다시 Promise를 사용하면 체이닝 기법을 통해 코드를 더 간결하게 작성할 수 있고, 비동기 동작을 동기적으로 수행할 수 있어 콜백 지옥을 해결할 수 있다.

```javascript
db.getUserPromise()
  .then((users) => {
    return promise1(users);
  })
  .then(r1 => promise2(r1));
  .catch((err) => {console.log(err.message);})
```

Promise는 실행 결과에 따라 구분되는 resolve, reject 두 가지 함수를 가진다. reject는 catch에 등록된 콜백 함수를 실행하고, resolve는 then에 등록된 콜백을 실행하게 된다.

```javascript
function getUserPromise(params) {
  return new Promise((resolve, reject) => {
    getUsers(params, (err, user) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(users);
    })
  });
}
```

#### 예시

```javascript
function adder(a, b, callback) {
    if (a == 0 || b == 0) {
        callback("no zero", null);
        return;
    }
    console.log(`${a}+${b}=${a + b}`);
    
    callback(null, a + b);
}

function handle_error(error) {
    console.log("ERROR: ", error);
}

function adder_promise(a, b) {
    return new Promise((resolve, reject) => {
        adder(a, b, (err, result) => {
            if (err) {
                /* 1. promise 에서 에러 처리하기 */
                reject(err);
                return;
            }
            /* 2. promise 에서 결과값 처리하기 */
            resolve(result);
        });
    });
}

function add_all(a, b, c) {
    adder_promise(a, b)
        .then((result) => adder_promise(result, c))
        /* 3. then 을 활용하여 result 와 c 를 add_promise 하기 */
        .then(result2 => {
            console.log(`${a}+${b}+${c}=${result2}`);
        })
        /* 4. catch 를 활용하여 promise 의 에러를 handle_error 함수로 전달하기 */
        .catch(err => {
            handle_error(err);
        })
}

module.exports = add_all;
```

### Async - Await 패턴: Promise 패턴의 표현법을 개선한 비동기 코딩 방식

Promise 패턴의 표현법을 순차적 프로그래밍처럼 작성할 수 있도록 개선한 것이 Async - Await 패턴이다. 내부적으로 Promise를 사용하기에 Promise의 다른 문법이라고 할 수 있다. 즉, async 함수 내에서 promise 함수의 결과는 await으로 받을 수 있고, 해당 await 한 함수가 완료될 때까지 다음 라인으로 넘어가지 않는다.

async 함수는 Promise를 반환한다는 점을 유의해야 한다.

```javascript
async function func1() = {
  const r1 = await promise1();
  const r2 = await promise2(r1);
  const r3 = await promise3(r1, r2);

  return r3;
};

func1().then(r3 => {
  console.log(r3);
})
```

`try` - `catch` 구문으로 에러를 처리할 수 있다.

```javascript
async function func(msg) {
  try {
    const r = await promise1();
    console.log(r);
  } catch (e) {
    console.error(e);
  }
}
```

#### Promise의 병렬적 실행

`Promise.all()`은 promise 함수를 동시에 실행시키고 등록된 모든 함수가 마무리되면 결과값을 한꺼번에 반환하기 때문에 더욱 효율적이다.

```javascript
async function sync() {
  const r1 = await promise1();
  const r2 = await promise2();
  console.log(r1, r2);
}

async function parallel() {
  const [r1, r2] = await Promise.all([
    promise1(),
    promise2(),
  ]);
  console.log(r1, r2);
}
```

## Event Loop

이벤트를 처리하는 반복되는 동작으로, 비동기-이벤트 동작을 처리하는 일련의 반복 동작을 말한다. Event Loop에 대해 이해하면 Node.js의 비동기 코딩이 어떤 순서로 수행되는지에 대해 이해할 수 있다.

JavaScript에도 존재하는데, 두 동작 방식에는 큰 차이가 없다.

### Call Stack

작성된 함수들이 등록되는 LIFO(Last-In, First-Out) 방식의 Stack으로, Event Loop는 **Call Stack이 비어있을 때까지** Stack의 함수를 실행한다.

### Message Queue

setTimeout과 같은 지연 실행 함수를 등록하는 FIFO(First-In, First-Out) 방식의 Queue로, Event Loop는 정해진 지연 시간이 끝나고 **Call Stack이 비어 있는 경우** 등록된 함수를 Call Stack에 추가한다.

### Job Queue

Promise에 등록된 콜백을 등록하는 FIFO(First-In, First-Out) 방식의 Queue로, Event Loop는 **상위 함수가 종료되기 전에 Call Stack이 비어있지 않더라도**, Job Queue에 등록된 콜백을 Call Stack에 추가한다.

### 예시

```javascript
function func1() {
  console.log('func1 - 1')
  function func2() {
    console.log('func2 - 1')
    function func3() {
      return new Promise((resolve, reject) => {
        resolve('func3')
      })
      .then(res => {
        console.log(res);
      })
    }
    setTimeout(() => {
      console.log('func4, setTimeout')
    }, 1000)
    console.log('func2 - 2');
  }
  function func5() {
    console.log('func5');
  }
  console.log('func1 - 2')
}
```
