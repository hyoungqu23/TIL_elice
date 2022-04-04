# 1주차 웹 프로그래밍
## 0404 | 월요일 실시간 집체 강의
[참고 - 이미지 사이트](https://unsplash.com/)
[참고 - 세계 최초의 웹사이트](http://info.cern.ch/)
[참고 - 구글 검색 팁](https://youtu.be/By_qxt0SZlI)
[참고 - Wrapping](https://ssimplay.tistory.com/420)
### HTML 태그(Tags)
[MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element)
```html
WWW is <strong>World <u>Wide</u> WEB</strong>.
```
HTML의 Tag는 정보를 설명한다. 열리는 태그와 닫히는 태그를 가지고 있다. 정보를 설명하는 태그는 반드시 닫아주어야 한다. 닫지 않아도 되는 태그는 설명할 정보가 없는 태그들이다.
- [MDN `<strong>`](https://developer.mozilla.org/ko/docs/Web/HTML/Element/strong)
- [MDN `<u>`](https://developer.mozilla.org/ko/docs/Web/HTML/Element/u)
- [MDN `<h1>` ~ `<h6>`](https://developer.mozilla.org/ko/docs/Web/HTML/Element/Heading_Elements) [W3S `<h1>` ~ `<h6>`](https://www.w3schools.com/tags/tag_hn.asp)
- [W3S `<ol>`](https://www.w3schools.com/tags/tag_ol.asp)
  HTML에는 부모 태그(`<ol>`, `<ul>`)와 자식 태그(`<li>`)가 존재한다.
- [W3S `<ul>`](https://www.w3schools.com/tags/tag_ul.asp)
- [W3S `<li>`](https://www.w3schools.com/tags/tag_li.asp)
- [W3S `<a>`](https://www.w3schools.com/tags/tag_a.asp)
  정보가 부족하다면, `<a>` 태그는 작동하지 않는다. 즉, `<a>`의 필수 속성인 `href`에 경로를 작성해주어야 한다. 다른 웹 페이지를 연결할 수도 있지만, 같은 웹 페이지 내부에서도 이동할 수 있다.(`href="#id"`)
- [W3S `<title>`](https://www.w3schools.com/tags/tag_title.asp)
  웹 페이지의 탭의 제목을 작성한다.
- [MDN `<img />`](https://developer.mozilla.org/ko/docs/Web/HTML/Element/img) [W3S `<img />`](https://www.w3schools.com/tags/tag_img.asp)
- [W3S `<br />`](https://www.w3schools.com/tags/tag_br.asp)
- [W3S `<meta>`](https://www.w3schools.com/tags/tag_meta.asp)
  UTF-8 인코딩 방식으로 작성하면, 이를 알려주어야 한다.

### HTML 속성(Attributes)
```html
<img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="Coding" style="width: 100%;" />
```

### [`<!doctype html>`](https://www.w3schools.com/tags/tag_doctype.asp)
관용적으로 삽입하는 것으로, 문서의 타입이 `HTML`임을 알려준다.

### [`<html>`](https://www.w3schools.com/tags/tag_html.asp)
`<head>`와 `<body>` 태그를 감싸는 태그로, 모든 HTML 요소의 Container가 된다.

### [`<head>`](https://www.w3schools.com/tags/tag_head.asp)
정보를 설명하는 정보로, 메타데이터로 불린다. 정보의 본문과 나누기 위해 `<head>` 태그로 구분한다.
```html
<head>
  <title>WEB - Welcome</title>
  <meta charset="utf-8">
</head>
```

### [`<body>`](https://www.w3schools.com/tags/tag_body.asp)
정보의 내용, 본문을 가지는 태그이다. 정보를 설명하는 정보와 구분하기 위해 `<body>` 태그로 구분한다.
```html
<body>
  
  <h1>WEB</h1>
  WWW is <strong>World <u>Wide</u> WEB</strong>.
  <br />
  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="Coding" style="width: 100;" />
  
  <ol>
    <li><a href="#HTML">HTML</a></li>
    <li><a href="#CSS">CSS</a></li>
    <li><a href="#JavaScript">JavaScript</a></li>
  </ol>
  
  <ul>
    <li>VS code</li>
    <li>Git</li>
    <li>Chrome</li>
  </ul>
</body>
```

### 통계적인 Tag 활용
[참고](https://www.advancedwebranking.com/seo/html-study/)
![32개](WEB/img/numberofelements.png)
![빈도](WEB/img/elementsfrequency.png)
통계에 기반한 학습이야말로 더 효율적이고 효과적인 학습 방법이다.

### WEB과 Internet
WEB(1990년)이 하나의 건물이라면, Internet(1960년 말, 미국)은 그러한 건물들이 여럿 있는 하나의 도시이다.
![web](WEB/img/web.png)

과거 중앙집권적인 통신 시스템을 극복하기 위해 Internet이 생겼고, 이는 분산적인 형태를 취해 하나가 파괴된다 하더라도 나머지가 역할을 수행할 수 있게끔 만들었다. 통신 장치, 케이블, 교육 등으로 인해 널리 퍼지지 못해 대학, 군대, 기업 등 엘리트 집단만 활용했다.
1990년 11월, 스위스 CERN 물리학 연구소의 팀 버너스 리에 의해 **세계 최초의 웹 브라우저**인 **WWW**(World Wide Web)를 만들고, 12월 24일, **세계 최초의 웹 서버**가 등장했다. 이후 두 컴퓨터에 각각 웹 브라우저와 웹 서버를 설치하고, IP 주소에 `info.cern.ch`라는 도메인 이름을 붙였다.

### Server와 Client
기본적으로 인터넷이 동작하기 위해서는 컴퓨터가 최소 2대 이상 있어야 한다. 즉, 서로 정보를 주고받기 위해 2대 이상이 필요한 것이다.
팀 버너스리는 2대의 컴퓨터를 장만하여, 하나는 웹 서버를 하나는 웹 브라우저를 설치했다. 이후 웹 서버 컴퓨터에 `htdocs` 디렉토리를 설치하고, `index.html`, `1.html`, `2.html`...등을 작성하고, 누군가에 요청에 따라 해당 디렉토리에서 파일을 찾게 설정했다.
![server&client](WEB/img/clientserver.png)
웹 브라우저가 설치된 컴퓨터에서는 `http://info.cern.ch/index.html` 주소(프로토콜://서버 위치/요청 파일)로 접속하여 웹 서버에 요청하면, 웹 서버는 설정된 디렉토리에서 찾아 `index.html` 파일 내부의 내용을 응답하게 된다.
따라서 이렇게 데이터를 요청하는 컴퓨터는 **Client**, 요청을 받는 컴퓨터는 **Server**로 불리게 되었다.

결국 Internet과 WEB은 폭발적으로 동반적인 성장을 이룩했고, 지금은 모든 것이 CPU를 가지고 컴퓨터가 되어 사물 인터넷, IoT가 발전하고 있다.
![internet](WEB/img/Internet.png)

### Live Server
`http://127.0.0.1:5500/Elice%20SW%20Track/WEB/index.html`
IP 주소는 0~255 사이의 숫자 4개가 `.`으로 구분된다. 이때 `127.0.0.1`은 자기 자신을 나타내는 IP 주소로 약속되어 있다.

### Hosting
인터넷에 연결된 컴퓨터 하나 하나를 호스트라고 하고, 이를 빌려주는 서비스를 호스팅 서비스라고 한다. 

## 0404 | 월요일 실습 강의
[Quiz 001 - Heading Tags](https://www.w3schools.com/tags/tag_hn.asp)
[Quiz 002 - HTML Colors](https://www.w3schools.com/html/html_colors.asp)
[Quiz 002 - CSS Inline Style / Style Tag / Style.css](https://www.w3schools.com/csS/css_howto.asp)  
[Quiz 003 - Selectors](https://www.w3schools.com/cssref/css_selectors.asp)
[Quiz 004 - backgroundColor](https://www.w3schools.com/cssref/pr_background-color.asp)
[Quiz 005 - font-family](https://www.w3schools.com/cssref/pr_font_font-family.asp)
[Quiz 006 - float](https://www.w3schools.com/cssref/pr_class_float.asp)
[Quiz 006 - clear](https://www.w3schools.com/cssref/pr_class_clear.asp)

<hr>

[참고 - color picker](https://www.w3schools.com/colors/colors_picker.asp)
[참고 - `em`](https://developer.mozilla.org/ko/docs/Learn/CSS/Building_blocks/Values_and_units) 반응형 웹 사이트 제작에 보통 활용한다.
[참고 `font-size`](https://developer.mozilla.org/ko/docs/Web/CSS/font-size) 데스크탑은 16px, 모바일은 12px이 평균적이다.

<hr>

### [CSS Colors](https://www.w3schools.com/cssref/css_colors.asp)
`Hex` , `RGB`, `HSL`, `Color Names` 총 네 가지 방식으로 표현할 수 있다.