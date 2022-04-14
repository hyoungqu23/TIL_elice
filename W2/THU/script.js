// 1. Scroll Navigation
// header 내부의 모든 a 태그 선택
let aTags = document.querySelectorAll("header a");

for (let i = 0; i < aTags.length; i++) {
  // 선택한 a 태그 모두에 onclick event handler를 추가
  aTags[i].onclick = function(e) {
    // a 태그의 기본 동작 방지
    e.preventDefault();

    // click한 a 태그의 href 속성 값(예: '#intro')을 활용해 #intro section 태그를 선택 
    let target = document.querySelector(this.getAttribute("href"));

    window.scrollTo({
      // 스크롤 방식
      'behavior': 'smooth',

      // 스크롤 위치 좌표
      'top': target.offsetTop, 
    })
  }
}