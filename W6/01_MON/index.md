# 0509

## 00. npm

Node Package Manager로, Module([`lite-server`](https://www.npmjs.com/package/lite-server), [`passport`](https://www.npmjs.com/package/passport)(sns 로그인) 등)을 사용할 때 활용한다.

```command
npm init
```

세부 설정을 하고 나면 package.json이 생성된 것을 확인할 수 있다.

```json
{
  "name": "nodejs",
  "version": "0.0.1",
  "description": "node practice",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

scripts에서 명령어를 추가할 수 있다.

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "lite-server"
},
```

다음 명령어를 통해 특정 모듈을 설치할 수 있다. 그렇게 되면 node_modules 디렉토리가 생성되고, 필요한 파일이 설치된다. 또한, package-lock.json 파일이 생성되는데, package.json 두 가지 파일을 통해 협업 시 공유할 수 있게 된다.

```command
npm install
```

### [lite-server](https://www.npmjs.com/package/lite-server)

```command
npm i lite-server
```

scripts에서 시작 명령어를 추가할 수 있다.

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "lite-server"
},
```

다음 명령어를 통해 lite-server를 시작할 수 있다.

```command
npm start
```

다만, `http://localhost:3000/`이 열리면, 에러가 발생한다. 해당 에러는 404 get 에러로, 404 GET /index.html, 404 GET /favicon.ico가 존재하지 않기 때문이다.

index.html을 생성한 후 다시 서버를 재시작하면 제대로 에러가 없이 시작되는 것을 알 수 있다.

> Status Code: 200(정상), 404(에러), 500(읽어야 할 파일이 존재하지 않는다.(경로 에러 등))

**Status Code**를 잘 확인하는 것이 중요하다!

> package.json

```json
{
  "name": "nodejs",
  "version": "0.0.1",
  "description": "node practice",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lite-server": "^2.6.1"
  }
}
```

프로젝트가 어떤 패키지를 활용하고 있는지를 보여준다.

`dependencies`: 실제 서버와 개발 환경에서 모두 활용하는 것.
`devDependencies`: 개발 환경에서만 활용하는 package. (`--save-dev` 옵션으로 설치한다.)

Docker로 인해 가상 개발 환경이 활성화되면서, `devDependencies`는 유명무실해지는 추세이다.

```command
npm remove
```

해당 명령어로 특정 package를 제거할 수 있다.

`-g, --global`을 통해 전역에서 설치할 수 있다.

서버는 서비스를 운영하는데, 운영을 위해 접속 관리, 다중 접속 관리가 중요하다. 따라서 pm2, forever 등의 운영을 위한 package를 설치하는데, 이때 전역적으로 설치한다.

npx, nvm: 배포에 관련된 패키지, 버전 관리를 위해 사용한다.

## Module

라이브러리라고도 불리는 module은 중복되는 기능이나 지속적으로 활용해야 하는 기능을 반복적으로 사용할 수 있게끔 만드는 코드를 말한다.

### Module 만들어보기

> calc.js

```javascript
function add1(a, b) {
  return a + b;
}

module.exports.add = add;
```

> app.js

```javascript
const calc = require("./calc");
// calc.js 처럼 확장자를 끝까지 작성하지 않아도 된다.

console.log(calc.add(10, 20));
```

```command
node app
```

해당 명령어를 통해 JavaScript 파일을 실행할 수 있다.

### module을 내보내는 다른 방법

객체로 내보낼 수 있다.

> calc.js

```javascript
module.exports = {
  add1: add,
  sub: sub,
  mul: mul,
  div: div,
};
```

단순히 함수만이 아니라 숫자, 문자열 등 변수를 내보낼 수도 있다.

> func.js

```javascript
let number = 0;

module.exports = number += 1;
```

추가적인 기능을 활용해 내보내면서 적용할 수 있다.

다만, 같은 기능을 여러번 중복적으로 활용하고자 한다해도 사용할 수 없다.

`require`의 특성상 한 번 호출된 후 바로 삭제한다. 따라서 기능을 반복적으로 활용할 수는 없다. 즉, for 반복문에서 10번 호출되고 삭제되기 때문에 1이 계속 출력된다.

> app.js

```javascript
const func = require("./func");

for (let i = 0; i < 10; i++) {
  console.log(func);
}
```

다만, 함수로 내보내는 경우 삭제되지 않고 남아있기 때문에 중복된 기능을 활용할 수 있게 된다.

> func.js

```javascript
let number = 0; // 기능을 공유하기 때문에 number도 자연스럽게 활용이 가능하다. > 다시 듣기

module.exports = () => {
  return (number += 1);
};
```

> app.js

```javascript
const func = require("./func");

for (let i = 0; i < 10; i++) {
  // console.log(func);
  console.log(func());
}
```

## [Express.js](https://expressjs.com/)

```command
npm install express-generator -g
```

해당 명령어로 설치할 수 있다.

```command
express --view=ejs myapp
```

`myapp` 프로젝트 디렉토리를 생성하고, 이후 이동한 후 `npm install`을 통해 npm을 설치한다. 다음으로 `npm start`로 프로젝트를 시작할 수 있다.

`http://localhost:3000/`에 접속해 확인할 수 있다. 또한, `http://localhost:3000/users`에 접근해 respond with a resource를 확인할 수 있다.

커멘드에서 보면 메서드와 주소, status code 등을 확인할 수 있다.

> GET /users 200 1.368 ms - 23
