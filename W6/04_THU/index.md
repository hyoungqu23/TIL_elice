# 0512

## 미들웨어

미들웨어는 Express.js 동작의 핵심으로, HTTP 요청(request)과 응답(response) 사이에서 단계별 동작을 수행해주는 함수이다. 미들웨어는 HTTP 요청이 들어온 시점부터 시작되며, **HTTP 요청과 응답 객체를 처리**하거나, **다음 미들웨어를 실행**하는데, HTTP 응답이 마무리될 때까지 미들웨어의 동작 사이클이 실행된다.

Route Handler도 라우팅 함수(get, post, put, delete 등)에 적용된 미들웨어로 일반적인 미들웨어와 달리 path parameter를 사용할 수 있다는 것이 특징이다.

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
