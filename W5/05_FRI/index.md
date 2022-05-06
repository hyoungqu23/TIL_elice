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

## 02. Generic

데이터 Type을 일반화한다는 의미를 가진 제네릭(Generic)은 어떤 함수나 클래스가 사용할 Type을 생성 단계가 아닌 사용 단계에서 정의하는 프로그래밍 기법으로, 선언 시점이 아닌 생성 시점에 Type을 명시해 하나의 Type으로만 사용하지 않고 다양한 Type을 사용할 수 있다. 즉, 일반적인 Static Typing 방식은 함수나 클래스를 정의할 때 Type을 선언하지만, 제네릭(Generic)은 외부에서 Type을 작성해 코드가 수행될 때에 Type이 명시되도록 하는 것이다.

```ts
function echo<T>(text: T): T {
  return text;
}

console.log(echo<string>("hi"));
console.log(echo<number>(10));
console.log(echo<boolean>(true));
```

### 제네릭(Generic)을 활용하는 이유

- 제네릭(Generic)을 사용하면 재사용성이 높은 함수나 클래스를 생성할 수 있다. 제네릭(Generic)을 사용하면 하나만 선언해도 여러 Type에서 동작이 가능해진다.
- 제네릭(Generic)을 사용하면 중복되는 코드가 줄어들고 반환되는 Type을 명시하기 때문에 코드의 가독성이 향상된다.
- 제네릭(Generic)이 없다면 아래와 같이 `any` Type을 이용해야 하는데, 컴파일 시 Type을 체크하지 않기 때문에 입력된 Type에 대한 메서드의 힌트를 사용할 수 없고, 컴파일 시 발견되는 에러를 발견할 수 없게 된다.
  따라서 TypeScript에서는 `any` Type의 사용을 지양하고 있다.

```ts
function echo2(text: any): any {
  return text;
}
```

### 제네릭(Generic)을 이용한 함수 생성

```ts
function sort<T>(items: T[]): T[] {
  return items.sort();
}

const nums: number[] = [1, 2, 3, 4];
const chras: string[] = ["a", "b", "c", "d", "e", "f"];

sort<number>(nums);
sort<string>(chras); // Error
```

### 제네릭(Generic)을 이용한 클래스 생성

```ts
class Queue<T> {
  protected data: Array<T> = [];

  push(item: T) {
    this.data.push(item);
  }

  pop(): T | undefined {
    return this.data.shift();
  }
}

const numberQueue = new Queue<number>();

numberQueue.push(1);
numberQueue.push("1"); // Error
numberQueue.push(+"1");
```

### Union Type

`|`를 활용해 두 개 이상의 Type을 선언하는 방식으로, 제네릭(Generic)과 같이 여러 Type을 다룰 수 있지만, 선언한 Type들의 공통된 메서드만 사용할 수 있고, 반환 값이 하나의 Type이 아닌 선언한 Union Type으로 지정된다는 차이가 있다.

```ts
// Union Type
const printMessage = (message: string | number) => {
  return message;
};

const msg1 = printMessage(12345);
const msg2 = printMessage("Hello, World!");

msg1.length; // Error: length does not exist on type string | number.

// 제네릭(Generic)
const printMessage2 = <T>(message: T) => {
  return message;
};

const msg3 = printMessage2<String>("Hello, World!");
msg3.length; // 가능
```

### 제약 조건

제네릭(Generic)에서 원하지 않는 속성에 접근하는 것을 막기 위해 Constraints와 `keyof` 두 가지 제약 조건을 사용할 수 있다.

#### Constraints

특정 Type으로만 동작하는 제네릭(Generic) 함수를 만들 때 사용한다. `T`에 `extends` 키워드를 이용해 제약조건(Constraints)을 설정하고, 제약 조건을 벗어나는 Type을 선언하면 에러가 발생한다.

```ts
const printMessage = <T extends string | number>(message: T): T => {
  return message;
};

printMessage<String>("Hello, World!");
printMessage<Number>(1);
printMessage<Boolean>(false); // Error: Type 'Boolean' does not satisfy the constraint 'String | Number'.
```

#### `keyof`

두 객체를 비교할 때 사용하는 `keyof`를 통해 제네릭(Generic) `T`의 존재하는 key 값을 가지는 제네릭(Generic) `U`를 통해 객체의 키에 제약 조건을 걸 수 있다.

```ts
const getProperty = <T extends object, U extends keyof T>(obj: T, key: U) => {
  return obj[key];
};

getProperty({ a: 1, b: 2 }, "a");
getProperty({ a: 1, b: 2 }, "z"); // Error: Argument of type "z" is not assignable to parameter of type "a" | "b".
```

### Design Factory Pattern

디자인 팩토리 패턴(Factory Pattern)이란 객체를 생성하는 interface만 미리 정의하고, 인스턴스를 만드는 것을 서브 클래스가 하는 패턴으로 여러 개의 서브 클래스를 가진 슈퍼 클래스가 있을 때, 입력에 따라 하나의 서브 클래스의 인스턴스를 반환한다.

```ts
interface Car {
  drive(): void;
  park(): void;
}

class Bus implements Car {
  drive(): void {}
  park(): void {}
}

class Taxi implements Car {
  drive(): void {}
  park(): void {}
}

class CarFactory {
  static getInstance(type: String): Car {
    switch(type) {
      case: 'bus':
        return new Bus();
      default:
        return new Taxi();
    }
  }
}

const bus = CarFactory.getInstance('bus');
const taxi = CarFactory.getInstance('taxi');
```

기존의 단순 interface 방식을 활용하면, 새로운 carType 케이스가 추가될 때마다 case문을 추가해야 한다는 문제가 있다. 디자인 팩토리 패턴(Factory Pattern)을 활용해 이러한 문제를 해결할 수 있다.

```ts
interface Car {
  drive(): void;
  park(): void;
}

class Bus implements Car {
  drive(): void {}
  park(): void {}
}

class Taxi implements Car {
  drive(): void {}
  park(): void {}
}

class Suv implements Car {
  drive(): void {}
  park(): void {}
}

export class CarFactory {
  static getInstance<T extends Car>(type: { new (): T }): T {
    return new type();
  }
}

const bus = CarFactory.getInstance(Bus);
const taxi = CarFactory.getInstance(Taxi);
```
