# 0510

## npm

온라인 저장소와 커맨드라인 도구로 구성된 npm은 Node Package Manager의 약어로, Node.js 프로젝트를 관리하는 필수적인 도구이다. 온라인 저장소에는 수많은 오픈소스 라이브러리와 도구들이 업로드 되어, 필요하다면 손쉽게 검색해 프로젝트에 추가할 수 있다. 또한, 프로젝트 관리를 위한 다양한 명령어(저장소에서 라이브러리, 도구를 설치, 프로젝트 설정하고 관리, 프로젝트 의존성 관리 등)를 제공한다.

## npm 명령어

npm 커맨드라인 도구의 사용법을 알고 있어야 한다.

### 프로젝트 생성

```command
npm init
```

프로젝트 디렉토리 내부에서 해당 명령어를 활용하면 프로젝트 관련 정보들이 저장되는 `package.json` 파일을 만들어주고, 이 디렉토리는 Node.js 프로젝트가 된다. `package.json` 파일을 직접 수정하거나 npm 명령어를 통해 프로젝트 정보(버전, 이름, 설명, 스크립트, 의존성 패키지 등)를 수정할 수 있다.

#### dependencies

프로젝트 내에서 사용하는 라이브러리를 의미한다. 즉, 프로젝트가 실행되기 위해 외부 라이브러리에 의존하므로, dependencies를 관리해야 한다.

#### 라이브러리

라이브러리란 특정 기능을 수행하는 코드의 묶음을 의미하는데, 복잡한 기능들을 직접 작성하지 않고 효율성을 위해 다른 사람이 구현한 해당 기능을 불러와 사용하는 것이다. Node.js에서는 패키지라고도 부른다.

### 프로젝트 dependencies 관리(라이브러리 설치)

```command
npm install
```

프로젝트 dependencies를 관리하기 위해 해당 명령어를 활용한다. 축약형인 `npm i`로도 가능하다. 이는 사용하는 옵션에 따라 여러 용도로 사용할 수 있다. 즉, 의존성을 추가하거나 내려받거나, 개발용 의존성을 추가하거나 전역 패키지를 추가하는 등의 작업을 할 수 있다.

#### dependencies 추가

```command
npm install [package name]
```

해당 명령어를 통해 필요한 패키지를 프로젝트에 추가할 수 있다. 이렇게 추가된 패키지는 `package.json` 파일 `dependencies` 내부에 작성되고, `node_modules` 디렉토리에 저장된다.

```command
npm install [package name]@[version]
```

참고로 이때 `@[version]`을 추가해 패키지의 특정 버전을 추가할 수 있다. 버전이 올라갈수록 하위 호환성 문제가 발생할 수 있기 때문에 버전을 추가해 패키지를 지정할 수 있다.

- `@[~1.13.0]`: `1.13.x` 버전 설치
- `@[^1.13.0]`: `1.x.x` 버전 설치
- `@[0.13.0]`: `0.13.0` 버전 설치

프로젝트에 dependencies를 추가하면 `package-lock.json` 파일이 생성되는데, 버전을 명시하지 않은 패키지는 자동으로 최신 버전으로 추가된다. 이때 이러한 패키지들의 버전이 변경되지 않도록 설치된 버전을 고정하는 역할을 하는 파일이다.

#### devDependencies

```command
npm install [package name] --save-dev
```

`--save-dev` 옵션을 추가한 명령어를 통해 배포 전까지만 사용하는 의존성으로 devDependencies를 분리하여 관리할 수 있다. `package.json` 파일 `devDependencies` 내부에 작성된다.

#### dependencies & devDependencies 내려받기

일반적으로 `node_modules` 디렉토리는 코드를 관리할 때나 배포할 때는 dependencies 추가로 인한 용량 문제와 운영체제별로 실행되는 코드의 상이함 때문에 업로드하지 않는다.

```command
npm install
```

따라서 협업 혹은 다른 사람의 코드를 받아서 실행하는 경우에 해당 명령어를 아무 옵션 없이 사용해 `package.json`의 `dependencies`와 `devDependencies` 내부에 정의되어 있는 패키지들을 `node_modules` 디렉토리에 내려받을 수 있다.

#### dependencies 내려받기

```command
npm install --production
```

프로젝트를 배포할 때는 devDependencies를 포함할 필요가 없기 때문에 해당 명령어를 활용해서 `package.json`의 `dependencies` 내부에 정의된 패키지들만 `node_modules` 디렉토리에 내려받으면 된다.

#### 전역 dependencies 추가

```command
npm install [package name] --global
```

`--global` 옵션을 통해 패키지를 전역 패키지 디렉토리에 추가할 수 있다. 주로 프로젝트에 종속되지 않는 커맨드라인 도구들(express-generator, pm2 등)을 전역 패키지로 추가하여 사용한다.

다만, 로컬 패키지를 활용해 `package.json`에 명시적으로 선언되어 있는 것이 프로젝트 관리에 더 좋다.

#### dependencies 제거

```command
npm remove [package name]
```

해당 명령어를 통해 `package.json` 파일 내의 `dependencies`, `devDependencies`, `node_modules` 디렉토리 모두에서 패키지를 삭제할 수 있다.

### 스크립트 실행

간단한 동작을 수행하는 코드로, `package.json` 파일 내의 `scripts`에 선언된 스크립트를 다음 명령어를 통해 실행할 수 있다.

```command
npm run [script name]
```

주로 의존성 패키지를 사용할 때, node_modules에 설치된 파일을 직접 실행하는 것이 아니라, 패키지의 module을 직접적으로 호출해 사용할 수 있게 해준다.

- `npm test`: 코드 유닛 테스트 등에 활용
- `npm start`: 프로젝트 실행
- `npm stop`: 프로젝트 종료

## npx

npx는 npm의 새롭게 추가된 기능 중 하나로, npm 패키지를 설치하지 않고 사용할 수 있게 해주는 도구이다. 즉, 프로젝트에 추가하거나 전역 패키지로 추가하지 않고, npx를 이용하여 바로 실행할 수 있다.

또한, 다음과 같이 Node.js의 특정 버전을 설치하지 않고 실행하여 버전별 실행 환경을 확인할 수 있다.

```command
npx node@12 index.js
npx node@14 index.js
```

추가적으로 github에 등록된 간단한 코드 조각인 gist 코드를 실행해볼 수 있다.

```command
npx https://github.com/examples/example_gist_practice
```

## Modules

간단한 프로그램이라면 파일 하나만으로도 실행이 가능할 것이다. 하지만 프로젝트가 커지면 커질수록 기능에 맞게 코드를 분리하는 것이 중요해진다. 이때 Modules은 코드를 분리하기 위한 방법 중 하나이다. 즉, 반복되는 코드를 Module로 분리하여 사용할 수 있다. 참고로 앞서 살펴본 패키지는 Module의 모음이라고 볼 수 있다.

### 기본 제공 Modules

Node.js는 다양한 Module을 기본적으로 제공한다.

#### `console`

브라우저에서 제공되는 console과 유사한 디버깅 도구로, `log`, `warn`, `error` 함수로 로그 레벨을 표시하거나, `time`, `timeLog`, `timeEnd` 함수로 시간을 추적할 수 있다.

#### `process`

현재 실행 프로세스와 관련된 기능을 제공하는 Module로 `arch`, `argv`, `env` 등 실행 환경 및 변수 관련 값이나 `abort`, `kill`, `exit` 등 프로세스 동작에 관련된 함수를 제공한다.

#### `fs`(file-system)

파일의 입출력을 위한 Module로 `readFile`, `writeFile` 함수나 `readFileSync`, `writeFileSync` 함수로 동기적 작업을 제공하며, `watch` 함수로 파일이나 디렉토리의 변경 이벤트를 감지할 수 있다.

#### `http`

http 서버, 클라이언트 제작을 위해 사용되는 Module로, `createServer` 함수로 서버를 생성하고, `Request` 함수로 http 요청을 생성한다.

### Module 작성

> module.js

```javascript
const name = "elice";
const age = 5;
const nationality = "korea";

module.exports = {
  name,
  age,
  nationality,
};
```

> app.js

```javascript
const student = require("./module");

> { name: 'elice', age: 5, nationality: 'korea' }
```

Module이 로드될 때 사용될 값을 `module.exports`로 내보내는 것을 확인할 수 있다.

이와 달리 변수명을 활용해 각 key - value를 지정해 `exports`하는 방법도 있다.

> module.js

```javascript
const name = "elice";
const age = 5;
const nationality = "korea";

exports.name = name;
exports.age = age;
exports.nationality = nationality;
```

> app.js

```javascript
const student = require("./module");

> { name: 'elice', age: 5, nationality: 'korea' }
```

함수형으로 Module을 작성해 `exports`할 수 있고, 이때 Module 사용 시 값을 정할 수 있게 내보낼 수 있다.

> module.js

```javascript
module.exports = (name, age, nationality) => {
  return {
    name,
    age,
    nationality,
  };
};
```

함수형 Module의 경우 로드한 뒤 바로 실행되지 않고 로드한 함수를 실행해야 Module을 활용할 수 있다.

> app.js

```javascript
const student = require("./module")('elice', 5, 'korea');

> { name: 'elice', age: 5, nationality: 'korea' }
```

Module을 만드는 여러 방법이 있지만, 로드할 때는 `require` 함수만을 활용한다. 다만, `require`할 때 Module의 코드가 실행된다. 또한 첫 `require`시 실행되고, 이후에는 cache된 Module을 가져다가 사용하게 된다. 따라서 해당 Module의 코드를 여러 번 반복 실행하기 위해서는 함수형 Module로 작성해야 한다.

참고로 JSON 파일의 경우, Module로써 로드할 수 있는데, 이는 object data로 자동으로 parsing된다.

### ES Module

ES6에서 등장한 JavaScript의 공식적인 표준 Module(`export`, `import`)로, 독자적인 방식으로 Node.js가 지원하는 commonjs Module(`module.exports`, `require`)과 문법, 기본적인 동작 방식 등이 다르다. 따라서 같이 사용하기에는 부적절하다.

## 웹

### 웹의 이해

웹은 사전적으로 인터넷 상에 동작하는 모든 서비스를 의미하고, 일반적으로는 웹 브라우저로 접속해 이용하는 서비스인 웹 사이트를 의미한다.

### 웹 서비스 동작 방식

웹 서비스는 기본적으로 **HTTP 요청과 응답**의 반복으로 이루어진다.

사용자가 URL을 입력하면, 브라우저가 인터넷을 통해 HTTP 요청을 서버에 전달하고, 서버는 사용자의 HTTP 응답을 브라우저로 전송한다. 이후 웹 브라우저는 HTTP 응답을 시각화하여 사용자에게 적절한 화면으로 노출한다.

#### HTTP 요청

HTTP 요청은 사용자가 **어떤 데이터가 필요한지를 서버에게 알리는** 역할이다. 즉, HTTP 요청은 어떤 사용자가 어떤 데이터를 필요로 하는지에 대해서 담고 있다.

> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0)
> Accept: text/html
> Accept-Language: ko-KR
> Accept-Encoding: gzip, deflate
> Connection: keep-alive

#### HTTP 응답

HTTP 응답은 **HTTP 요청에 해당하는 적절한 데이터를 전달**하는 역할이다. 즉, HTTP 응답은 사용자가 요청한 데이터와 어떤 데이터가 전송되는 지 등을 담고 있다.

##### 전송된 데이터

> HTTP/1.1 200 OK
> X-Powered-By: Express
> Content-Type: text/html; charset=utf-8
> Date: Mon, 25 Oct 2021 14:10:35 GMT
> Connection: keep-alive
> Keep-Alive: timeout=5

##### 사용자가 요청한 데이터

```html
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

### 정적 웹(WEB 1.0)과 동적 웹(WEB 2.0)

정적 웹은 사용자와 상호작용하지 않는 페이지로, 단방향 통신만을 하고, Link를 통한 페이지 이동 정도만 가능하다. 일반적으로 변하지 않는 HTML 문서가 제공된다.

이와 다르게 동적 웹은 양방향 통신으로, 사용자와 상호작용을 하고, 구글 맵 검색, 웹 채팅 등 사용자가 다양한 기능을 수행할 수 있으며, 프론트엔드와 백엔드가 유기적으로 통신하며 동작한다.

#### 동적 웹의 구현 방법

**CSR(Client-Side Rendering)**은 프론트엔드에서 사용자가 페이지에서 보는 동적인 부분을 처리하고 백엔드와 API 통신으로 데이터만 주고받는 방식이고, **SSR(Server-Side Rendering)**은 백엔드에서 페이지 대부분의 영역을 처리해 HTTP 응답에 전달하고, 프론트엔드는 그 HTTP 응답을 받아 화면에 표시만 하는 방식이다.

##### CSR 특징

- 사이트가 변하는 부분들을 프론트엔드에서 대부분 처리한다. 즉, 프론트엔드 코드에서 페이지 리소스들이 미리 정의되어 있고, 서버와의 통신은 API 통신을 이용한다.
- 빠르게 페이지가 구현되어 보이지만, 페이지의 내용은 API 호출이 완료된 후에 보여진다.
- 프로젝트 구성이 복잡하고, 개발 사이즈가 크다는 단점이 있다.

##### SSR 특징

- 사이트가 변하는 부분들을 대부분 백엔드에서 처리하여 HTML 파일을 작성해 프론트엔드로 전달한다.
- 프로젝트의 구성이 간단하고, 개발 사이즈가 작아진다.
- 로딩이 완료되는 경우 페이지와 데이터가 한 번에 표시되고, 페이지가 이동할 때마다 다시 로딩해야 하는 단점으로 인해 페이지 깜빡임 현상이 관측되고, 사용자가 보기에 상대적으로 로딩이 느려보인다.

### 웹 프레임워크

웹 프레임워크는 웹 서비스에 필요한 기능들을 제공해주는 다양한 도구들의 모음(Express.js, Koa.js, Nest.js 등)을 의미한다. 웹 서비스를 구성하기 위해서는 많은 기능이 필요한데, 모두 직접 만드는 것은 비즈니스적으로 초과 비용을 발생시키기 떄문에 정형화된 많은 부분(HTTP 요청과 응답 처리, 라우팅, HTML Templating 등)을 간단하게 구현하는 프레임워크를 활용해 필요한 부분만 집중해서 개발할 수 있다.

#### HTTP 요청 처리

웹 프레임워크는 어떤 데이터를 필요로 하는지, 어떤 사용자로부터 요청이 수신되었는지 등을 처리할 수 있다.

#### HTTP 응답 처리

웹 프레임워크는 응답 데이터가 어떤 형식인지, 응답 상태가 정상인지 등을 처리할 수 있다.

#### 라우팅

웹 프레임워크는 HTTP 요청을 분기하는 방법 즉, 라우팅 기능을 제공한다. 이는 HTTP 요청 URL에 해당하는 알맞은 응답의 경로를 미리 설정할 수 있는 방법을 제공하는 것을 말한다.

#### HTML Templating

웹 프레임워크는 SSR을 구현하기 위한 방법으로, 응답으로 보낼 HTML을 서버에서 작성할 때 HTML Template을 통해 페이지의 뼈대를 작성할 수 있게 해준다.

## Express.js

Express.js는 Node.js의 웹 프레임워크 중 가장 유명한 웹 프레임워크로, 필요에 따라 유연하게 구조를 설정할 수 있으며 다양한 미들웨어를 통해 필요한 기능을 간단하게 추가할 수 있다는 장점을 갖고 있다.

또한, 모든 동작이 명시적으로 구성되기 때문에, 웹 프레임워크의 동작 방식을 이해하기 가장 좋은 프레임워크이다.

### Express.js 시작하기

`npm init` 명령어로 Express.js를 시작해 처음부터 작성할 수 있지만, 직접 모든 구조를 작성해야 하는 어려움이 있다.

```command
mkdir projectName "디렉토리 생성"
cd projectName  "디렉토리 이동"
npm init "프로젝트 생성"
npm i express "express 패키지 설치"
```

```javascript
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.listen(3000, () => {
  console.log("Server Started");
});
```

따라서 Express-generator라는 프로젝트 생성기를 통해 프로젝트의 기본 구조를 자동으로 생성해 빠르게 프로젝트를 시작할 수 있다. 생성된 프로젝트는 `npm start` 명령어로 실행할 수 있다.

```command
npm i -g express-generator  "express-generator 설치"
express projectName  "express.js 프로젝트 생성"
cd projectName  "디렉토리 이동"
npm install  "패키지 설치"
npm start  "서버 실행"
```

다만, Express-generator를 사용하는 경우 프로젝트 생성 이후에는 사용되지 않기 때문에 npx를 통해 설치하지 않고 바로 사용이 가능하다.
