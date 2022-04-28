# 비동기

## async, await

Promise를 활용한 비동기 코드를 간결하게 작성하는 문법으로, 직관적이지 못한 Promise 코드를 간결하고 직관적으로 작성하는 문법이다. 이를 활용하면, 비동기 코드를 동기 코드처럼 작성할 수 있다.

`async` 함수와 `await` 키워드를 활용하는데, `await`는 반드시 `async` 함수 내부에서 사용해야 한다. `async`로 선언된 함수는 반드시 Promise를 반환한다는 점에 유의해야 한다.

- `await` 키워드로 비동기 처리에 순서를 부여한다. 즉, `await` 키워드는 여러 개가 쓰였을 시 뒤쪽 코드를 Promise의 `.then()` 함수를 사용하는 것처럼 만들어, 비동기 처리에 순서를 부여한다.
- 에러가 발생했을 경우 `try`-`catch` 구문으로 에러를 처리할 수 있다.
- `async` 함수 내부의 코드는 동기적으로 보이지만 비동기적으로 실행된다. 단, 내부에서 `await` 키워드가 쓰이지 않았을 경우엔 `Promise.resolve()` 로 처리된다.
- `await` 키워드는 반드시 Promise를 반환하는 함수에만 사용하는 것은 아니다. 단 이 경우 반환한 데이터는 `Promise.resolve()`로 감싸진다.

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {...})
}

function fetchUser() {
  return new Promise((resolve, reject) => {...})
}

async function asyncFunc() {
  // 둘 모두 Promise 객체를 반환하는 함수
  let data = await fetchData();             // fetchData().then().catch()로 사용할 때 `then()` 메서드로 받아오는 data와 동일한 data.
  let user = await fetchUser(data);

  return user;
}
```

`await` 키워드는 `then` 메서드 체인을 연결한 것처럼 순서대로 동작한다. 즉, 체이닝된 Promise를 반환하는 함수가 반환하는 Promise가 성공 혹은 실패할 때 까지 코드의 실행이 멈추게 된다. 따라서 `async`, `await`를 활용해 비동기 코드에 더 쉽게 순서를 부여할 수 있다.

```javascript
async function asyncFunc() {
  let data1 = await fetchData1();
  let data2 = await fetchData2(data1);
  let data3 = await fetchData3(data2);

  return data3;
}

function promiseFunc() {
  return fetchData1()
                  .then(fetchData2)
                  .then(fetchData3)
}
```

Promise를 반환하는 함수의 경우, 에러가 발생하면 `catch` 메서드를 통해 처리한다. `async`, `await`에서는 `try` - `catch`구문을 통해 에러를 처리할 수 있다.

```javascript
// Promise의 에러 처리
function fetchData1() {
  return request()
              .then((response) => {
                response.requestData
              })
              .catch(error => {
                // error 발생 시 수행할 동작
              })
}

// async await의 에러 처리
async function asyncFunc() {
  try {
    let data1 = await fetchData1();
    return fetchData2(data1);
  } catch (e) {
    console.log("실패했음: ", e);
  }
}
```

이때, `await fetchData2()` 되어 에러 처리를 추가적으로 하고 싶다면, `try` ... `catch` 구문을 두 번 작성하면 된다.

```javascript
const wait = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms);
  });
};
```

특정 시간 이후에 Promise를 resolve하는 wait 함수는 다음과 같이 간결하게 작성할 수 있다.

```javascript
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
```
