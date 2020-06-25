document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll(".grid div"),
		timeLeft = document.querySelector("#time-left"),
		result = document.querySelector("#result"),
    startBtn = document.querySelector('#button'),
    width = 9;
  let curIdx = 76,
      timerId;

  // add frog
  squares[curIdx].classList.add('frog');
  
  function moveFrog(e) {
    squares[curIdx].classList.remove('frog');
    switch (e.keyCode) {
      case 37:
        if(curIdx % width !== 0) curIdx--;
        break;
        
      case 38:
        if(curIdx - width >= 0) curIdx -= width;
        break;
        
      case 39:
        if(curIdx % width < width -1) curIdx++;
        break;
        
      case 40:
        if (curIdx + width < width * width) curIdx += width;
        break;
    }
    squares[curIdx].classList.add('frog');
  }

});