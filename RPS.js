// <...........getting buttons from html to script...........>
const buttonRock = document.querySelector('.js-rock-btn');
const buttonPaper = document.querySelector('.js-paper-btn');
const buttonScissor = document.querySelector('.js-scissor-btn');
const buttonReset = document.querySelector('.js-reset-btn');
const buttonAutoPlay = document.querySelector('.js-auto-btn');

// <.......adding .addEventListener(clicking) to buttons.....>
buttonRock.addEventListener('click', () => {
  playGame('Rock');
});

buttonPaper.addEventListener('click', () => {
  playGame('Paper');
});

buttonScissor.addEventListener('click', () => {
  playGame('Scissor');
});

// <.......reset scores button.....>
buttonReset.addEventListener('click', () => {
  showResetConfirmation();
});

// <.......Auto play button.....>
buttonAutoPlay.addEventListener('click', () => {
  autoPlay();
});

// <.......adding .addEventListener(clicking) to buttons.....>

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'a'){
    autoPlay();
  }else if(event.key === 'Backspace'){
    showResetConfirmation();
  }else if(event.key === 'r'){
    playGame('Rock');
  }else if(event.key === 'p'){
    playGame('Paper');
  }else if(event.key === 's'){
    playGame('Scissor');
  }
});

//<....................main.container........................>
//<....................scores.container......................>

let scores = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  ties:0
};

//<...............resetScores() function................>

function resetScores(){
  scores.wins = 0;
  scores.losses = 0;
  scores.ties = 0;

  //after above code will update scores....
  updateScoreElement();
}



//<...............computerMove finding function..............>

function pickRandomNumber(){

  let computerMove = '';

  const randomNumber = Math.random();

  if(randomNumber >= 0 && randomNumber <= 1/3){
    computerMove = 'Rock';
  }else if(randomNumber >= 1/3 && randomNumber <= 1/2){
    computerMove = 'Paper';
  }else if(randomNumber >= 1/2 && randomNumber <= 1){
    computerMove = 'Scissor'
  }

  return computerMove;
}


//<...............playerMove finding function................>

function playGame(playerMove){

  const computerMove = pickRandomNumber();

  let result = '';

  if(playerMove === 'Rock'){
    if(computerMove === 'Rock'){
      result = 'Tie.';
    }else if(computerMove === 'Paper'){
      result = 'You lose.';
    }else if(computerMove === 'Scissor'){
      result = 'You win.'
    }
  
  }else if(playerMove === 'Paper'){
    if(computerMove === 'Rock'){
      result = 'You win.';
    }else if(computerMove === 'Paper'){
      result = 'Tie.';
    }else if(computerMove === 'Scissor'){
      result = 'You lose.'
    }
  
  }else if(playerMove === 'Scissor'){
    if(computerMove === 'Rock'){
      result = 'You lose.';
    }else if(computerMove === 'Paper'){
      result = 'You win.';
    }else if(computerMove === 'Scissor'){
      result = 'Tie.'
    }
  }

  //if condition for a scores......
  if(result === 'You win.'){
    scores.wins++;
 }else if(result === 'You lose.'){
   scores.losses++;
 }else if(result === 'Tie.'){
   scores.ties++;
 }

 //here we will store scores into a {local storage}....
 localStorage.setItem('score', JSON.stringify(scores));

 //here we will update scores....
 updateScoreElement();

 //here we will display the (result) on webpage....
 document.querySelector('.js-result').innerHTML = `Result: ${result}`;

 //here we will display the (Moves) on webpage....
 document.querySelector('.js-moves').innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;

}


//<.................updatingScores function..................>

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML =`  Wins: ${scores.wins}, Loses: ${scores.losses}, Ties: ${scores.ties}.`;
}

//<.....................auto play function...................>

let intervalId;
let isAutoPlaying = false;

function autoPlay(){

  buttonAutoPlay.innerHTML = 'Stop Playing';

  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickRandomNumber();
      playGame(playerMove);
    },1000)
    isAutoPlaying = true;
  
  }else{
    buttonAutoPlay.innerHTML = 'Auto Play'
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

}

//<............reset scores updateComfrimation().............>

function showResetConfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML =`
  Are you want to reset the score?
  <button class="js-reset-confirm-yes reset-yes-css">Yes</button>
  <button class="js-reset-confirm-no reset-no-css">No</button>
  `;

    // You could use onclick="..." in the HTML above,
  // but it's recommended to use .addEventListener()
  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScores();
      hideResetConfirmation();
    });
  
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      updateScoreElement();
      hideResetConfirmation();
    });

 }

// A helper function (it helps us reuse the
// code for hiding the confirmation message).
function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}



//<.....................main container End...................>