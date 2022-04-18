// Dark Mode 구현(Event driven Programming)

export function darkMode() {
  if (this.value === 'Dark Mode') {   // 만약 버튼의 value가 다크모드라면, 
    document.querySelector('body').style.backgroundColor = 'black';
    // $('body').css('background-color', 'black');  // jQuery 버전의 동일 코드
    document.querySelector('body').style.color = 'white';
    // $('body').css('color', 'white');  // jQuery 버전의 동일 코드
    this.value='Light Mode';
  } else {    // 아니라면
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';
    this.value='Dark Mode';
  }
}

{/* <input type="button" id="darkMode" value="Dark Mode" 
  onclick="
  if (event.target.value === 'Dark Mode') {
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('body').style.color = 'white';
    event.target.value='Light Mode';
  } else {
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';
    event.target.value='Dark Mode';
  }
  "
>
<input type="button" id="darkMode" value="Dark Mode" 
  onclick="
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('body').style.color = 'white';
  "
>
<input type="button" id="ligthMode" value="Light Mode" 
  onclick="
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';
  "
>

<input type="button" id="darkMode" value="Dark Mode"
  onclick="
    alert('Dark Mode');
  " 
  onmouseleave="
    alert('bye');
  "> */}
