const cards = [
  {
    cardNumber: "1",
    cardBackground: "url('./img/img-1.png')",
  },
  {
    cardNumber: "2",
    cardBackground: "url('./img/img-2.png')",
  },
  {
    cardNumber: "3",
    cardBackground: "url('./img/img-3.png')",
  },
  {
    cardNumber: "4",
    cardBackground: "url('./img/img-4.png')",
  },
  {
    cardNumber: "5",
    cardBackground: "url('./img/img-5.png')",
  },
  {
    cardNumber: "6",
    cardBackground: "url('./img/img-6.png')",
  },
  {
    cardNumber: "7",
    cardBackground: "url('./img/img-7.png')",
  },
  {
    cardNumber: "8",
    cardBackground: "url('./img/img-8.png')",
  },
]

let cardsHTML;
let container = document.getElementById('container');

function addCards (cardsQty) {
  for (let i = 0; i < cardsQty; i++) {
    let createCard = document.createElement('li');
    createCard.classList.add('card');
    container.append(createCard);
  }

  cardsHTML = document.querySelectorAll('.card');

  let cardIndex = 0;
  for (let i = 0; i < cardsHTML.length; i+=2) {
    cardsHTML[i].style.background = cards[cardIndex].cardBackground;
    cardsHTML[i+1].style.background = cards[cardIndex].cardBackground;
    if (cardIndex == cards.length - 1) {
      cardIndex = 0;
    }
    cardIndex++;
  }

  for (let i = cardsHTML.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardsHTML[i].style.background, cardsHTML[j].style.background] = [cardsHTML[j].style.background, cardsHTML[i].style.background];
  }

  let activeCards = [];

  cardsHTML.forEach((cardHTML, index) => {

    cardHTML.addEventListener('click', function(event){
      this.classList.remove('card-hidden');
      if (this.classList.contains('card-active')) {
        return
     }

      activeCards.push(this);
      this.classList.add('card-active');

      if (activeCards[1] == undefined) {
        // console.log('2 undefined');
      }

        else if (activeCards[0].style.background === activeCards[1].style.background) {

          activeCards.splice(0, 2);
          // console.log('compared');

          if (document.querySelectorAll('.card-active').length == cardsQty) {
              // console.log('win');
              let winOrLose = document.createElement('div');
              winOrLose.classList.add('win-or-lose');
              document.body.append(winOrLose);
              winOrLose.innerHTML = `Вы<br>выйграли`;
              setTimeout(()=>{
                location.reload();
              }, 2000);
          }
        }

          else {
            activeCards[1].classList.remove('card-hidden');
            setTimeout(()=>{
              activeCards.forEach((activeCard)=>{
                activeCard.classList.add('card-hidden');
                activeCard.classList.remove('card-active');
              });
              activeCards.splice(0, 2);
            }, 300)
          }
    });
  });
};

let startButton = document.querySelector('.button');
let input = document.querySelector('.cards-qty__input');
let counter = document.createElement('li');

counter.classList.add('counter');
container.prepend(counter);
document.querySelector('.counter').innerHTML = '3';

startButton.addEventListener('click', () => {

  if (input.value % 4 > 0 || input.value > 28 || input.value == '') {
    alert('Введите значение, кратное 4, и не превышающее 28');
    return;
  }

  document.querySelector('.choose-parameters').style.display = 'none';
  container.style.display = 'grid';

  let timer = document.createElement('div');
  timer.classList.add('timer');
  document.body.append(timer);
  document.querySelector('.timer').innerHTML = document.querySelector('.difficulty__select').value;

  addCards(input.value);

  const count321 = setInterval(() => {

    if (document.querySelector('.counter').innerHTML == '1') {

      clearInterval(count321);
      document.querySelector('.counter').remove();

      setTimeout(() => {

        cardsHTML.forEach((cardHTML) => {
          cardHTML.classList.add('card-hidden');
        });

        const timer = setInterval (() => {

          if (document.querySelector('.timer').innerHTML == '1' && document.querySelectorAll('.card-active').length != input.value) {
            clearInterval(timer);
            let winOrLose = document.createElement('div');
            winOrLose.classList.add('win-or-lose');
            document.body.append(winOrLose);
            winOrLose.innerHTML = `Вы<br>проиграли`;
            winOrLose.style.color = 'red';
              setTimeout(()=>{
                location.reload();
              }, 2000);
          }

          document.querySelector('.timer').innerHTML--;
        }, 1000);

        }, 3000)
      return;
    }
    document.querySelector('.counter').innerHTML--;
  },
  1000, input.value);
});
