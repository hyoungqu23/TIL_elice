# 0517

## Template Engine

템플릿 엔진은 템플릿 작성 문법과 작성된 템플릿을 HTML로 변환하는 기능을 제공한다. 즉, 서버에서 클라이언트로 보낼 HTML 형태를 미리 템플릿으로 저장해두고, 동작 시 미리 작성된 템플릿에 데이터를 삽입해 완성된 HTML 생성하여 서버가 클라이언트로 전송한다.

- [EJS](https://www.npmjs.com/package/ejs): HTML과 유사한 문법으로 구성할 수 있는 템플릿 엔진
- [Mustache](https://github.com/janl/mustache.js): 간단한 데이터 치환 정도만 제공하는 경량화된 템플릿 엔진
- [Pug](https://pugjs.org/api/getting-started.html): 들여쓰기 표현식을 이용한 간략한 표기와 레이아웃 등 강력한 기능을 제공하는 템플릿 엔진

### Pug Template Engine

Pug 템플릿 엔진은 들여쓰기 표현식을 활용한 방식으로 가독성과 개발 생산성을 높일 수 있고, [layout](https://pugjs.org/language/inheritance.html), [include](https://pugjs.org/language/includes.html), [mixin](https://pugjs.org/language/mixins.html) 등 다양한 강력한 기능을 제공한다. 또한, HTML을 모르더라도 문법적 실수를 줄일 수 있어 간략하게 큰 어려움 없이 활용 가능하다.

#### Pug 기본 문법

```pug
html
  head
    title = title
  body
    h1#greeting 안녕하세요
    a.link(href="/") 홈으로
```

HTML 닫기 태그 없이 들여쓰기로 블럭을 구분하고, 단순히 `=`을 통해 전달받은 변수를 활용한다. id, class의 경우 CSS 선택자처럼 활용하고, attribute의 경우 `()`를 통해 표현한다.

##### `each - in`, `if - else if - else`

```pug
each item in arr
  if item.name == 'new'
    h1 New Document
  else
    h1= `${item.name}`
```

`each - in` 표현식으로 주어진 배열 값을 순환하며 HTML 태그를 생성할 수 있으며, `if - else if - else` 조건문으로 주어진 값의 조건을 확인해 HTML 태그를 생성할 수 있다.

##### `block`, `extends`

```pug
//- layout.pug
html
  head
    title= title
  body
    block content

//- main.pug
extends layout
block content
  h1 Main Page
```

[`block`](https://pugjs.org/language/inheritance.html)을 포함한 템플릿을 선언해 layout으로 활용할 수 있으며, 이를 `extends`하여 block 부분에 작성한 HTML 태그를 포함시킬 수 있다. layout 기능을 통해 반복되는 웹사이트의 틀을 작성해두고, `extends`하는 방식으로 개발하면 매우 편리하다.

##### `include`

```pug
//- title.pug
h1= title

//- main.pug
extend layout
block content
  include title
  div.content
    안녕하세요
  pre
    include article.txt
```

자주 반복되는 구문을 하나의 조각으로 미리 작성해둔 뒤, `include`하여 사용할 수 있다. 일반적인 텍스트 파일도 `include`할 수 있다.

##### `mixin`

```pug
//- listItem.pug
mixin listItem(title, name)
  tr
    td title
    td name

//- main.pug
include listItem
table
  tbody
    listItem('제목', '이름')
```

`mixin`을 활용해 템플릿을 하나의 함수처럼 사용할 수 있다. 매개 변수를 지정하여 값을 넘겨받아 템플릿에 적용할 수 있다는 큰 장점이 있다.

#### Express.js와 Pug 연동하기

```js
// app.js
app.set("views", path.join(__dirname, "views")); // 템플릿 저장 디렉토리 설정
app.set("view engine", "pug"); // 템플릿 엔진 설정

res.render("main", { title: "Hello Express & PUG!" }); // 템플릿의 이름과 전달하는 값을 인자로 받아 화면에 렌더링
```

`app.locals`를 사용해 `render` 함수로 전달하지 않은 값, 함수를 전달할 수 있다. 즉, 템플릿 전역에서 사용될 값을 설정할 수 있다.

```js
// app.js
app.locals.appName = "express";
```

```pug
//- main.pug
h1 = appName;
```

express-generator 사용 시에는 템플릿 엔진을 옵션으로 따로 설정할 수 있다.

```ps
express --view=pug myapp
```
