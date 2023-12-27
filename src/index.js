const $cardSnake = document.getElementById('card-snake');
const $cardPong = document.getElementById('card-pong');



$cardSnake.addEventListener('mouseenter', ()=>{
  animacionCardEnter($cardSnake);
});

$cardSnake.addEventListener('mouseleave', ()=>{
  animacionCardLeave($cardSnake);
});

$cardPong.addEventListener('mouseenter', ()=>{
  animacionCardEnter($cardPong);
});

$cardPong.addEventListener('mouseleave', ()=>{
  animacionCardLeave($cardPong);
});

const animacionCardEnter = (card)=>{
  card.children[0].style.transition = 'opacity 0.6s ease';
  card.children[0].style.opacity = '0.4';
  card.getElementsByTagName('a')[0].style.opacity = '1';
}

const animacionCardLeave = (card)=>{
  card.children[0].style.opacity = '1';
  card.getElementsByTagName('a')[0].style.opacity = '0';
}