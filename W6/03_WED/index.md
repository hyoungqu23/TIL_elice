# 0511

## [Express.js](https://expressjs.com/) 복습하면서 만들어보기

다음 명령어로 [express-generator](https://expressjs.com/ko/starter/generator.html)를 전역적으로 설치할 수 있다.

```command
npm install express-generator -g
```

설치 이후에 `-h` 옵션을 이용해 명령의 옵션을 확인할 수 있다.

```command
express --view=ejs myfirstapp
```

보통 Node.js 템플릿 엔진으로 `ejs`, `pug` 중 하나를 사용하곤 한다. 보통 ejs는 기존 HTML과 문법이 흡사하여 사용하기 쉽다는 장점이 있어 선택한다. 다만, pug의 경우 새로운 문법을 배워야 하지만, 간소화되는 코드와 컴파일 후 렌더링되는 방식으로 인해서 높은 생산성을 자랑한다.([ejs GitHub](https://github.com/mde/ejs), [참고](https://jeong-pro.tistory.com/65), [pug 홈페이지](https://pugjs.org/api/getting-started.html))

`myfirstapp` 프로젝트 디렉토리를 생성하고, 이후 이동한 후 `npm install`을 통해 npm을 설치한다.

추가적으로 다음 명령어를 활용해 `nodemon` 도구를 설치한다. `nodemon`은 node monitor의 약어로 Node.js가 실행하는 파일이 속한 디렉토리를 감시하고 있다가 파일이 수정되면 자동으로 Node.js 어플리케이션을 재시작하는 확장 모듈이다. `nodemon`을 설치하면 재시작 없이 코드를 자동 반영 할수 있다.([참고](https://velog.io/@dami/node-express-%EC%84%9C%EB%B2%84%EC%99%80-nodemon-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0))

```command
npm install -g nodemon
```

```json
// package.json
"scripts": {
  "start": "nodemon ./bin/www"
},
```

다음으로 `npm start`로 프로젝트를 시작할 수 있다. `nodemon`으로 인해 코드 수정 시 서버 재시작 없이 자동 반영할 수 있다.

![main page](./img/express%20first%20page.png)
`http://localhost:3000/`에 접속해 main page를 확인할 수 있다. 또한, `http://localhost:3000/users`에 접근해 "respond with a resource" 텍스트를 확인할 수 있다.
![users page](img/express%20users%20page.png)

이에 더해, 터미널에서 HTTP 메서드, status code, path, 로딩 시간 등을 확인할 수 있다.

> GET / 200 15.210 ms - 207
> GET /users 200 1.368 ms - 23

---

### Express 구조 파악하기

`app.js`는 최상단 디렉토리에 저장된 실행부로, 주로 [`app` 객체의 메서드](http://expressjs.com/ko/4x/api.html#app)로 이루어져 있다.

```js
// app.js

// Creates an Express application. The express() function is a top-level function exported by the express module.
// Express 응용 프로그램을 만든다. express() 함수는 express 모듈에서 내보내는 최상위 함수이다.
var express = require("express");

// The app object conventionally denotes the Express application. Create it by calling the top-level express() function exported by the Express module.
// 앱 객체는 전통적으로 익스프레스 애플리케이션을 나타낸다. Express 모듈에서 내보낸 최상위 express() 함수를 호출하여 생성할 수 있다.
var app = express();

// 템플릿 엔진이 ejs engine으로 설치되었음을 확인할 수 있다.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
```

대략적으로 흐름을 확인해보면, express Module을 불러와 `app` 객체를 생성한 후 기타 다른 Module을 불러오고, ejs engine을 세팅하는 등의 동작이 진행된다.

### Express Router와 미들웨어 확인하기

가장 중요한 것은 `routes` 디렉토리에 존재하는 `index.js`, `users.js` 라우터를 불러와 `app.use(path, router)`로 설정한다는 점이다. 즉, 해당 경로에 진입하는 경우 HTTP 요청과 응답을 해당 라우터로 진행하겠다고 설정하는 것이다.

```js
// app.js

// Router 불러오기
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use("/", indexRouter); // '/' 현재 페이지를 의미함(여기서는 http://localhost:3000)
app.use("/users", usersRouter); // 따라서 여기 path는 http://localhost:3000/users가 된다.
```

`index.js`의 라우터를 먼저 확인해보면 다음과 같다.

```js
// routes/index.js

var express = require("express");
var router = express.Router(); // express 객체의 새로운 라우터를 생성하는 메서드 Router()를 활용해 라우터 인스턴스를 생성하기

/* GET home page. */
// router.get(), router.post() 메서드는 Express에서 라우팅 기능을 제공한다.
// 이는 사실상 미들웨어
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
  // 응답 객체의 render 메서드를 활용해 views 디렉토리의 index.ejs 템플릿을 화면에 출력한다.
  // 이때 title 변수에 "Express" 값을 할당해 전달했음을 알 수 있다.
  // ejs 문법 상 <%= title %>으로 해당 변수 값을 사용할 수 있다.
});
// HTTP 메서드로 `get`
// '/'는 메인 페이지인 http://localhost:3000
// 콜백 함수는

module.exports = router; // 라우터 내보내기
```

라우팅은 클라이언트 요청에 대해 어플리케이션의 앤드포인트(URIs)가 응답하는 방식을 말하는데, express에서는 HTTP 메서드에 해당하는 express 라우터 메서드를 사용해 라우팅을 정의한다.([참고](https://velog.io/@hanblueblue/Node.js-3.-express))

> router.get('지정된 경로(URI) 값', 콜백 함수);

같은 방식으로, `users.js`도 라우터를 정의하고 있다.

```js
// routes/users.js

var express = require("express");
var router = express.Router(); // 라우터 생성하기

/* GET users listing. */
// 다만 이때의 경로는 http://localhost:3000/users 이다.
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
  // 응답 객체의 send 메서드로 HTTP 응답을 보낼 수 있다. 이때 매개 변수는 버퍼 객체, 문자열, 객체, Boolean 또는 배열일 수 있다.
});

module.exports = router; // 라우터 내보내기
```

이렇게 정의된 라우터는 `app.js`에서 불러와 활용되는 것을 이미 확인했다.

### Express 미들웨어 만들어보기

그럼 이제 새로운 미들웨어를 만들어보자!

```js
// routes/hello.js

const express = require("express");
const router = express.Router();

// http://localhost:3000/hello
router.get("/", (req, res, next) => {
  console.log("Test hello router."); // 터미널 출력
  res.send("Hello Express!"); // 화면 출력
});

module.exports = router;
```

이렇게 정의한 라우터를 `app.js`에서 불러와 `use` 메서드를 활용해 마운트해주면 된다. 즉, 지정된 경로에서 해당 라우터가 실행되게끔 설정한다.

```js
// app.js

var helloRouter = require("./routes/hello");

app.use("/hello", helloRouter);
```

> Test hello router.
> GET /hello 200 6.367 ms - 14

![hello page](img/express%20hello%20page.png)

---

웹의 핵심은 요청(request)에 의해 응답(response)하는 것인데, 이를 [미들웨어](http://expressjs.com/ko/guide/writing-middleware.html#mw-fig)가 담당하고 있다. 미들웨어는 Express.js 동작의 핵심으로, HTTP 요청(request)과 응답(response) 사이에서 단계별 동작을 수행해주는 함수이다. 미들웨어는 HTTP 요청이 들어온 시점부터 시작되며, **HTTP [요청](https://expressjs.com/ko/4x/api.html#req)과 [응답](https://expressjs.com/ko/4x/api.html#res) 객체를 처리**하거나, **다음 미들웨어를 실행**하는데, HTTP 응답이 마무리될 때까지 미들웨어의 동작 사이클이 실행된다.

즉, 미들웨어 함수는 요청 객체(`req`), 응답 객체(`res`), 그리고 그 다음의 미들웨어 함수(`next`) 대한 액세스 권한을 갖는 함수이다.

`next()` 함수를 호출해 어플리케이션 내의 그 다음 미들웨어 함수가 호출되게 된다. 이때 현재의 미들웨어 함수가 **요청-응답 주기를 종료하지 않는 경우**에는 `next()`를 호출해 그 다음 미들웨어 함수를 호출해야 한다. 그렇지 않으면 해당 요청이 정지된 채로 방치되기 때문이다.

![미들웨어](img/middleware.png)

---

### Express 미들웨어 `next()`

```javascript
const express = require("express");
const router = express.Router();

// http://localhost:3000/list
router.get("/", (req, res, next) => {
  console.log("Test list router."); // 터미널 출력
  res.send("This page shows list."); // 화면 출력
  next(); // 현재 미들웨어의 기능을 마치고, 다음 미들웨어로 연결해주는 역할을 담당.
});

router.get("/", (req, res, next) => {
  console.log("Test item router."); //
  // res.render('list', {title: "LIST", item: "list-items"})
});

module.exports = router;
```

> Test list router.
> Test item router.
> GET /list 304 5.909 ms - -

`next()`를 통해 미들웨어를 연결할 수 있다. 다만, 하나의 미들웨어에 모든 동작을 모두 작성할 수 있는데, 나누어 작성하는 이유는 무엇일까?

우리는 미들웨어가 끊기지 않고 다음 동작을 원활하게 진행할 수 있기 위해 `next()`를 활용한다. `next()`는 콜백을 끊어주는 느낌으로, 더 간결하고 동기적으로 작성하기 위해 쓴다. 예를들어 소모임, 문토, 소셜링 신청 시 신청은 끝나지만, 그 다음 동작이 중요하다. 따라서, 미들웨어를 활용해 끊기지 않고 계속 동작을 할 수 있게 해주어야 한다.

이때 다음 미들웨어에서 `res.method()`를 다시 사용하면, 에러가 발생한다.

> Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client.

웹에서의 통신 방식은 **1요청 1응답**이 우선이다. 하나의 요청에 다수의 응답을 받을 수 없다. 1요청 1응답 이후에는 통신이 종료되는 것이 정상이다.

따라서, 이전 미들웨어에서 1응답을 한 경우, 다음 미들웨어에서 응답을 또 하면 에러가 발생한다. 따라서 주소가 동일한 미들웨어를 설정해서 응답을 해야한다.

---

### Express Post

HTML 템플릿 구현을 할 수 있다. SSR에서 화면을 미리 만드는 작업이다.

```html
<!-- views/post.ejs -->

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

이후 해당 템플릿을 활용하는 라우터를 생성하고 미들웨어를 작성한다.

```javascript
// routes/post.js

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

라우터 구현이 완료되면, `app.js`에서 해당 라우터를 불러와 설정하면 된다.

```javascript
// app.js

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

## MongoDB

mongoDb: 윈도우 환경에서 환경 변수 추가 필요([참고](https://khj93.tistory.com/entry/MongoDB-Window%EC%97%90-MongoDB-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0))

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
