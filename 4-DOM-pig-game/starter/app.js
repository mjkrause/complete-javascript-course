/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;  //, dice;
// gamePlaying is a state variable (boolean) which states that the game is either on or off.

init();

// scores = [0, 0];
// roundScore = 0;
// activePlayer = 0;

//dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// document.querySelector('#current-' + activePlayer).textContent = dice;
// Use HTML instead, e.g. we can use emphasis by using strings in italics instead of just plain
// text.
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>' 

// var x = document.querySelector('#score-0').textContent;
// console.log('x is ' + x);

// Hide the dice in the center when user first starts game, so it doesn't show a random value.
// This is done by querying the class "dice". We use the dot syntax to select a class.
/* document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0'; */


// Example of a callback function.
// First we could define the function.
function btn() {
  // do something...
}
// The second argument to the event listener method is a callback function. Note that we do
// not use the common function call syntax of "funcName();", but instead use the function
// name. This seems common for callback functions. The method "addEventListener" calls the
// function on our behalf, and will use the correct syntax to do it.
// document.querySelector('.btn-roll').addEventListener('click', btn)

// ANONYOUS FUNCTION: instead of using the name of the btn function in the last line we 
// could have simple defined the function right there in the argument of the 
// ".addEventListener" method. Then the function would have no name, and would be referred to
// as an anonymous function. But annoymous functions cannot be reused.

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
      // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display result (right now it's "none")
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    // Change the source attribute of the dice image:
    diceDOM.src = 'dice-' + dice + '.png';


    // 3. Update round score, but only if the number rolled wasn't a 1.
    if (dice !== 1) {
      // Add score.
      roundScore = roundScore + dice;
      // Update current score.
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// Hold score accumulated so far..
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add current score to global score.
    scores[activePlayer] += roundScore;

    // Update the UI.
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 10) {
      gamePlaying = false;
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

    } else {
      nextPlayer();    
    }
  }
});


function nextPlayer() {
  // Change active player. (This is an opportunity to use the ternary operator.)
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // which is the same as this:
  // if (activePlayer === 0) {
  //   activePlayer = 1;
  // } else {
  //   activePlayer = 0;
  // }
  
  roundScore = 0;
  
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // Example of how to add or remove a class in JavaScript:
  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');
  // Use toggle method.
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';  // hide dice when active player changes
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  gamePlaying = true;
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  // Hide the dice in the center when user first starts game, so it doesn't show a random value.
  // This is done by querying the class "dice". We use the dot syntax to select a class.
  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
