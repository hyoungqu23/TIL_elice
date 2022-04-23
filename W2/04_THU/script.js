// 1. Scroll Navigation
// header 내부의 모든 a 태그 선택
let $aTags = document.querySelectorAll("header a");

for (let i = 0; i < $aTags.length; i++) {
  // 선택한 a 태그 모두에 onclick event handler를 추가
  $aTags[i].onclick = function(e) {
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

// 3. Tab
// Tab 버튼과 아래 내용을 선택
let $links = document.querySelectorAll(".tabs-list li a");
let $items = document.querySelectorAll(".tabs-list li");

// a 태그의 기본 동작 방지
for (let i = 0; i < $links.length; i++) {
  $links[i].onclick = function(e) {
    e.preventDefault();
  }
}

// Tab 버튼에 click Event handler 추가
for (let i = 0; i < $items.length; i++) {
  $items[i].onclick = function() {
    // a 태그의 href 속성 값 선택
    let tabId = this.querySelector("a").getAttribute("href");
    console.log(this.classList);

    // 모든 Tab 버튼과 내용에서 `active` 클래스를 제거
    document.querySelectorAll(".tabs-list li, .tabs div.tab").forEach(function(item) {
      item.classList.remove("active");
      console.log(item);
    });

    // 선택한 href와 동일한 Id를 가진 요소에 `active` 클래스 추가
    document.querySelector(tabId).classList.add("active");

    // 해당 Tab 버튼에도 동일하게 `active` 클래스 추가
    this.classList.add("active");
  }
}

// 4. Click Image Slider
// arrow-right
// 오른쪽 화살표 버튼에 click Event Handler 추가
document.querySelector(".right-arrow").onclick = function () {
  // 현재 슬라이드 이미지 선택
  let currentSlide = document.querySelector("#photo .slide.active");

  // 다음 슬라이드 이미지 선택
  let nextSlide = currentSlide.nextElementSibling;

  // 다음 슬라이드 이미지가 없는 경우(현재 슬라이드 이미지가 마지막 슬라이드 이미지인 경우)
  if (nextSlide === null) {
    // 첫 번째 슬라이드 이미지로 돌아가기
    nextSlide = currentSlide.parentElement.firstElementChild;
  }

  // 현재 슬라이드 이미지에 애니메이션 추가
  currentSlide.animate({
    // Fade-out 효과 지정
    opacity: [1, 0]
  }, {
    // 애니메이션 세부 설정
    duration: 500,
    easing: "ease",
    iterations: 1,
    fill: "both"
  });

  // 현재 슬라이드 이미지에 `active` 클래스 제거
  currentSlide.classList.remove("active");

  // 다음 슬라이드 이미지에 애니메이션 추가
  nextSlide.animate({
    // Fade-in 효과 지정
    opacity: [0, 1]
  }, {
    // 애니메이션 세부 설정
    duration: 500,
    easing: "ease",
    iterations: 1,
    fill: "both"
  });

  // 다음 슬라이드 이미지에 `active` 클래스 추가
  nextSlide.classList.add("active");
}

// arrow-left
document.querySelector(".left-arrow").onclick = function () {
  // 현재 슬라이드 이미지 선택
  let currentSlide = document.querySelector("#photo .slide.active");

  // 이전 슬라이드 이미지 선택
  let previousSlide = currentSlide.previousElementSibling;

  // 이전 슬라이드 이미지가 없는 경우(현재 슬라이드 이미지가 첫 번쨰 슬라이드 이미지인 경우)
  if (previousSlide === null) {
    // 마지막 슬라이드 이미지로 돌아가기
    previousSlide = currentSlide.parentElement.lastElementChild;
  }

  // 현재 슬라이드 이미지에 애니메이션 추가
  currentSlide.animate({
    // Fade-out 효과 지정
    opacity: [1, 0]
  }, {
    // 애니메이션 세부 설정
    duration: 500,
    easing: "ease",
    iterations: 1,
    fill: "both"
  });

  // 현재 슬라이드 이미지에 `active` 클래스 제거
  currentSlide.classList.remove("active");

  // 이전 슬라이드 이미지에 애니메이션 추가
  previousSlide.animate({
    // Fade-in 효과 지정
    opacity: [0, 1]
  }, {
    // 애니메이션 세부 설정
    duration: 500,
    easing: "ease",
    iterations: 1,
    fill: "both"
  });

  // 이전 슬라이드 이미지에 `active` 클래스 추가
  previousSlide.classList.add("active");
}