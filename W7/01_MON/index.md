# 0516

## REVIEW

MVC 디자인 패턴(Model, View, Controller): 유용하게 활용할 수 있는 정형화된 패턴이었으나, 최근에는 이미 프로그래밍 언어가 디자인 패턴을 포함해서 설계되기 때문에 의미가 퇴색되고 있다. Single Turn, Factory, MVC 등의 패턴들만 주로 사용된다.

## Controller 활용

```js
// controller/main.js

const mainscreen = (req, res) => {
  res.render("index", { title: "Express" });
};

module.exports = {
  mainscreen,
};
```

```js
// routes.index.js

var express = require("express");
var router = express.Router();
const mainController = require("../controller/main");

/* GET home page. */
// Controller 활용
router.get("/", mainController.mainscreen);

module.exports = router;
```

화면에 렌더링하는 것과 라우팅 기능을 분리할 수 있다. (< 정확한 워딩 다시 듣기 && 기존 파일 가져와서 해보기)

굳이 처음부터 만드는 것보다는 리팩토링 단계에서 수정하는 것이 낫다.

## REST API

최근에는 Mobile, SPA, 임베디드 기기 등 다양한 클라이언트들이 존재한다. HTTP 통신 방식은 html을 반환하는데, 웹 브라우저만 html을 지원하고, Mobile, SPA, 임베디드 기기 등은 html을 읽지 못한다. 따라서 모든 기기에서 호응 가능한 순수한 **데이터**만을 주고받을 수 있도록 한 API가 REST API이다. 즉, 데이터 중심으로 다양한 클라이언트를 지원하는... (다시 듣기)

따라서, HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.([참고](https://api.iamport.kr/#/))
