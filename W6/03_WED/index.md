# 0511

## 개발 환경 구축

nodemon 설치: 전역 설치 옵션을 활용해야 된다.
mongoDb: 환경 변수 추가 필요([참고](https://khj93.tistory.com/entry/MongoDB-Window%EC%97%90-MongoDB-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0))

## 리뷰

HTTP 요청 후 위치 라우터 => 우리가 원하는 기능을 함수로 만든 미들웨어 => HTTP 응답

## POST

SSR과 CSR 차이와 SSR 장점 // TODO

views 디렉토리 / post.ejs -> 화면 만들기!

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="/expost" method="post">
      <input type="text" name="name" id="" />
      <input type="number" name="phoneNumber" id="" />
      <input type="date" name="bDay" id="" />
      <input type="submit" value="전송하기" />
    </form>
  </body>
</html>
```

routes 디렉토리 / post.js -> 라우터 생성하기!

```javascript
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("post");
});

router.post("/", (req, res, next) => {
  const name = req.body.name; // req.body: form의 name input의 값을 전달 받음
  const phoneNumber = req.body.phoneNumber; // req.body: form의 phoneNumber input의 값을 전달 받음
  const bDay = req.body.bDay; // req.body: form의 bDay input의 값을 전달 받음

  // JSON 형식으로 응답 받기
  res.json({
    name: name,
    phoneNumber: phoneNumber,
    bDay: bDay,
  });
});

module.exports = router;
```

app.js -> 라우터 할당하기!

```javascript
const postRouter = require("./routes/post"); // 라우터 불러오기

app.use("/expost", postRouter); // 라우터 설정하기(경로, 사용할 라우터)
```

> good get

`http://localhost:3000/expost` : GET /expost 200 2.813 ms - 498

> good post

웹의 이해 찾아보기

`http://localhost:3000/expost` : POST /expost 200 1.340 ms - 63
JSON 형태 값이 전송되는 것을 확인할 수 있다. 저장은 별도.

res.redirect 관련 ([참고](https://expressjs.com/ko/api.html#res.redirect)): 호출한 경로로 재접근

```js
// 다음 미들웨어
router.post("/", (req, res, next) => {
  // redirect: 호출한 경로로 재접근
  res.redirect("/expost");
});
```

에러 발생
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client.

웹에서의 통신 방식은 **1요청 1응답**이 우선이다. 하나의 요청에 다수의 응답을 받을 수 없다. 1요청 1응답 이후에는 통신이 종료되는 것이 정상이다.

따라서, 이전 미들웨어에서 1응답을 한 경우, 다음 미들웨어에서 응답을 또 하면 에러가 발생한다.

따라서 주소가 동일한 미들웨어를 설정해서 응답을 해야한다.
