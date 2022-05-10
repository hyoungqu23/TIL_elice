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
