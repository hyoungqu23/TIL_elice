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

## MongoDB

No SQL 형식의 데이터베이스(Not only SQL)

RDBMS(관계형 데이터베이스) -> 엄격한 구조.. 기본키로 검색이 빠름..
No SQL(무관계형 데이터베이스) -> 대용량 처리에 압도적으로 유리함 / 속도도 빠르다

1일 20만건 이상의 처리를 하지 않는다면 RDBMS 만으로도 충분히 서비스가 가능하다.

빅데이터에서 파생된 AI가 발달하면서 No SQL이 각광받았다. 관계가 없이 유연하게 설계할 수 있고, JSON에 더 친화적이다.

하나의 필드가 빠지면 RDBMS에서는 바로 에러처리를 한다.

구글 애널리틱스 firebase : No SQL
--> 그로스 해킹( 앱, 웹 사용자들의 데이터 분석 -> 활용)
--> 뭐 필드 하나 빠지면 그 필드가 빠진 유저들의 패턴을 분석 가능

치명적인 단점: 어디에 있는지 모름..

Database > Collection > Document

[Mongoose](https://mongoosejs.com/) [참고](https://mongoosejs.com/docs/api/query.html)
ODM

설치하기
`npm i mongoose`

cmd

```cmd
mongo

use bookstore

db.createUser({
  user: 'testid',
  pwd: 'test12345',
  roles: [
    'readWrite'
  ]
})

show users
```

참고: express gitignore 검색해보기

dbconfig.json

models 디렉토리 index.js
-> 데이터베이스 접근 기본 구조 작성

app.js

```javascript
const dbconnect = require("./models/index"); // DB 불러오기
dbconnect(); // 함수형이기 때문에 실행해주어야 한다.
```

`nodemon start` 로컬 서버 실행

data type([참고](https://mongoosejs.com/docs/schematypes.html))

models 디렉토리 book.js

```javascript
const mongoose = require("mongoose"); // 몽구스 불러오기
const Schema = mongoose.Schema; // 값들의 모음

// 데이터 생성
const book = new Schema({
  bookname: String,
  author: String,
  price: Number,
  publish: Date,
});

// 데이터를 collection에 삽입
const bookData = mongoose.model("book", book);
// collection name, data

module.exports = bookData;
```

post.js

```javascript
const BookSchema = require("../models/book"); // 불러오기

// book.js 관련
router.post("/addbook", (req, res, next) => {
  const { name, author, price, publish } = req.body;

  // 데이터 할당하기
  let bookData = BookSchema({
    name: name,
    author: author,
    price: price,
    publish: publish,
  });

  // 데이터 저장하기
  bookData.save();

  // 다시 폼으로 가기
  res.redirect("/expost");
});
```

post.ejs

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
    <!-- method를 post로 설정해야 한다. -->
    <!-- /expost 화면에 출력한다. -->
    <!-- <form action="/expost" method="post">
    <input type="text" name="name" id="">
    <input type="number" name="phoneNumber" id="">
    <input type="date" name="bDay" id="">
    <input type="submit" value="전송하기">
  </form> -->

    <form action="/expost/addbook" method="post">
      <input type="text" name="bookname" id="" />
      <input type="text" name="author" id="" />
      <input type="number" name="price" id="" />
      <input type="date" name="publish" id="" />
      <input type="submit" value="전송하기" />
    </form>
  </body>
</html>
```

POST /expost/addbook 302 17.657 ms - 58
GET /expost 304 2.178 ms - -
POST /expost/addbook 302 2.110 ms - 58
GET /expost 304 1.239 ms - -

저장된 데이터

```json
{
  "_id": {
    "$oid": "627b43f2652a361dbbb5e9b3"
  },
  "bookname": "이펙티브 타입스크립트",
  "author": "철수",
  "price": 15000,
  "publish": {
    "$date": {
      "$numberLong": "1651449600000"
    }
  },
  "__v": 0
}
```

임의로 하나를 빼고 입력해도 데이터는 저장이 된다. 아래 예시는 price 값을 배제하고 저장한 것이다.

```json
{
  "_id": { "$oid": "627b484b652a361dbbb5e9b5" },
  "bookname": "자바스크립트 이해",
  "author": "영희",
  "price": null,
  "publish": { "$date": { "$numberLong": "1651536000000" } },
  "__v": 0
}
```

기본값 설정

```js
price: {
  type: Number,
  default: 50000
},
```

다만 이 경우 input 태그와 post.js의 데이터 할당 부분을 지워주어야 하는 문제가 있다. 그냥 디폴트 설정이 가능하다는 점만 확인하자.

```js
sales: {
  type: Boolean,
  default: false
}
```

> 확인

```markdown
http://localhost:3000/expost 의 주소로 들어가면 post.ejs 창이 render 됨 (res.render("post"); 때문에)

그 창에서 bookname, auther, price, date 의 데이터 입력 후 submit 버튼 입력

=> /addbook 쪽으로 데이터가 보내짐 (post.ejs 의 form 태그의 action 속성 : 폼 데이터(form data)를 서버로 보낼 때 해당 데이터가 도착할 URL)

=> post.js에서, BookSchema(Schema를 정의해놔야 함)를 require 해와서 만들어놓은 변수에 할당하고, .save()를 통해 db에 저장함

----- 아님
<http://localhost:3000/expost/addbook> 의 주소로 들어가면 post.ejs 창이 render
됨 (res.render("post"); 때문에) 그 창에서 bookname, auther, price, date 의
데이터 입력 후 submit 버튼 입력 => /addbook 쪽으로 데이터가 보내짐 (post.ejs 의
form 태그의 action 속성 : 폼 데이터(form data)를 서버로 보낼 때 해당 데이터가
도착할 URL) => post.js에서, BookSchema(Schema를 정의해놔야 함)를 require 해와서
만들어놓은 변수에 할당하고, .save()를 통해 db에 저장함.
```

검색해보기

```js
// 검색하기
router.get("/books/:id", (req, res, next) => {
  const authorName = req.params.id;

  BookSchema.findOne({ author: authorName }, (err, result) => {
    if (result) {
      return res.json(result);
    } else {
      return res.send("등록된 작가가 없습니다.");
    }
  });
});
```

find로 하면 전체를 찾는 것이기 때문에 else 부분 안나옴

하나만 찾는 findOne을 사용하는 것이 맞을 듯

REST API
put, delete 잘 사용안함(보안이슈)
