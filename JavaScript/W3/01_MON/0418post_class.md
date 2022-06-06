### [JavaScript modules - import & export](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
초기 JavaScript의 경우, 큰 Script가 필요하지 않았지만, 최근에는 완전한 애플리케이션을 실행하는 등 보다 큰 Script 파일이 필요하게 되었다. 따라서 JavaScript 프로그램을 별도의 Module로 분할하여 가져와 사용하게 되었다.

우선 Module 기능을 활용하기 위해서는 먼저 함수를 `export` 해야 한다. 함수, 변수, 상수, 클래스를 `export` 할 수 있으나, 최상위 항목이어야 한다. 즉, 함수 내부에서는 사용할 수 없다.
```javascript
export const name = 'square';

export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color
  };
}
```
다음과 같이 Module 파일 하단에 하나의 `export` 문을 통해 여러 항목을 내보낼 수 있다.
```javascript
export { name, draw, reportArea, reportPerimeter };
```
이렇게 내보낸 Module을 Script 파일에서 가져와 사용할 수 있다.
```javascript
import { name, draw, reportArea, reportPerimeter } from './modules/square.js';

let myCanvas = create('myCanvas', document.body, 480, 320);
let reportList = createReportList(myCanvas.id);

let square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);
```
`<script>` 태그에 `type` 속성의 값으로  `module`을 명시해야 한다.
```javascript
<script type="module" src="main.js"></script>
```

`default export`는 한 파일 당 한 번만 사용 가능하며, `import` 할 때 이름을 자유롭게 사용할 수 있다. 이와 달리 `named export`는 한 파일에서 여러 개를 `export`할 때 사용 가능하며, `import` 할 때와 `export` 할 때의 이름이 동일해야 한다.

#### `named exports`
각 항목은 이름으로 참조되며, import 할 때 해당 항목의 이름을 참조하여 사용할 수 있다. 또한 여러 항목을 동시에 `export`할 수 있다는 장점이 있다.
```javascript
export { yuanToWon, yenToWon };

import { dollarToWon } from './exchange/dollar.js'
import { yuanToWon, yenToWon } from './exchange/asia.js'
```

#### `default export`
이와 다르게, `default export`는 하나의 module로 `export`하므로, 중괄호를 작성하지 않고, 이름을 변경하여 `import`할 수 있다.
```javascript
export function dollarToWon(money) {
  var won = money * 1224.5;
  return won;
};

export default euroToWon;

import { default as eToW } from './exchange/euro.js'
```

### 배열 Method [`forEach()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [`map()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [`reduce()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

#### `forEach()`
`forEach()` method는 주어진 콜백 함수를 배열 요소 각각에 대해 실행한다. return이 없기(바로 변수에 할당하고 출력하면 `undefined`가 출력된다.) 때문에 method chain의 중간에 사용할 수는 없다.
```javascript
const items = ['item1', 'item2', 'item3'];
const copy = [];

items.forEach(function(item){
  copy.push(item);
});
```

#### `map()`
`map()` method는 배열 내의 모든 요소 각각에 대해 한 번씩 주어진 콜백 함수를 호출한 결과로 이루어진 새로운 배열을 `return`으로 반환 받는다. 즉, 호출한 기존의 배열의 값을 변형하지 않고 새로운 배열을 생성하여 반환한다.
```javascript
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);

// roots는 [1, 2, 3]
// numbers는 그대로 [1, 4, 9]
```

#### `reduce()`
`reduce()` method는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고 하나의 결과값을 반환한다. 리듀서(reducer) 함수는 총 4개의 인자를 가진다. `accumulate`, `current`, `index`, `src` 네 개의 인자를 통해 리듀서 함수를 실행하고 해당 결과 값이 다시 `accumulate`에 할당되어 순회하므로, 마지막 최종 결과 값은 하나의 값이 된다. 리듀서 함수 이후에 인자 값으로 초기값 설정을 할 수 있다.
```javascript
const factorial = (n) => {
  let arr = new Array(n).fill().map((e, i) => i + 1);

  const ans = arr.reduce((prev, curr) => {
    return prev * curr
  }, 1);

  return ans
}
```

```javascript
// Flatten Array
const GIVEN = [[4, 2, 3], [4, [3, 4, [5, 3]], 5], [4, 3, 5]];
const GIVEN2 = [[5, [3, [5, [6, [5, 4]]]], 3, [6, 246]]];

function flat(arr) {
  if (typeof arr === 'object') {return arr;}

  const ans = arr.reduce((prev, curr) => {
    return prev.concat(flat(curr));
  }, []);

  return ans;
};

flat(GIVEN);
flat(GIVEN2);

// 다만, flat() method를 활용할 수도 있다. GIVEN.flat(Infinity);
```

### 클래스
