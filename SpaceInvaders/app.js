document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const resultDisplay = document.querySelector('#result');
  let width = 15,
      curShooterIdx = 202,
      curInvaderIdx = 0,
      alienInvaderTakenDown = [],
      result = 0,
      direction = 1,
      invaderId;

  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
  ];
  // add invaders to the board
  alienInvaders.forEach(invader => squares[curInvaderIdx + invader].classList.add('invader'));
  // add shooter to the board
  squares[curShooterIdx].classList.add('shooter');

  // controls 
  function moveShooter(e) {
    squares[curShooterIdx].classList.remove('shooter');
    
    switch (e.keyCode) {
      case 37:
        if (curShooterIdx % width !== 0) curShooterIdx--;
        break;
      case 39:
        if (curShooterIdx % width < width - 1) curShooterIdx++;
        break;
    }
    squares[curShooterIdx].classList.add('shooter');  
  }

  document.addEventListener('keydown', moveShooter);

  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length -1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      direction = width;
    } else if (direction === width) {
      if (leftEdge) direction = 1;
      else direction = -1;
    } 
    for (let i = 0; i <= alienInvaders.length-1; i++) {
      squares[alienInvaders[i]].classList.remove('invader');
    }
    for (let i = 0; i <= alienInvaders.length-1; i++) {
      alienInvaders[i] += direction;
    }

    for(let i =0; i <= alienInvaders.length-1; i++){
      if(!alienInvaderTakenDown.includes(i)) {
        squares[alienInvaders[i]].classList.add('invader');
      }
    }
    
    // check for overlapping; game over
    if(squares[curShooterIdx].classList.contains('invader', 'shooter')){
      resultDisplay.textContent = 'Game Over';
      squares[curShooterIdx].classList.add('boom');
      clearInterval(invaderId);
    }
    
    for (let i = 0; i <= alienInvaders.length-1; i++) {
      if(alienInvaders[i] > (squares.length - (width-1))){
        resultDisplay.textContent = "Game Over";
        clearInterval(invaderId);
      }
    }

    if (alienInvaders.length === alienInvaderTakenDown.length) {
      resultDisplay.textContent = 'You win';
      clearInterval(invaderId);   
    }
  }
  
  invaderId = setInterval(moveInvaders, 500);

  function shoot(e) {
    let laserId,
    curLaserIdx = curShooterIdx;

    function moveLaser() {
      squares[curLaserIdx].classList.remove('laser');
      curLaserIdx -= width;
      squares[curLaserIdx].classList.add('laser');
      if(squares[curLaserIdx].classList.contains('invader')){
        squares[curLaserIdx].classList.remove('laser');
        squares[curLaserIdx].classList.remove('invader');
        squares[curLaserIdx].classList.add('boom');

        setTimeout(() => squares[curLaserIdx].classList.remove('boom',250));
        clearInterval(laserId);

        const alienTakenDown = alienInvaders.indexOf(curLaserIdx);
        alienInvaderTakenDown.push(alienTakenDown);
        result++;
        resultDisplay.textContent = result;
      }

      if (curLaserIdx < width) {
        clearInterval(laserId);
        setTimeout(()=> squares[curLaserIdx].classList.remove('laser'));
      }
    }
    
    document.addEventListener('keyup', e =>{
      if(e.keyCode === 32) laserId = setInterval(moveLaser, 100);
    });
  }

  document.addEventListener('keyup', shoot); 

});