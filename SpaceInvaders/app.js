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
  alienInvaders.forEach(invader => squares[invader].classList.add('invader'));
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

  

});