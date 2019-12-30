/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, twoSixes, winningScore;  //, dice;
// gamePlaying is a state variable (boolean) which states that the game is either on or off.

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
      // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    twoSixes = twoSixesAnalyzer(dice);

    // 2. Display result (right now it's "none")
    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice2');
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    // Change the source attribute of the dice image:
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';


    // 3. Update round score, but only if the number rolled wasn't a 1.
    if (dice !== 1 && dice2 !== 1) {
      if (twoSixes) {
        console.log(twoSixesArr.reduce((a, b) => a + b, 0));
        
        roundScore = 0;
        updateRoundScore();
        console.log('Total score before: ' + scores[activePlayer]);
        scores[activePlayer] = 0;
        resetOverallScore(activePlayer);
        console.log('Total score after reset: ' + scores[activePlayer]);
        twoSixesArr = [0, 0];
        nextPlayer();
      }
      // Add score.
      roundScore = roundScore + dice + dice2;
      // Update current score.
      updateRoundScore();
      //document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

function updateRoundScore() {
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function resetOverallScore(activePlayer) {
  document.getElementById('score-' + activePlayer).textContent = '0';
}

function twoSixesAnalyzer(diceValue) {
  // Use array as a queue (first-in first-out).
  twoSixesArr[1] = twoSixesArr[0];
  twoSixesArr[0] = diceValue;
  // Does the sum of all array elements equal 12?
  if (twoSixesArr.reduce((a, b) => a + b, 0) === 12) {
    return true;
  } else {
    return false;
  }
};

// Hold score accumulated so far..
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add current score to global score.
    scores[activePlayer] += roundScore;

    // Update the UI.
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
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
  
  roundScore = 0;
  
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // Example of how to add or remove a class in JavaScript. Use toggle method.
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';  // hide dice when active player changes
  document.querySelector('.dice2').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  gamePlaying = true;
  winningScore = prompt('Enter the winning score: ', 100);  // 100 is default
  console.log('Winning score set by user as: ' + winningScore);
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  twoSixes = false;
  twoSixesArr = [0, 0];

  // Hide the dice in the center when user first starts game, so it doesn't show a random value.
  // This is done by querying the class "dice". We use the dot syntax to select a class.
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

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
