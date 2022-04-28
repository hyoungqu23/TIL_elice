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

## HTTP

HyperText Transfer Protocol의 약어로, Web에서 서버와 클라이언트 간의 통신 방법(OSI 7계층)을 정한 규약이다. 서버와 클라이언트 사이에는 무수히 많은 요소(CDN, Proxy 서버, Gateway 서버, DNS, Core Network(통신망과 라우터), Tunnel 서버 등)가 존재하는데, HTTP는 이러한 존재들 사이의 통신 방법을 규정하게 된다.

클라이언트는 모바일, 웹 브라우저 등으로 서버로 요청을 보내는 주체인데, 서버는 클라이언트가 요청을 보내기 전까지 대응하지 않는다.

### [HTTP Message](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages)

요청과 응답 메시지는 HTTP 규약에서 규정한 형식을 따르는데, 둘은 조금 다른 형태를 갖는다.
![msg](./HTTPMsgStructure2.png)
서버 주소, 요청 메서드, 상태 코드, Target path, 헤더, 바디 등이 포함된다. 이때 HTTP/1.1 메시지는 사람이 읽을 수 있어, 문제를 확인할 수 있지만, HTTP2는 사람이 읽을 수 없다.

**HTTP Header**
HTTP 메시지의 Header에는 컨텐츠 관련 정보(타입 등), 파일 정보, 인증 관련 정보(authorization), 쿠키 정보(검색 데이터 등 가벼운 데이터), 캐시 정보(페이지 관련 정보를 보유해 로드를 줄여 성능을 높일 수 있음) 등 서버와 클라이언트 간 통신 시 필요한 정보를 담는다. 클라이언트가 요청하는 경우, 서버가 응답하는 경우 모두 Header에 정보를 담을 수 있다.

**HTTP Status**
HTTP 요청 시, 클라이언트는 요청의 결과에 대한 상태 정보를 얻는다. 200, 400, 500 등 숫자 코드와 OK, NOT FOUND 등의 숫자 코드로 이루어진 코드를 이용해 각 결과에 해당하는 행위를 할 수 있다.

**요청 메서드**
클라이언트가 서버로 요청을 보낼 때 커스텀이 가능한 GET(조회), POST(생성), PUT(수정), PATCH(수정), DELETE(삭제)와 브라우저가 자동으로 처리하는 OPTIONS, CONNECT, TRACE 등의 요청 메서드를 활용해 특정 요청에 대한 동작을 정의한다.

## REST API

Representational State Transfer API의 약어로, HTTP의 요청 메서드에 응하는 서버 API와 클라이언트 간 통신의 구조가 지켜야 할 좋은 **방법**을 명시한 것으로, 요청 메서드의 의미, URI 설계, 클라이언트 상태에 대한 동작 등을 정의한다.

참고로, API는 Application Programming Interface의 약어로, 사용자가 특정 기능을 사용할 수 있도록 제공하는 함수를 의미한다.

### 요청 메서드의 의미

- GET: 리소스 정보를 얻음
- POST: 리소스를 생성
- PUT: 리소스를 생성하거나 업데이트
- DELETE 리소스를 제거
