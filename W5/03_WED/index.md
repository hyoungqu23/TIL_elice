# 0504

## 01. 동적 타입과 정적 타입

### 동적 타입(Dynamic Typing)

동적 타입(Dynamic Typing)은 컴파일 단계 없이 **인터프리터**와 같은 코드 해석기가 코드를 라인 단위로 읽으며 바로 코드를 실행할 때 코드 내의 변수(데이터) 타입이 정해지는 방식으로, 바로 코드를 실행해야 하기 때문에 인터프리팅 언어들이 동적 타입을 사용한다. 흔히 스크립트 언어들이 동적 타입 방식을 많이 사용한다. 인터프리터 언어들은 JIT 방식으로 즉시 코드를 읽기 때문에 성능이 떨어질 수 있어 새롭게 기존 인터프리터와 최적화(Optimization) 컴파일러를 동시에 포함하여 성능을 개선하는 방식도 사용된다.

```javascript
function add(a, b) {
  return a + b;
}

let value1 = 1;
let value2 = 2;

console.log("Hello, World!");
const result = add(value1, value2);
console.log(result);
console.log(a / 0);

> Hello, World!
> 11
> Error: Division by zero
```

위의 예시처럼 실행시킨 이후에서나 에러를 확인할 수 있다는 점이 단점이다. 다만, JavaScript는 ESLint(에러 모음 라이브러리)를 활용해 에러를 IDE에서 확인할 수 있다.

### 정적 타입(Static Typing)

정적 타입(Static Typing)은 타입을 코드에 명시적으로 표현하는 방식으로써 코드가 실행되기 전에 타입을 정의하는 방식으로, 언어의 전용 컴파일러가 컴파일 단계에서 코드 내 변수들의 타입을 분석해 코드를 실행하기 전에 기초적인 결함을 찾을 수 있다는 장점이 있다. 다만, 컴파일 과정을 반드시 거쳐야한다는 단점이 있으나, 기본적인 결함이 없는 결과물을 얻을 수 있다는 것은 큰 장점이다. 또한 코드 리팩터링과 같은 최적화가 되어 있어 작성한 코드이 성능을 높여줄 수 있다.

```java
class Main {
  public static void main(String[] args) {
    int value1 = 1;
    String value2 = 10;
    int result = this.add(value1, value2);    // Error: value2가 string type이기 때문에
  }

  private int add(int a, int b) {
    return a + b;
  }
}
```

## 02. JavaScript 한계

### 프로그래밍 언어 - 인터프리터/스크립트 언어

프로그래밍 언어는 사람과 컴퓨터 간의 커뮤니케이션을 가능케하는 언어이다. 특히 인터프리터/스크립트 언어는 일련의 작업만을 수행하도록 하는 코드를 빠르게 작성하는 데에 집중되어 일반적인 컴파일 언어보다 기능과 제한이 적다.(자유도는 높음) 따라서 소규모 프로젝트나 작업 자동화를 하기 위해 활용된다.

### 프로그래밍 언어 - 컴파일 언어

스크립트 언어와 반대로 복잡한 로직을 갖는 시스템을 위해 만들어진 언어로, 기본 기능이 다양하고 복잡성을 해결하기 위해 엄격한 규칙을 가지고 있다. 보통 대규모 프로젝트를 하는데 사용된다.

### JavaScript의 문제

- 코드의 직관성
- 고질적인 동적 타입 문제
- 예측할 수 없는 null, undefined 문제

```javascript
function foo(obj) {
  console.log(obj.key?.name); // optional chaining으로 없으면 undefined
}

foo({
  id: 1,
  name: "Pickford",
});
```

## 03. 타입 시스템의 적용

### 왜 타입 시스템이 필요한가?

#### 일상적인 프로그램 개발 과정

> 코드 추가/수정 -> [ 컴파일 ] -> 커밋 -> 코드 리뷰 -> 빌드 -> 배포

이 과정 속에서 후방 단계일수록 버그를 발견했을 때 처리 비용이 기하 급수적으로 늘어난다. 즉, 미리 에러를 발견할수록 처리 비용이 감소하기 때문에 코드 추가/수정 단계에서부터 코드 리뷰까지 조금 더 엄격하게 작업을 하면 잠재적인 버그를 현저히 줄일 수 있다.

#### 정적 타입 시스템의 장점

- **버그 발견 시점을 앞당길 수 있음**

  더 적은 비용으로 잠재적인 버그를 줄일 수 있고, 안정적이다.

- **상대적으로 간결한 문서화**

  > JSDoc를 활용하여 문서화하는 것보다 TypeScript를 사용하는 것이 더 간결한 코드를 작성할 수 있게 된다.
  > 주석을 포함하여 배포하면, 더 코드 용량이 커지기 때문에 성능을 위해 주석을 삭제하여 배포한다.

  ```typescript
  function addOne(value: number): number {
    return value + 1;
  }
  ```

- **용이한 코드 수정 및 리팩터링**

  기존 함수를 수정하여 새로운 함수로 교체할 수 있지만, 함수 내용이 길고 함수가 많다면 시간 비용적인 측면에서 문제가 생긴다. 따라서 정적 타입 시스템을 채용한다면 더 빠르게 코드를 수정하고 리팩터링할 수 있게 된다.

  ```javascript
  // Americano가 아니라 Latte만 만들기로 한다면?
  function makeLatte() {
    return new Promise((resolve, reject) => {
      const espresso = "에스프레소";
      const milk = "우유";
      const americano = espresso + "+ " + milk;
      setTimeout(() => resolve(americano), 4000);
    });
  }

  function order() {
    return makeLatte();
  }

  async function main() {
    const coffee = await order();
    console.log(`이 커피는 ${coffee}로 구성되어 있습니다`);
  }

  main();
  ```

  ```typescript
  function makeLatte(): Promise<string> {
    return new Promise((resolve, reject) => {
      const espresso = "에스프레소";
      const milk = "우유";
      const latte = espresso + "&" + milk;
      setTimeout(() => resolve(latte), 4000);
    });
  }

  function order(): Promise<string> {
    return makeLatte();
  }

  async function main() {
    const coffee = await order();
    console.log(`이 커피는 ${coffee}로 구성되어 있습니다`);
  }

  main();
  ```

### Microsoft의 TypeScript

- JavaScript의 Superset으로, 'JavaScript로 작성된 코드는 TypeScript 코드 이기도 하다.'
- JavaScript에 정적 타입 시스템을 도입한 모델로, TypeScript로 작성된 코드를 단일 컴파일러를 사용해서 최적화된 JavaScript 코드를 만드는 방식.
- 대규모 커뮤니티와 많은 사용자를 보유하고 있다.
- 다수의 TypeScript 기반 프로젝트를 통해 잘 갖추어진 생태계가 존재한다.(Tools, Formatter 등)
- 다양한 프레임워크와 런타임을 지원한다.
- 사용자가 많은 IDE에서 적극적으로 지원한다.(코드 자동 완성, 에러 체크 등 기능 제공)

## 04. TypeScript 기본 환경

- tsc: TypeScript 전용 컴파일러로, 이를 튜닝하기 위해 설정 파일 `tsconfig.json`을 수정한다.
- SWC, ESBuild, vite 등 더 성능이 좋은 컴파일러를 활용하기도 한다.

> package.json 다시듣기

```json
{
  "name": "typescript_sample_project",
  "version": "0.1.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "start": "ts-node index.ts",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {
    "@tsconfig/node16": "^1.0.2",
    "@types/node": "^17.0.31", // 에러를 즉시 확인하기 위해 사용
    "ts-node": "^10.7.0",
    "typescript": "^4.6.4"
  }
}
```

npm install 명령어를 통해 npm을 설치하면 `node_modules` 디렉토리가 생성된다.
`node_modules` 디렉토리에는 서드파티 라이브러리가 있다. 보통 Git에 올리는 것에서 제외한다.

> tsconfig.json

기본 컴파일 옵션 확인 가능

```json
{
  "include": [".", "src/**/*"], // 컴파일 대상을 포함하는 경로
  "exclude": ["node_modules", "**/*.spec.ts"], // 컴파일 제외 대상의 경로(불필요한 파일은 컴파일 안함)
  "compilerOptions": {
    "rootDir": ".", // 루트 디렉토리가 현재 디렉토리
    "outDir": "dist" // 결과를 받는 디렉토리 설정
  },
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node 16",

  "compilerOptions": {
    "lib": ["es2021"], // 기본 JavaScript
    "module": "commonjs", // 컴파일된 파일이 node 전용
    "target": "es2021", // 호환성

    "strict": true, // 엄격한 체크
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true // 파일 이름 검증
  }
}
```

```typescript
import fs from "fs/promises";
// node `.mgs`여야만 import문 사용할 수 있다.(16버전 이후 변화 중)

function sayHelloTo(target: string) {
  console.log(`Hello, ${target}`);
}

function addTwoValues(first: number, second: number): number {
  return first + second;
}

async function main() {
  sayHelloTo("World");
  addTwoValues(100, 1000);
  const samples = await fs.readFile("./sample.json", "utf8"); // readFile을 읽어올 때 utf-8 방식으로 가져오기 때문에 string
  console.log(samples);
}

main();
```

## 05. TypeScript 특성

### Types

#### any & unknown type

- `any`

  어떤 Type도 상관 없기 때문에 모든 Type으로 덮어쓸 수 있다. 다만, 지양하는 것이 좋다.

- `unknown`

  Type을 모를 때 사용한다. 이 또한 모든 Type의 데이터를 할당받을 수 있지만, 객체 할당 시 key를 불러오는 경우 문제가 발생한다. 이를 해결하기 위해 강제 Type 설정을 해야 한다.(대괄호로 앞에 설정하는 방식: <{ key: string }>)

  보통 `try` - `catch` 구문의 `error`가 unknown type으로 설정된다.

#### 원시 타입

- `number`
- `string`
- `boolean`

> 다만 변수 선언과 동시에 할당할 때는 굳이 작성하지 않아도 된다. 다만 선언만 할 때는 Type을 설정해주어야 한다.

- `Array<number>`, `number[]`

  두 가지 방식으로 배열 Type을 설정할 수 있다. 내부의 원소도 해당 Type에 맞는 것을 작성해야 한다. 중첩 배열도 설정할 수 있다. (number[][][])

  배열 작성 시 다른 Type의 원소를 가지도록 작성하는 것은 좋지 않다.

  ```typescript
  const arr1: Array<number> = [1, 2, 3];
  const arr2: number[] = [1, 2, 3];
  ```

- function

  매개 변수의 Type과 return의 Type을 설정해야 한다.

  ```typescript
  const addOne: (value: number) => number = (value: number) => value + 1;
  ```

- Tuples

  ```typescript
  const tuple: [number, number, number] = [1, 2, 3];
  ```

#### Optional Values

`?`를 통해 작성하고, 값이 없을 경우 나오는 값을 뒤에 설정할 수 있다.

```typescript
function sayHello(target?: string) {      // 이게 optional value
  const t = target ?? "World";    // nullish coalescing ||으로 사용하는 것과 동일
  console.log(`Hello, ${t}`);
}
sayHello("Mike");
sayHello();

> Hello, Mike
> Hello, World
```

#### Interface

객체의 형식으로 작성된 객체의 타입을 정의하기 위해 사용하는 것으로, property가 있을수도 있고 없을수도 있을 때 활용한다.

즉, 객체가 어떤 모양이었으면 좋은 지를 설정하는 것이라고 볼 수 있다.

프로퍼티: 타입 으로 설정한다.

```typescript
interface IDBConfig {
  // DB 연결 인터페이스
  host: string;
  port: number;
  user: string;
  password: string;
  schema?: string;
}

interface Machine {
  type: string;
  name: string;
  run: () => void;
  getType: () => string;
}

function foo(o: Machine) {
  // ...
}
```

#### Class

클래스 내부의 변수, 함수 모두 Type을 설정할 수 있고, `private`을 통해 외부 접근을 배제할 수 있다.

```typescript
class Animal {
  id: number;
  name: string;
  private secret: string; // 클래스 내부에서만 활용하게끔 외부 접근 배제

  constructor(name: string) {
    this.id = Date.now();
    this.name = name;
    this.secret = "this is secret";
  }

  public getName() {
    // public은 생략 가능
    this.logSecret();
    return this.name;
  }

  private logSecret() {
    console.log(`${this.secret}`);
  }
}
```

#### union

`|`로 구분된 Type들이 모두 가능하다.

한 변수에 여러 타입을 받고 싶을 때 사용한다. 이에 맞게 분기 처리가 필요할 수 있다.

#### intersection

`&`로 구분된 Type 모두를 가지고 있는 경우에 사용한다. 사실상 합집합

```typescript
interface ExtraConfig {
  encrypt: boolean;
  dbName: string;
}

function printDBConfig(config: IDBConfig & ExtraConfig) {
  console.log(config);
}
```

#### type alias

자신만의 타입을 설정하는 것. 인터페이스는 확장성이 있지만, 타입으로 설정된 타입들은 확장성이 없다. 즉, 같은 이름으로 다른 인터페이스를 만들면 자동으로 합쳐지는 반면에 타입으로 설정한 것은 새로 선언하는 것이 불가능하다.

implements도 안된다.

일반적으로 인터페이스를 권장한다.

```typescript
type ID = string | number;

type Input = string;

type Point = {
  x: number;
  y: number;
};
```

#### literal

값을 타입으로 사용하는 것.

함수 return 값을 그 중 하나의 값으로 해야하는 경우에 사용한다.

```ts
function hello(name: "james" | "smith") {}
```

#### enum

일련의 객체의 이름들을 순서대로 정리하기 위해 사용한다.

고정된 값을 관리하기 위해 사용한다. 단순한 값이다. 객체처럼 프로퍼티가 아니라 따라서 객체화가 안된다.

enum은 const를 모아두는 객체

#### utility

동적으로 데이터를 삽입하고 변경할 때 사용한다.
타입스크립트는 기본적으로 동적으로 수정 삽입이 불가능하기 때문에 이를 사용하기 위해 만든다.

```typescript
const a: Record<string, any> = {};

a.key = "name";
```

```
tsc <filename> 명령으로 .ts 파일을 컴파일 함과 동시에 타입 분석을 실행

tsc <filename> 명령으로 작성한 .ts 파일들을 컴파일

tsconfig.json 파일에서 다양한 컴파일 설정을 바꿔줄 수 있다: 컴파일 결과물 경로 변경,
컴파일 대상 경로, 컴파일 제외 경로 등
```

#### Generic

- 함수, 인터페이스, 클래스에 재사용성을 더해준 기능
- 함수, 인터페이스, 클래스를 정의한 사람이 아닌 사용하는 사람이 필요한 타입을 제공하는 방식
- 특정 구조를 가진 함수, 인터페이스, 클래스를 다양한 타입을 적용시킴으로 사용성을 극대화
