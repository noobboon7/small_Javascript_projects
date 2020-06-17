const sqaures = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector("#score");

let result = 0;
let curTime = timeLeft.textContent;

function randomSquare(){
  // clears the mole from squares
  sqaures.forEach(square => square.classList.remove('mole'));

  // create a random spot for the mole image to appear
  let randomPosition = sqaures[Math.floor(Math.random()*9)];
  randomPosition.classList.add('mole');

  // assign the id of the random position to hitPosition 
  hitPosition = randomPosition.id;

}

sqaures.forEach(sqr => {
  sqr.addEventListener('mouseup', () => {
    if(sqr.id === hitPosition){
      result ++;
      score.textContent = result;
    }
  });
});

function moveMole() {
  let moleTimerId;
  moleTimerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown() {
  curTime--;
  timeLeft.textContent = curTime;

  if (curTime === 0) {
    clearInterval(timerId);
    alert(`Game Over! Your final score is: ${result}`);
  }
}

let timerId = setInterval(countDown, 1000);