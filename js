const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelectorAll('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelectorAll('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;


function pickRandomHole(holes){
   const randomHole = Math.floor(Math.random()* holes.length);
   const hole = holes[randomHole];
   if (hole === lastHole) {
       return pickRandomHole(holes);
   } 
   lastHole = hole;
   return hole;
}

function popOut(){
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){// !!!!!!!!!
        hole.classList.remove('up');
        if(!timeUp) popOut();
    }, time);
}
popOut();

function startGame(){
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            clearInterval(startCountdown);
            countdownBoard.textContent = 'Times UP!!  Thank you for protecting our planet!  This is the way!';
        }
    }, 1000);
}
startButton.addEventListener('click', startGame);

function whack(e){
    score++;
    this.style.backgroundImage = 'url("baby-yoda-reaching.jpg")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("baby-yoda-sleeping.png")';
    }, 800);
    scoreBoard.textContent = score;
}

moles.forEach(mole.addEventListener('click', whack));



//////
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) //show random moles for 15 seconds
}

function whack(e){
    if(!e.isTrusted) return; //** new thing I learned */
    score++;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
}