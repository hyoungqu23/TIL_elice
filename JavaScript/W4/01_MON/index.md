## 00. Review

CRUD pages 구현하기

npx vscode-new: 임시 새 창 열기(temp 디렉토리)

## 01. JSON server

> 설치

```
npm install -g json-server
```

프로토타입 백엔드 서버로 활용된다. `localhost:3000`으로 진입이 가능하다.
> 실행

```
npx json-server --watch db.json
```

수많은 서버를 구분하기 위해 port(0 ~ 65000) 번호를 부여한다. 3000번의 json server가 대기하고 있어 통신할 수 있다. 이후
`http://127.0.0.1:3000/topics/1`에서 `topics/1`에 의해 topics의 첫 번째 정보를 응답한다.

json-server는 요청을 받은 데이터를 찾고, 이를 응답하여 보내주거나 Restful API 약속에 따라 추가, 수정, 삭제 등을 처리한다.

## 02. Ajax

Asynchronous JavaScript And XML의 약어로, 서버와 비동기적으로 통신할 때 사용하는 API이다. 과거에는 XMLHttpRequest를 사용했지만, 현재는 fetch를 사용한다.

## 03. fetch

fetch API를 활용하면 개발자 도구의 네트워크 탭(브라우저와 서버 간에 통신내용을 모니터링 할 때 사용하는 도구)에서 콘솔에 JavaScript로 웹 페이지를 접속할 수 있다.

```javascript
fetch(URL);
```

> 첫 번째 then에서 데이터 타입을 결정한다.

```javascript
fetch('http://localhost:3000/topics')
  .then(response => response.text())    // 축약
  // .then(function(response) {return response.text()})
```

서버가 보내주는 데이터가 fetch API에 text라고 알려주는 것이다.

> 두 번째 then에서 데이터를 전달 받는다.

```javascript
fetch('http://localhost:3000/topics')
  .then(response => response.text())
  .then(data => {console.log(data)})

// [
//   {
//     "id": 1,
//     "title": "HTML",
//     "body": "HTML is ..."
//   },
//   {
//     "id": 2,
//     "title": "CSS",
//     "body": "CSS is ..."
//   },
//   {
//     "id": 3,
//     "title": "JavaScript",
//     "body": "JavaScript is ..."
//   }
// ]
```

이렇게 가져온 데이터는 단순 text로, JavaScript 데이터로 변환하기 위해 [`JSON.parse()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)를 사용하면, JavaScript 데이터 타입으로 전환된다.

```javascript
JSON.parse()
```

JSON을 활용하는 이유는 php, Java, Python 등의 언어로 이루어진 서버에서 만들어진 데이터를 가져오면, 웹 브라우저의 JavaScript로 바로 받아올 수 없다. 따라서 `[]`, `{}` 등 약속을 정해 주요한 데이터 타입을 서로 활용할 수 있게끔 하기 위해 JSON 데이터를 활용하는 것이다.

즉, 서로 다른 언어끼리 데이터를 주고 받기 위해 약속한 데이터 형식이나 포맷을 JSON이라고 할 수 있다. JavaScript 데이터 표기법을 기준으로 데이터를 텍스트로 저장하는 것이 [JSON(JavaScript Object Notation)](https://www.json.org/json-en.html)이다.

따라서 첫 번째 then에서 JSON 타입이라고 선언하면, 이는 JSON 데이터를 JavaScript 데이터로 전환시켜서 반환한다.

```javascript
fetch('http://localhost:3000/topics')
  .then(response => response.json())
  .then(data => {console.log(data)})

// (3) [{…}, {…}, {…}]
```

> CRUD 프로젝트 JSON으로 변경하기

다만, 이렇게 변경하면 json-server를 종료하면 더이상 데이터를 가져오지 못한다.

```javascript
function nav() {
  fetch("http://localhost:3000/topics")
    .then(response => response.json())
    .then(topics => {
      const tag = topics
                    .map(el => `<li><a href='/read/${el.id}.html' id='${el.id}' onclick='navHandler(event);'>${el.title}</a></li>`)
                    .join(" ");
      document.querySelector('nav>ol').innerHTML = tag;
    })
}
```

json-server는 id 값을 주소에 추가하면, 해당 데이터만 가져올 수 있다. 즉, id 값을 통해 해당 데이터만 가져오게 할 수 있다.

```javascript
function read() {
  // selectedId를 주소에 추가하여 해당 데이터 1개만 가져오기 때문에 topic만 가져와도 된다.
  fetch("http://localhost:3000/topics/"+selectedId)
    .then(response => response.json())
    .then(topic => {
      // 서버로부터 데이터를 받아오고, json 데이터로 변환한 이후에 실행되는 부분
      const content = `<h2>${topic.title}</h2><p>${topic.body}</p>`
      $article.innerHTML = content;
    })
}
```

## 04. Rest API

http의 기능을 최대한 활용해 서버와 통신할 것을 제안하는 모범 사례. (URL의 모범 사례를 보여준다.)
![rest api](rest api.png)

데이터를 제공할 때 Rest API에 준수하면 좋다.
![crud](image4.png)

GET method를 활용해 보통 데이터를 조회한다.

POST method를 활용하면 데이터를 생성할 수 있다.

```javascript
fetch('http://localhost:3000/topics', {method: 'POST'} )
```
