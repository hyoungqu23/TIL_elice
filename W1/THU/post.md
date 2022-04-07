# 움직이는 웹 사이트 제작
## `transform`
[MDN](https://developer.mozilla.org/ko/docs/Web/CSS/transform), [W3S](https://www.w3schools.com/cssref/css3_pr_transform.asp)
선택된 요소에 회전, 확대/축소, 기울이기, 이동 등의 효과를 부여하는 속성.
```css
.transition {
  transform: rotate(45deg);               /* 회전 */
  transform: scale(2, 3);                 /* 확대 축소 */
  transform: skew(10deg, 20deg);          /* 각도 변경 */
  transform: translate(100px; 200px);     /* 위치 변경 */
}
```
CSS3에서만 가능하므로, 브라우저 하위 버전에서는 prefix 접두사를 추가해야 실행할 수 있다.
```css
.transition {
  -webkit-transform: translate(100px, 200px);     /* 크롬, 사파리 */
  -mox-transform: translate(100px, 200px);        /* 파이어폭스 */
  -ms-transform: translate(100px, 200px ;         /* 익스플로러 9.0 */
  -o-transform: translate(100px, 200px);          /* 오페라 */
}
```

## `transition`
[MDN](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), [W3S](https://www.w3schools.com/css/css3_transitions.asp)
`transition`(Shorthand)
  코드를 한 줄로 작성시, 먼저 나오는 숫자가 `duration`이고, 나중에 나오는 숫자가 `delay`
`transition-delay`: 효과의 지연된 시작 설정
`transition-duration`: 효과의 시간 설정
`transition-property`: 효과를 적용하고자 하는 CSS 속성 설정
`transition-timing-function`: 효과의 속도 설정

가상선택자
[MDN](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-classes), [W3S](https://www.w3schools.com/css/css_pseudo_classes.asp)
CSS에서 미리 만들어 둔 클래스로, 특정 조건을 의미한다.

## `animation`
[MDN](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Animations/Using_CSS_animations), [W3S](https://www.w3schools.com/css/css3_animations.asp)
`@keyframes`
`animation`(Shorthand)
  코드를 한 줄로 작성시, 먼저 나오는 숫자가 `duration`이고, 나중에 나오는 숫자가 `delay`
`animation-name`: 애니메이션의 이름
`animation-duration`: 애니메이션 진행 시간을 설정
`animation-delay`: 애니메이션의 지연된 시작을 설정
`animation-iteration-count`: 애니메이션 반복 횟수를 설정
`animation-direction`: 애니메이션 진행 방향을 설정
`animation-timing-function`: 애니메이션의 속도 설정
`animation-fill-mode`: 애니메이션의 시작 전, 끝난 후의 값을 설정

prefix 작성 시 유의 사항
```css
.box1 {
    -webkit-animation: rotation 3s linear 1s 6 alternate;
}

@-webkit-keyframes rotation {
    from {-webkit-transform: rotate(-10deg); }
    to {-webkit-transform: rotate(10deg); }
}
```
같은 prefix를 가진 애니메이션끼리 연동된다.

# 반응형 웹 사이트 제작
## 미디어쿼리
여러 디지털 기기에 대응되는 반응형 또는 적응형 웹 사이트를 만들 때 사용되는 CSS 구문이다.
```css
@media (min-width: 320px) and (max-width: 800px) {
    width: 300px;
    height: 300px;
    background-color: yellow;
}
```
`min-width`(최소 너비)와 `max-width`(최대 너비)로 브라우저 너비를 설정한다.
반드시 `meta` 태그로 `viewport`(다양한 디지털 기기의 화면 상에 표시되는 영역) 설정을 해야 한다.
```html
<meta name-"viewport" content="width=device-width, initial-scale=1.0">
```
미디어쿼리의 경우 외부 영역의 CSS 속성을 상속받기 때문에 상속받는 것을 원하지 않는 경우 속성값으로 `none`을 입력하여 제거해야 한다.
```css
.media {
    width: 500px;
    height: 500px;
    background-color: yellow;
}

@media (min-width: 320px) and (max-width: 800px) {
    .media {
        width: 300px;
        height: 300px;
        background-color: none;
    }
}
```