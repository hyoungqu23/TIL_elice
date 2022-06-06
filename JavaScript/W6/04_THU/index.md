# 0512

## 미들웨어

미들웨어는 Express.js 동작의 핵심으로, HTTP 요청(request)과 응답(response) 사이에서 단계별 동작을 수행해주는 함수이다. 미들웨어는 HTTP 요청이 들어온 시점부터 시작되며, **HTTP 요청과 응답 객체를 처리**하거나, **다음 미들웨어를 실행**하는데, HTTP 응답이 마무리될 때까지 미들웨어의 동작 사이클이 실행된다. 즉, HTTP 응답이 마무리되는 경우에는 다음 미들웨어가 실행되지 않는다.

Route Handler도 미들웨어의 한 종류인 라우팅 함수(get, post, put, delete 등)에 적용된 미들웨어로 일반적인 미들웨어와 달리 path parameter를 사용할 수 있다는 것이 특징이다.

### 미들웨어 작성

`req`, `res`, `next`를 인자로 가진 함수를 작성해 미들웨어를 구성한다.

- `req`: HTTP 요청을 처리하는 객체
- `res`: HTTP 응답을 처리하는 객체
- `next`: 다음 미들웨어를 실행하는 함수로, `next()` 함수가 호출되지 않으면 미들웨어 사이클이 멈춘다.

### 미들웨어 사용

미들웨어는 필요한 동작 방식에 따라 적용할 위치를 결정하게 되는데, 적용되는 위치에 따라 어플리케이션, 라우터, 에러 처리 등으로 분류된다.

Express.js는 다양한 미들웨어들이 이미 만들어져 라이브러리로 제공되고 있다.(npm 온라인 저장소, Express.js 홈페이지 참조)

#### 어플리케이션 미들웨어

미들웨어를 모든 요청에 공통적으로 적용하기 위해 사용하며, `use`, http method 함수(`get`, `post`, `put`, `delete`)를 통해 미들웨어를 연결할 수 있다. 이러한 어플리케이션 미들웨어는 HTTP 요청이 들어온 순간부터 적용된 순서대로 동작한다.

```javascript
app.use((req, res, next) => {
  console.log(`Request ${req.path}`);
  next();
});

app.use(auth);

app.get("/", (req, res, next) => {
  res.send("Hello Express");
});
```

#### 라우터 미들웨어

특정 경로의 라우팅에만 미들웨어를 적용하기 위해 사용하며, `router` 객체에 미들웨어가 적용되는 것 이외에는 어플리케이션 미들웨어와 사용 방법은 동일하다. 이러한 라우터 미들웨어는 app 객체에 라우터가 적용된 이후로 순서대로 동작한다.

```javascript
router.use(auth);

router.get("/", (req, res, next) => {
  res.send("Hello Router");
});

app.use((req, res, next) => {
  console.log(`Request ${req.path}`);
  next();
});

app.use("/admin", router);
```

> 참고: 미들웨어 서브스택
> use, http 메서드 함수에 여러 미들웨어를 동시에 적용할 수 있다. 주로, 한 개의 경로에 특정해서 미들웨어를 적용하는 데 사용한다. 이 경우, 전달된 인자 순서대로 동작한다.

#### 에러 처리 미들웨어

에러 처리 미들웨어는 일반적으로 가장 마지막에 위치한다. 다른 미들웨어와 달리 `err`, `req`, `res`, `next` 네 가지 인자를 가지며, 앞선 미들웨어에서 `next` 함수에 인자가 전달되면 실행된다. 즉, 중간에 위치한 미들웨어는 실행하지 않고 `next` 함수에 인자가 넘어가는 순간 에러 처리 미들웨어가 실행된다.

```javascript
app.use((req, res, next) => {
  if (!isAdmin(req)) {
    next(new Error("Not Authorized")); // next 함수에 인자가 전달됨
    return;
  }
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hello Express!");
});

app.use((err, req, res, next) => {
  // 바로 에러 처리 미들웨어 실행
  res.send("Error Occurred");
});
```

#### 함수형 미들웨어

API 별로 사용자의 권한을 다르게 제한하고 싶은 경우 등과 같은 상황에서 하나의 미들웨어를 작성하고, 작동 모드를 선택하면서 사용하고 싶을 경우
함수형 미들웨어를 사용할 수 있다.

미들웨어 함수를 반환하는 함수를 통해, 해당 함수가 실행될 때 미들웨어의 동작이 결정되는 방식으로 구성된다. 일반적으로, 동일한 로직에 설정값만 다르게 미들웨어를 사용하는 방법이다.

```javascript
const auth = (memberType) => {
  return (req, res, next) => {
    if (!checkMember(req, memberType)) {
      next(new Error(`member not ${memberType}`));
      return;
    }
    next();
  };
};

app.use("/admin", auth("admin"), adminLouter);
app.use("/users", auth("member"), userLouter);
```

## REST API

REST 아키텍처를 준수하는 웹 API로, RESTful API라고도 한다. 이때 REST는 **RE**presentational **S**tate **T**ransfer의 약어로, 웹에서 **자료를 전송**하기 위한 표현 방법에 대한 아키텍처이다. API는 **A**pplication **P**rogramming **I**nterface의 약어로 서비스나 프로그램 간에 **미리 정해진 기능을 실행할 수 있도록 하는 규약**이다.

REST를 정확히 구현하기에는 어렵지만, 기본적인 REST 가이드를 따른다면 조금 더 좋은 구조의 API를 구성할 수 있다.

### REST API 기본 가이드

1. HTTP 메서드의 적극적인 사용

   API의 동작을 **HTTP 메서드 + 명사형 URL**로 표현해야 한다.(GET, POST, PUT, DELETE 등)

2. URL 표현 방법

   REST API URL의 자원은 복수형으로 표현되며, **복수형 + id**로 특정한 하나의 자원에 대해 접근할 수 있다.

3. 계층적 자원 구조

   URL을 통해 자원을 **계층적으로 표현**해야 한다.

## JSON

JavaScript Object Notation의 약어로, JavaScript에서 객체를 표현하는 표현식을 의미한다. 데이터를 표현하는 방법이 단순하고 쉬워 Web API에서 데이터를 전송할 때 표현식으로 주로 사용된다.

Web API는 기본적으로 데이터를 문자열로 전송하는데, JSON을 활용해 객체 형태를 문자열로 전달할 수 있고 더 적은 표현식을 활용하여 효과적으로 데이터를 표현할 수 있다.

```json
// Object
{
  "name": "김철수",
  "age": 22,
  "isAdult": true,
  "nationality": "KOR"
}

// Array
["first", 10, {name: "김영희"}]
```

## Express.js 로 REST API 구현하기

### MVC 패턴

MVC 패턴은 웹 서비스의 가장 대표적인 프로젝트 구성 패턴으로, 기능들을 어떻게 분리할 지에 대한 하나의 프로젝트 구성 방법이다. MVC 패턴에 따르면, Model - View - Controller로 프로젝트의 구조를 구성한다.

- Model

  Model은 데이터에 접근하는 기능과 데이터 그 자체를 의미하며, 데이터의 읽기와 쓰기는 Model을 통해서만 이루어지도록 해야 한다.

- View

  View는 데이터를 표현하는 기능으로, 주로 Controller로부터 데이터를 전달 받은 후, 화면에 표시하는 기능을 담당한다.

- Controller

  Controller는 Model을 통해 데이터에 접근하고, 동작을 수행한 후 처리 결과를 View로 전달하는 기능으로, 주로 라우팅 함수가 해당 기능을 수행한다.

Node.js에서는 Module을 활용해 MVC 패턴을 구현할 수 있다.

## Postman

Postman은 API를 테스트할 수 있는 도구로, HTTP 요청(GET, POST, PUT, DELETE 등)을 손쉽게 작성해 테스트할 수 있게 도와주는 도구를 포함해 API 문서화 기능 등 다양한 도구를 제공한다.
