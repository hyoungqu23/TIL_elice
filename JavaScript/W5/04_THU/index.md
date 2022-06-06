# 0505

## 01. TypeScript 기본

### TypeScript를 사용하는 이유

말 그대로 깔끔하게 작성된 코드를 클린 코드라고 한다. 즉, 직접적이고 단순해 가독성이 좋고, 누가 보더라도 의도가 명확히 드러나는 코드를 의미한다. 이러한 코드는 의존성을 줄여 유지보수가 쉬워진다.

따라서 우리는 최대한 깨끗한 코드를 작성하고자 노력해야 한다.

### Type 설정이 필요한 이유

JavaScript는 Dynamic Typing을 지원하는 언어이기 때문에, 우리는 변수가 선언되는 과정에서 Type이 설정되는 것을 확인할 수 있다.

```javascript
let text = 'Dynamic Typing';
console.log(text.toUpperCase());

> DYNAMIC TYPING
```

이때 `text` 변수에 숫자를 할당하면, `TypeError: text.toUpperCase is not a function.` 에러가 발생하는 것을 볼 수 있다. 즉, JavaScript는 Type을 설정하지 않으므로, 실행한 후에 TypeError를 인지할 수 있는 것이다.

이와 다르게 TypeScript에서는 Type을 미리 설정하기 때문에 미리 에러를 확인할 수 있다.

```typescript
let text: string = 2022;
console.log(text.toUpperCase());

> Type 'number' is not assignable to type 'string'.
```

결국, 우리가 TypeScript를 활용한다면 JavaScript 실행 단계에서 발생하는 Type 에러를 컴파일 단계에서 미리 확인하고 수정할 수 있게 된다.우리가 Type을 미리 정의함으로써 실수를 줄이고 코드를 쉽게 이해할 수 있으며, 유지보수에 용이하다는 점이 TypeScript를 사용해야 하는 이유이다. 물론, 유지보수에 용이하고 코드를 쉽게 이해할 수 있다는 점은 개발 속도를 향상시키는 데 큰 도움을 주는 점도 간과할 수는 없다.

## 02. TypeScript 개요

Microsoft에서 개발한 언어로 JavaScript의 Superset이라고도 불린다. tsc, SWC, ESBuild, vite 등의 컴파일러를 통해 JavaScript로 컴파일할 수 있다. Static Typing을 통해 Type 제어가 가능하며, 컴파일 시점에 에러를 확인할 수 있다.

## 03. TypeScript의 Type

Type Annotation을 통해 JavaScript 코드의 변수나 함수 등의 Type을 정의할 수 있다.

### Primitive Types

`string`, `number`, `boolean`, `null`, `undefined`, `symbol`은 실제 값을 저장하는 **원시 자료형, Primitive Type**이다.

```typescript
let str: string = "Hello, World!";

let isTrue: boolean = true;

let count: number = 0; // 2진수, 8진수, 10진수, 16진수 모두 사용 가능

let n: null = null; // 값이 의도적으로 비어있는 상태를 저장하는 타입

let und: undefined = undefined; // 아무 값이 할당되지 않은 상태를 저장하는 타입
```

참고로, `null`과 `undefined`는 데이터 타입이 서로 다르다.

```javascript
typeof null;
typeof undefined;

> object
> undefined
```

### Reference Types

`object`, `array`, `function`은 **참조 자료형, Reference Type**으로, 메모리에 값을 주소로 저장하고, 출력 시 메모리 주소와 일치하는 값을 출력하는 데이터이다.

```typescript
function func(o: object): void {}

func({ props: 0 });
func([1, 2, 3, 4]);
func("string"); // TypeError
func(true); // TypeError
func(2022); // TypeError

let arr1: number[] = [1, 2, 3, 4];
let arr2: Array<number> = [1, 2, 3, 4];

let arr3: string[] = ["1", "Hello", "World!"];
let arr4: Array<string> = ["2", "Hello", "World!"];
```

즉, `object` Type을 지정하면, 원시 자료형을 제외한 Type을 사용할 수 있다. 또한, 배열은 Generic을 사용해 표기할 수도 있다.

### Additional Types

TypeScript에서 추가적으로 개발자의 편의를 위해 제공하는 Type으로, `tuple`, `enum`, `any`, `void`, `never`가 있다.

```typescript
// tuple Type
let arr: [string, number] = ["Hello", 2022];
```

`tuple` Type은 길이와 각 요소의 Type이 각각 정해진 배열을 저장한다. `tuple`의 경우 정의하지 않은 index를 호출하는 경우 에러가 발생하는 점에 유의해야 한다.

```typescript
// enum Type
enum WEEKDAY {
  MON,
  TUE,
  WED,
  THU,
  FRI,
}

let secondDay: string = WEEKDAY[1];
let thirdDay: string = WEEKDAY.WED;

enum WEEKEND {
  SAT = 6,
  SUN = 7,
}

let lastDay = WEEKEND[7];
```

`enum` Type은 특정 상수 값들의 집합을 저장하는 Type으로, index로 해당 값에 접근할 수 있고, 이러한 index는 사용자의 편의에 맞게 변경할 수 있다.

`enum` Type을 활용하면 코드의 간결성과 가독성을 향상시킬 수 있고, 인스턴스 생성과 상속을 방지해 상수 값의 Type 안정성을 확보할 수 있다.

```typescript
// any Type
let str: any = "Hello";
let num: any = 2022;

// void Type
function func2(): void {
  console.log("Hello");
}
```

`any` Type은 모든 Type을 저장할 수 있어 컴파일 중 Type 검사를 하지 않는다. 이와 반대로 `void` Type은 보통 함수의 반환 값이 존재하지 않을 때 사용하며, 일반적으로 `undefined`와 `null`은 변수에 사용한다.

```typescript
// never Type
function neverEnd(): never {
  while (true) {}
}

function error(message: string): never {
  throw new Error(message);
}
```

`never` Type은 절대 발생할 수 없는 Type을 말하며, 항상 에러를 발생시키거나, 절대 반환하지 않는 반환 값을 지정할 때 활용한다. 즉, 종료되지 않는 함수, 항상 에러를 발생시키는 함수의 반환 값이 `never` Type이다.

## 04. TypeScript Type Alias

```typescript
type Human = {
  name: string;
  age: number;
  isAdult: boolean;
};

let person1: Human = { name: "John", age: 22, isAdult: true };
let person2: Human = { name: "John", age: 8, isAdult: false };
```

즉, 매번 Type을 정의해주면 중복된 코드가 많아지고 깨끗하고 간결한 코드를 작성할 수 없기 때문에, Type 자체에 이름을 붙여 변수를 만들 수 있다. 이렇게 이미 정의된 Type이나, Interface의 Type을 수정하고 변환하여 이용하기 위해서 TypeScript는 **Utility Types**을 활용한다.

## 05. TypeScript의 Utility Types

TypeScript는 공통 Type 변환을 용이하게 하기 위해 Utility Types을 제공한다.

### `Partial<T>`

Property를 선택적으로 만드는 Type을 구성한다. 즉, 주어진 Type의 모든 하위 Type 집합을 나타내는 Type을 반환한다.

```typescript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, updatedTodo: Partial<Todo>) {
  return { ...todo, updatedTodo };
}

const todo1 = {
  title: "Study TypeScript",
  description: "TypeScript Lecture 01",
};

const todo2 = updateTodo(todo1, {
  description: "TypeScript Lecture 04", // title 없이 description만 호출해서 사용할 수 있음.
});
```

### `Readonly<T>`

Property를 읽기 전용으로 설정한 Type을 구성한다. 즉, 해당 Property의 재할당을 방지한다.

```typescript
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Sleep at 03:00",
};

todo.title = "Sleep at 12:00"; // Readonly Type으로 재할당이 불가능하다.
```

### `Record<T>`

Property의 집합으로 Type을 구성하여, 다른 Type에 매핑시키는 데 활용할 수 있다.

```typescript
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const newPage: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { subtitle: "home" }, // Error: { subtitle: "home" } is not assignable.
  main: { subtitle: "main" }, // Error: main is not assignable to type Page.
};
```

### `Pick<T, K>`

Property `K` 집합을 선택해 Type을 구성한다. 즉, 선택한 property만 활용하고, 선택하지 않은 Type의 경우 사용할 수 없게 한다.

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Posting Dev-blog about Core JavaScript",
  completed: false,
  description: "Core JavaScript #01 let, const, var", // Error: 'description' is not assignable to type.
};
```

### `Omit<T, K>`

`Pick`과 달리, 모든 property를 선택한 후 K의 property를 제외한 Type을 구성한다.

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Posting Dev-blog about Core JavaScript",
  completed: false,
  description: "Core JavaScript #01 let, const, var", // Error: 'description' is not assignable to type.
};
```

### `Exclude<T, U>`

T 집합에서 U에 할당할 수 있는 모든 속성을 제외한 Type을 구성한다.

```typescript
type T1 = Exclude<"a" | "b" | "c" | "d", "a">; // "b" | "c" | "d"
type T2 = Exclude<"a" | "b" | "c" | "d", "a" | "b">; // "c" | "d"
type T3 = Exclude<string | number | (() => void), Function>; // string | number
```

### `Extract<T, U>`

T 집합에서 U에 할당할 수 있는 모든 속성을 추출한 Type을 구성한다.

```typescript
type T1 = Extract<"a" | "b" | "c" | "d", "a" | "z">; // "a"
type T2 = Extract<"a" | "b" | "c" | "d", "a" | "b">; // "a" | "b"
type T3 = Extract<string | number | (() => void), Function>; // () => void
```

### `NonNullable<T>`

`null`, `undefined`를 제외한 Type을 구성한다.

```typescript
type T1 = NonNullable<string | number | (() => void) | undefined>; // string | number | (() => void)
type T2 = NonNullable<string[] | null | undefined>; // string[]
```

### `Parameters<T>`

함수 Type의 매개변수 Type들의 Tuple을 구성한다.

```typescript
declare function func1(arg: { a: number; b: string }): void;

type T1 = Parameters<() => string>; // []
type T2 = Parameters<(s: string) => void>; // [string]

type T3 = Parameters<(<T>(arg: T)) => T>; // [unknown]  (generic)

type T4 = Parameters<typeof func1>; // [{ a: number; b: string }]

type T5 = Parameters<any>; // unknown[]
type T6 = Parameters<never>; // never
type T7 = Parameters<string>; // Error
type T8 = Parameters<Function>; // Error
```

### `ConstructorParameters<T>`

생성자 함수 Type의 모든 매개변수를 추출하고, 해당 모든 매개변수를 가지는 Tuple(`T`가 함수가 아닌 경우 `never`)을 생성한다.

```typescript
type T1 = ConstructorParameters<ErrorConstructor>; // [(string | undefined)?]
type T2 = ConstructorParameters<FunctionConstructor>; // string[]
type T3 = ConstructorParameters<RegExpConstructor>; // [string, (string | undefined)?]
```

### `ReturnType<T>`

함수 T의 반환 값으로 구성된 Type을 생성한다.

```typescript
declare function func1(): { a: number; b: string };

type T1 = ReturnType<() => string>; // string
type T2 = ReturnType<(s: string) => void>; // void

type T3 = ReturnType<(<T>()) => T>; // {}  (generic)
type T4 = ReturnType<(<T extends U, U extends number[]>() => T)>; // number[]

type T5 = ReturnType<typeof func1>; // { a: number; b: string }

type T6 = ReturnType<any>; // any
type T7 = ReturnType<never>; // any
type T8 = ReturnType<string>; // Error
type T9 = ReturnType<Function>; // Error
```

### `Required<T>`

T의 모든 property가 필수로 설정된 Type을 구성한다.

```typescript
interface Props {
  a?: string;
  b?: number;
}

const obj: Props = { a: "Hello" };
const obj2: Required<Props> = { a: "Hello" }; // Error: Property 'b' is missing in type.
```

## 06. TypeScript 함수

```typescript
function add(x, y) {
  // x, y: 매개변수
  return x + y;
}

add(10, 20); // 10, 20: 인자
```

JavaScript, TypeScript의 함수는 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 **일급 객체**이다. 따라서 다른 함수에 매개변수로 제공할 수 있고, 함수에서 반환 값으로 사용할 수 있으며, 변수에 할당할 수 있다.

TypeScript에서 함수를 작성할 때, 반환 Type을 추론하도록 하는 것을 권장하고, 함수의 매개 변수와 인수의 Type이 호환 가능하게끔 작성해야 한다.

TypeScript 컴파일러는 Contextual Typing을 통해 Type 추론이 가능하기 때문에, 함수 사용 시 모든 Type을 일일이 명시하지 않아도 되는 경우가 존재한다.

```typescript
let func: (a: number, b: number) => number = function (a, b) {
  return a + b;
};
```

### 선택적 매개 변수(Optional Parameter)

함수의 주어진 인자의 수는 함수가 기대하는 매개 변수의 수와 일치해야 한다. 다만, **선택적 매개 변수(Optional Parameter)** 키워드 `?`를 사용해 선택적 매개변수를 활용할 수 있다.(JavaScript에서는 모든 매개 변수가 선택적이므로, 주어진 인자가 없다면 `undefined` 값을 갖는다.)

```typescript
function func1(a: number, b?: number) {
  return a + b;
}

let result1 = func1(1); // 1
let result2 = func1(1, 2); // 3
let result3 = func1(1, 2, 3); // Error: Expected 2 arguments, but got 3.
```

### 기본-초기화 매개 변수(Default Parameter)

TypeScript에서는 값을 제공하지 않거나 `undefined`로 설정했을 때 매개 변수의 기본 값을 **기본-초기화 매개 변수(Default Parameter)**를 활용해 설정할 수 있다.

```typescript
function func1(a: number, b = 10) {
  return a + b;
}

let result1 = func1(1); // 11
let result2 = func1(1, undefined); // 11
let result3 = func1(1, 2); // 3
let result4 = func1(1, 2, 3); // Error: Expected 1-2 arguments, but got 3.
```

### 나머지 매개 변수(Rest Parameters)

TypeScript의 컴파일러는 `...` 이후 인자 배열을 빌드해 함수에서 사용할 수 있다. 이처럼 사용되는 **나머지 매개 변수(Rest Parameters)**는 매개 변수의 수를 0부터 무한히 취급한다.

```typescript
function func1(a: number, ...b: number[]): number {
  return b.reduce((acc, curr) => {
    return acc + curr;
  }, a);
}

let result1 = func1(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55
```

## 07. OOP(Object-oriented programming)

OOP(Object-oriented programming)는 컴퓨터 프로그램을 **객체(Object)**의 모임으로 파악하려는 프로그래밍 패러다임으로, 프로그래밍을 객체 단위로 나눠서 작성하는 것을 지향한다.

OOP를 적용하면 프로그램을 변경하고 싶거나, 오류를 해결할 때 모든 구조를 뜯어 고치지 않고 문제가 되는 객체만 수정하면 되기 때문에 **프로그램이 유연하고 변경이 용이**하며, **개발과 보수가 간편한 이점**이 있습니다. 잘 나누어진 객체는 **직관적인 코드 분석**을 가능하게 한다.

OOP(Object-oriented programming)의 중요한 프로그래밍 특성은 **강한 응집력(Strong Cohesion)**과 **약한 결합력(Weak Coupling)**이다.

- **응집력(Cohesion)**
  프로그램의 한 요소가 여러 기능에 얼마만큼 책임을 지고 있는지 나타내는 것으로, 응집력이 높으면 하나의 요소가 하나의 기능을 관여하기 때문에 요소의 목표가 뚜렷하지만, 응집력이 낮으면 하나의 요소가 여러 기능을 관여하는 것으로 코드를 이해하기 어렵다.

- **결합력(Coupling)**
  프로그램이 기능을 수행하는 데 있어 여러 요소가 얼마만큼 연관이 되어 있는지 나타내는 것으로, 결합력이 낮으면 각 요소를 독립적으로 관리하기 용이하지만 결합력이 높으면 하나의 요소를 수정하기 위해 여러 요소를 모두 확인해야 한다.

```typescript
class Human = {
  name: string;

  // 생성자
  constructor(name: string) {
    this.name = name;
  }

  // 메서드
  move() {
    return `${this.name} move forward!`
  }
}

let person1 = new Human('Pickford');
```

## 08. 접근 제어자

속성 또는 메서드에 접근하는 것을 제한하기 위해 접근 제어자 `public`, `protected`, `private`를 활용한다.

### `public`

프로그램 내에서 선언된 member들이 자유롭게 접근할 수 있다. 기본적으로 `public`으로 선언되지만, 명시적으로 표기하기도 한다.

```typescript
class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

console.log(new Animal("Cat").name); // Cat
```

### `protected`

해당 member가 포함된 클래스와 하위 클래스를 제외한 외부에서의 접근을 차단한다.

```typescript
class Person {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Student extends Person {
  private major: string;
  constructor(name: string, major: string) {
    super(name);
    this.major: major;
  }

  public getMajorScore() {
    return `${this.name}'s ${this.major} score is 4.4/4.5`
  }
}

let student1 = new Student('Pickford', 'Economics');
console.log(student1.getMajorScore()); // Pickford's Economics score is 4.4/4.5`
console.log(student1.name); // Error: Property 'name' is protected and only accessible within class 'Person' and its subclasses.
```

### `private`

해당 member가 포함된 클래스 외부에서의 접근을 차단한다.

```typescript
class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
}

console.log(new Animal("Cat").name); // Error: Property 'name' is private and only accessible within class 'Animal'.
```

## 09. 상속

상속은 상위 클래스의 기능을 재사용하거나 확장하는 기법으로, OOP(Object-oriented programming)는 상속을 통해 존재하는 클래스를 확장해 새로운 클래스를 생성할 수 있다.

```typescript
class Animal {
  move(distanceInMeters: number) {
    console.log(`Animal moved ${distanceInMeters}m`);
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("BOWWOW!");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("meow!");
  }
}

const dog = new Dog();
dog.move(10); // Animal moved 10m
dog.makeSound(); // BOWWOW!

const cat = new Cat();
cat.move(5); // Animal moved 5m
cat.makeSound(); // meow!
```

## 10. Getter & Setter / readonly / static

### Getter & Setter

비공개로 설정하려는 속성은 private으로 설정하고, 속성 값을 읽고 수정하는 getter & setter 함수를 사용한다.

즉, 클래스의 속성에 직접 접근하는 것을 차단하고, getter & setter 함수를 통해 값을 받거나 수정할 수 있게 하는 것이다. 이를 통해 데이터 무결성을 확보하고 캡슐화를 유지할 수 있으며, 각 객체의 member에 접근하는 방법을 세밀하게 제어할 수 있다.

```typescript
class Person {
  private _name: string;

  get name() {
    return this._name;
  }

  set name(name: string) {
    if (name.length > 10) {
      throw new Error("name is too long.");
    }
    this._name = name;
  }
}

let person1 = new Person();

console.log(person1.name); // undefined
person1.name = "Pickford";
console.log(person1.name); // Pickford
person1.name = "abcdefghijklmnop"; // throw Error
```

### readonly

읽기만 가능한 속성을 선언하기 위해 사용한다. 해당 속성은 변경할 수 없게 되어, 선언 혹은 생성자에서 한 번 설정하면 이후 수정이 불가능하다.

```typescript
class Person {
  readonly age: number = 20; // 선언 초기화

  constructor(age: number) {
    this.age = age;
  }
}

let person = new Person(10); // 생성자 초기화
person.age = 30; // Error: Cannot assign to 'age' because it is a readonly property.
```

### static

객체마다 할당되지 않고 클래스의 모든 객체가 공유하는 member를 선언할 때 사용한다. 즉, 각 인스턴스가 아닌 클래스 자체에서 보이는 전역 member, 범용적으로 사용되는 값을 생성한다. static member에는 `className.`을 통해 내외부 어디에서든 접근하고 수정할 수 있다.

```typescript
class Grid {
  static origin = {
    x: 0,
    y: 0,
  };

  distanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;

    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);
```

## 11. 추상 클래스

다른 클래스들이 파생될 수 있는 기초 클래스로, 직접 인스턴스화 할 수 없고, `abstract` 키워드를 사용한다. 추가적으로 추상 메서드는 추상 클래스가 아닌 파생된 클래스에서 구현해야 한다.

```typescript
abstract class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract makeSound(): void;

  move(): void {
    console.log("move! move!");
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name); // 파생된 클래스의 생성자는 반드시 super()를 통해 추상 클래스의 필드를 가져와야 한다.
  }

  makeSound(): void {
    console.log(this.name + "bowwow!"); // 추상 메서드를 재구현
  }
}

const animal = new Animal("animal"); // Error: Cannot create an instance of an abstract class.

const dog = new Dog("진돗개");
dog.makeSound(); // 진돗개 bowwow!
```

### 추상 클래스를 활용한 디자인 패턴(Template Method Pattern)

프로그램의 일부분을 서브 클래스로 캡슐화하여 전체 구조를 바꾸지 않고 특정 단계의 기능을 바꾸는 것을 디자인 패턴이라고 한다. 전체적인 알고리즘은 상위 클래스에서 구현하고, 다른 부분은 하위 클래스에서 재구현한다.

이를 통해 전체 구조는 유사하지만 부분적으로 다른 구문으로 구성된 메서드의 코드 중복을 최소화할 수 있다.
