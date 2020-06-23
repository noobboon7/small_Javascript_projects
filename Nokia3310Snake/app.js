document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  const width = 10;
  let curIdx = 0,
      appleIdx = 0,
      curSnake = [2,1,0],
      direction = 1,
      score = 0,
      speed = 0.9,
      intervalTime = 0,
      interval = 0;


  function startGame() {
    curSnake.forEach(idx => squares[idx].classList.remove('snake'));
    squares[appleIdx].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple()
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    curSnake = [2,1,0];
    curIdx = 0;
    curSnake.forEach((idx) => squares[idx].classList.add("snake"));
    interval = setInterval(movesOutcomes, intervalTime);
  }    

  function movesOutcomes() {
    if(
      (curSnake[0] + width >= (width*width) && direction === width) || 
      (curSnake[0] % width === width -1 && direction === 1) || 
      (curSnake[0] % width === 0 && direction === -1) || 
      (curSnake[0] - width < 0 && direction === -width) || 
      squares[curSnake[0] + direction].classList.contains('snake')
    ){
      return clearInterval(interval);
    }
    const tail = curSnake.pop();
    squares[tail].classList.remove('snake');
    curSnake.unshift(curSnake[0]+direction);

    if (squares[curSnake[0]].classList.contains('apple')) {
      squares[curSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');
      curSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.innerText = score;
      clearInterval(interval);
      intervalTime *= speed;
      interval = setInterval(movesOutcomes, intervalTime);
    }
    squares[curSnake[0]].classList.add('snake');
  }

  function randomApple() {
    do {
      appleIdx = Math.floor(Math.random() * squares.length)
    } while (squares[appleIdx].classList.contains('apple'));
    squares[appleIdx].classList.add('apple');
  }

  function control(e){
    squares[curIdx].classList.remove('snake');

    if(e.keyCode === 39){ //right 
      direction = 1;
    } else if(e.keyCode === 38){ //up
      direction = -width;
    } else if(e.keyCode === 37){ //left
      direction = -1;
    }else if (e.keyCode === 40) { //down
      direction = +width;      
    }
  }

  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);
});