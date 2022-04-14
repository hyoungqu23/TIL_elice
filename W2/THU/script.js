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

// 2. Image Slider
let $slider = document.querySelector('#slider');
let $slides = $slider.querySelector('.slides');
let $slide = $slides.querySelectorAll('.slide');

// 현재 노출되는 슬라이드 번호 지정(시작 0번)
let currentSlide = 0;

// 특정 함수를 3000ms, 즉 3s 간격으로 반복
setInterval(function() {
  // 현 위치에서 이동할 위치를 저장하는 변수 선언
  let from = -(1024 * currentSlide);
  let to = from - 1024;
  
  $slides.animate({
    // 왼쪽으로 이동(from + "px" => to + "px")
    marginLeft: [from + "px", to + "px"]
  }, {
    // 애니메이션 세부 설정
    duration: 2000,
    easing: "ease",
    iterations: 1,
    fill: "both"
  });

  // 노출되는 슬라이드의 번호를 1 증가
  currentSlide++;

  // 노출되는 슬라이드가 마지막일 경우에, 첫 번째로 초기화
  if (currentSlide === ($slide.length - 1)) {
    currentSlide = 0;
  }

}, 5000);

// 3.