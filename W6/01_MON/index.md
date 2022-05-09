# 0509

## 00. npm

Node Package Manager로, Module(`lite-server`, `passport`(sns 로그인) 등)을 사용할 때 활용한다.

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
