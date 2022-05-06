# 0506

## 01. Interface

Interface는 변수, 함수, 클래스의 Type을 설정하기 위해 사용된다. 직접 인스턴스를 생성할 수 없으며, 모든 메서드가 추상 메서드지만, `abstract` 키워드는 사용하지 않는다. ES6에서는 Interface를 지원하지 않는다.

Interface는 객체의 속성과 그 Type, 함수의 Parameters와 반환 Type, 배열과 객체에 접근하는 방식, 클래스 등에 대해 정의할 수 있다.

```ts
interface Person {
  name: string;
}

function sayName(obj: Person) {
  console.log(obj.name);
}

let person1 = { name: "John" };

sayName(person);
```

### Properties

TypeScript의 컴파일러는 필수 property 유무와 Type을 확인한다. 이때 `?`와 `readonly` 예약어를 활용해 더 세밀하게 제어할 수 있다.

#### Optional Properties

Interface에 속하지 않는 property의 사용을 방지하면서 사용 가능한 property를 기술할 때 사용한다. 객체 내부의 몇 개의 property만 채워 함수에 전달하는 option bags같은 패턴에 유용하게 사용된다.

```ts
interface SquareConfig {
  color?: string;
  width?: string;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" }); // width 값이 없어도 동작한다.
```

#### Readonly Properties

객체가 처음 생성될 때만 값을 설정할 수 있고, 이후 수정이나 재할당이 불가능하다. `const`와 동일한 기능을 한다.

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

let point: Point = { x: 10, y: 10 };
point.x = 60; // Cannot assign to 'x' because it is a readonly property.
```

### Interface type

TypeScript의 Interface는 함수 혹은 클래스에서 사용할 수 있다.

#### Function Type

함수의 인자와 반환 값의 Type을 정의한다. 함수의 Type을 정의할 때에도 사용한다. 미리 interface로 Type을 정의하면, contextual Typing에 의해 인수의 Type을 추론할 수 있으므로 생략해도 된다.

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch1: SearchFunc;
mySearch1 = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
};

let mySearch2: SearchFunc;
mySearch2 = function (src, sub) {
  let result = src.search(sub);
  return "string";
};
// Error: Type is not assignable to type SearchFunc.
```

#### Class Type

클래스가 특정 계약을 충족하도록 명시적으로 강제한다.

```ts
interface Animal {
  makeSound(): void;
}

class Dog implements Animal {
  makeSound(): void {
    console.log("멍멍");
  }
}
```

클래스와 마찬가지로 Interface도 확장이 가능하다. 이는 한 interface의 member를 다른 interface에 복사하는 것을 가능하게 해주는데, interface를 재사용성 높은 컴포넌트로 쪼갤 때, 유연함을 제공한다.

```ts
interface Animal {
  makeSound(): void;
}

interface Dog extends Animal {
  speed: number;
}

class Bulldog implements Dog {
  makeSound(): void {
    console.log("멍멍멍");
  }
}
```

#### Hybrid Type

유연하고 동적인 특성을 갖는 JavaScript와 유사하게 Interface도 여러 가지 Type을 조합할 수 있다.

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### Design Strategy Pattern

객체가 할 수 있는 행위들을 Strategy로 만들어 두고, 동적으로 행위의 수정이 필요한 경우, 이를 바꾸는 것으로 수정이 가능하도록 만든 패턴을 말한다.

메서드 수정 방식은 OOP 설계 원칙 중 하나인 OCP()를 위배하게 되고, 시스템이 커져 확장될 경우 연동되는 시스템에도 영향을 줄 수 있다는 문제가 있다. 이를 디자인 패턴을 활용하면 문제를 해결할 수 있다.

```ts
interface PaymentStrategy {
  pay(): void;
}

class CardPayment implements PaymentStrategy {
  pay(): void {
    console.log("card");
  }
}

class CashPayment implements PaymentStrategy {
  pay(): void {
    console.log("cash");
  }
}

class VendingMachine {
  private paymentStrategy: PaymentStrategy;

  setPaymentStrategy(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  pay() {
    this.paymentStrategy.pay();
  }
}

const vendingMachine = new VendingMachine();

vendingMachine.setPaymentStrategy(new CardPayment());
vendingMachine.pay(); // card

vendingMachine.setPaymentStrategy(new CashPayment());
vendingMachine.pay(); // cash
```
