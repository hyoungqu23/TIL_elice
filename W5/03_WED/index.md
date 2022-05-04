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
