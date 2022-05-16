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

##
