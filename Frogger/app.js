document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll(".grid div"),
		timeLeft = document.querySelector("#time-left"),
		result = document.querySelector("#result"),
    startBtn = document.querySelector('#button'),
    carsLeft = document.querySelectorAll('.car-left'),
    carsRight = document.querySelectorAll('.car-right'),
    logsLeft = document.querySelectorAll('.log-left'),
    logsRight = document.querySelectorAll('.log-right'),
    width = 9;
  let curIdx = 76,
      curTime =20,
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
    lose();
    win();
  }

  function autoMoveCars() {
    carsLeft.forEach(car => moveCarLeft(car));
    carsRight.forEach(car => moveCarRight(car));

    function moveCarLeft(carLeft) {
      switch (true) {
        case carLeft.classList.contains('c1'):
          carLeft.classList.remove('c1');
          carLeft.classList.add('c2');
          break;
        case carLeft.classList.contains('c2'):
          carLeft.classList.remove('c2');
          carLeft.classList.add('c3');
          break;
        case carLeft.classList.contains('c3'):
          carLeft.classList.remove('c3');
          carLeft.classList.add('c1');
          break;
      }
    }
    function moveCarRight(carRight) {
      switch (true) {
        case carRight.classList.contains('c1'):
          carRight.classList.remove('c1');
          carRight.classList.add('c2');
          break;
        case carRight.classList.contains('c2'):
          carRight.classList.remove('c2');
          carRight.classList.add('c3');
          break;
        case carRight.classList.contains('c3'):
          carRight.classList.remove('c3');
          carRight.classList.add('c1');
          break;
      }
    } 
  }
  function autoMoveLogs() {
    logsLeft.forEach(log=> moveLogLeft(log));
    logsRight.forEach(log => moveLogRight(log));

    function moveLogLeft(logLeft) {
      switch (true) {
        case logLeft.classList.contains('l1'):
          logLeft.classList.remove('l1');
          logLeft.classList.add('l2');
          break;
        case logLeft.classList.contains('l2'):
          logLeft.classList.remove('l2');
          logLeft.classList.add('l3');
          break;
        case logLeft.classList.contains('l3'):
          logLeft.classList.remove('l3');
          logLeft.classList.add('l4');
          break;
        case logLeft.classList.contains('l4'):
          logLeft.classList.remove('l4');
          logLeft.classList.add('l5');
          break;
        case logLeft.classList.contains('l5'):
          logLeft.classList.remove('l5');
          logLeft.classList.add('l1');
          break;
      }
    }
    function moveLogRight(logRight) {
      switch (true) {
        case logRight.classList.contains('l1'):
          logRight.classList.remove('l1');
          logRight.classList.add('l5');
          break;
        case logRight.classList.contains('l2'):
          logRight.classList.remove('l2');
          logRight.classList.add('l1');
          break;
        case logRight.classList.contains('l3'):
          logRight.classList.remove('l3');
          logRight.classList.add('l2');
          break;
        case logRight.classList.contains('l4'):
          logRight.classList.remove('l4');
          logRight.classList.add('l3');
          break;
        case logRight.classList.contains('l5'):
          logRight.classList.remove('l5');
          logRight.classList.add('l4');
          break;
      }
    }
  }
   
  function win() {
    if(squares[4].classList.contains('frog')){
      result.innerHTML = 'YOU WIN';
      squares[curIdx].classList.remove('frog');
      clearInterval(timerId);
      document.removeEventListener('keyup', moveFrog);
    }
  }

  function lose() {
    if( curTime === 0 || 
        (squares[curIdx].classList.contains('c1')) ||
        (squares[curIdx].classList.contains('l4')) || 
        (squares[curIdx].classList.contains('l5')) 
      ){
        result.innerHTML = "YOU LOSE";
				squares[curIdx].classList.remove("frog");
				clearInterval(timerId);
				document.removeEventListener("keyup", moveFrog);
      }
  }

  function moveWithLogLeft() {
    if(curIdx >= 27 && curIdx < 35){
      squares[curIdx].classList.remove('frog');
      curIdx += 1;
      squares[curIdx].classList.add('frog');
    }
  }
  
  function moveWithLogRight() {
    if(curIdx > 18 && curIdx <= 26){
      squares[curIdx].classList.remove('frog');
      curIdx -= 1;
      squares[curIdx].classList.add('frog');
    }
  }

  function movePieces() {
    curTime--;
    timeLeft.textContent = curTime;
    autoMoveCars();
    autoMoveLogs();
    moveWithLogLeft();
    moveWithLogRight();
    lose();
  }

  startBtn.addEventListener('click', () => {
    if(timerId){
      clearInterval(timerId);
    }else{
      timerId = setInterval(movePieces, 1000);
      document.addEventListener('keyup', moveFrog);
    }
  });

});