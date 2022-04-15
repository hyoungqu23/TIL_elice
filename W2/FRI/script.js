// Navbar 구현
let $aTags = document.querySelectorAll("header a");

for (let i = 0; i < $aTags.length; i++) {
  $aTags[i].onclick = function(e) {
    e.preventDefault();
    let target = document.querySelector(this.getAttribute("href"));
    window.scrollTo({
      'behavior': 'smooth',
      'top': target.offsetTop, 
    })
  }
}

// Tab 구현
let $links = document.querySelectorAll(".tab-list li a");
let $items = document.querySelectorAll(".tab-list li");

for (let i = 0; i < $links.length; i++) {
  $links[i].onclick = function(e) {
    e.preventDefault();
  }
}
for (let i = 0; i < $items.length; i++) {
  $items[i].onclick = function() {
    let tabId = this.querySelector("a").getAttribute("href");
    document.querySelectorAll(".tab-list li, .tab-container div.tab").forEach(function(item) {
      item.classList.remove("active");
    });
    document.querySelector(tabId).classList.add("active");
    this.classList.add("active");
  }
}

// 텍스트 Swipe 구현
const text_content = ["프론트엔드", "성실히 기록하는", "코드를 설명할 수 있는", "문제 해결 능력이 있는", "즐겁게 개발하는", "조금 더 살기 좋은 세상을 만드는"];
const $text = document.querySelector('p.text');
let idx = 0;

function swipe() {
  let txt = text_content[idx++];
  $text.innerHTML = txt;
  if (idx >= text_content.length) {
    idx = 0;
  }
  console.log(idx);
}

setInterval(swipe, 2000);

// button open 구현
const $button = document.querySelector('button#open');

$button.addEventListener("click", () => {
  const $letter = document.querySelector("div.letter");
  if ($button.innerText === "CLOSE") {
    $letter.classList.add("hidden");
    $button.innerText = "OPEN";
  } else if ($button.innerText === "OPEN") {
    $letter.classList.remove("hidden");
    $button.innerText = "CLOSE";
  }
})