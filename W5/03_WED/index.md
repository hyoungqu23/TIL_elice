# 0504

## 01. 동적 타입과 정적 타입

### 동적 타입(Dynamic Typing)

동적 타입(Dynamic Typing)은 컴파일 단계 없이 **인터프리터**와 같은 코드 해석기가 코드를 라인 단위로 읽으며 바로 코드를 실행할 때 코드 내의 변수(데이터) 타입이 정해지는 방식으로, 바로 코드를 실행해야 하기 때문에 인터프리팅 언어들이 동적 타입을 사용한다. 흔히 스크립트 언어들이 동적 타입 방식을 많이 사용한다.

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

위의 예시처럼 실행시킨 이후에서나 에러를 확인할 수 있다는 점이 단점이다.

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
