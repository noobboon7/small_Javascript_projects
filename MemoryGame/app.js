document.addEventListener('DOMContentLoaded', () => {

  const cardsArray = [
    {
      name: 'cat',
      img: './Images/cat.png'
    },
    {
      name: 'cat',
      img: './Images/cat.png'
    },
    {
      name: 'hamster',
      img: './Images/hamster.png'
    },
    {
      name: 'hamster',
      img: './Images/hamster.png'
    },
    {
      name: 'ironman',
      img: './Images/ironman.png'
    },
    {
      name: 'ironman',
      img: './Images/ironman.png'
    },
    {
      name: 'kirby',
      img: './Images/kirby.png'
    },
    {
      name: 'kirby',
      img: './Images/kirby.png'
    },
    {
      name: 'minon',
      img: './Images/minon.png'
    },
    {
      name: 'minon',
      img: './Images/minon.png'
    },
    {
      name: 'mushroom',
      img: './Images/mushroom.png'
    },
    {
      name: 'mushroom',
      img: './Images/mushroom.png'
    },
    {
      name: 'sword',
      img: './Images/sword.png'
    },
    {
      name: 'sword',
      img: './Images/sword.png'
    },
    {
      name: 'turtle',
      img: './Images/turtle.png'
    },
    {
      name: 'turtle',
      img: './Images/turtle.png'
    },
  ];

  cardsArray.sort(() => 0.5 - Math.random());

  const gird = document.querySelector('.gird');
  const resultDisplay = document.querySelector('#result');
  let choosenCards = [],
      choosenCardId = [];
  const cardsWon = [];

  // create board 
  function createBoard() {
    cardsArray.forEach((obj, idx) => {
      
      const card = document.createElement('img');
      card.setAttribute("src", './Images/block.png');
      card.setAttribute('data-id', idx);
      card.addEventListener('click', flipCard);
      gird.appendChild(card);
    });
  }

  function isMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = choosenCardId[0];
    const optionTwoId = choosenCardId[1];

    if(choosenCards[0] === choosenCards[1]){
      alert('You found a Match!');
      cards[optionOneId].setAttribute('src', './Images/blank.png');
      cards[optionTwoId].setAttribute('src', './Images/blank.png');
      cardsWon.push(choosenCards);
    }else {
      cards[optionOneId].setAttribute("src", "./Images/block.png");
      cards[optionTwoId].setAttribute("src", "./Images/block.png");
      alert('Sorry, try again.');
    }

    choosenCards = [];
    choosenCardId = [];

    resultDisplay.textContent = cardsWon.length;
    if(cardsWon.length === cardsArray.length/2){
      resultDisplay.textContent = 'Congrats you found them all!';
    }
  }

  function flipCard() {
    const cardId = this.getAttribute('data-id');

    choosenCards.push(cardsArray[cardId].name);
    choosenCardId.push(cardId);
    this.setAttribute('src', cardsArray[cardId].img);

    // check if card is a match 
    if(choosenCards.length === 2) setTimeout(isMatch , 500);
  }


  createBoard();
});