'use strict';

/* SELECTING ELEMENTS */

// PLAYER 1
const class1 = () => document.querySelector('.player--0');
const score1 = () => document.getElementById('score--0');
const currentScore1 = () => document.getElementById('current--0')

// PLAYER 2
const class2 = () => document.querySelector('.player--1');
const score2 = () => document.getElementById('score--1');
const currentScore2 = () => document.getElementById('current--1')

// BUTTONS
let btnNew = () => document.querySelector('.btn--new');
let btnRoll = () => document.querySelector('.btn--roll');
let btnHold = () => document.querySelector('.btn--hold')

const diceEl = () => document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

/* STARTING CONDITION */
let startingCondition = () => {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score1().textContent = 0;
    score2().textContent = 0;
    currentScore1().textContent = 0;
    currentScore2().textContent = 0;
    diceEl().classList.add('hidden');
    
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');

   

}
startingCondition()

let switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    class1().classList.toggle('player--active');
    class2().classList.toggle('player--active');
}

btnRoll().addEventListener('click', () => {
   if(playing){
     // 1. Generating a random dice roll
     const dice = Math.trunc(Math.random() * 6) + 1;
     // 2. Display dice
     diceEl().classList.remove('hidden');
     diceEl().src = `assets/img/dice-${dice}.png`
     // 3. Check for rolled 1:
     if(dice !== 1){
         // Add dice to current score
         currentScore += dice;
         document.getElementById(`current--${activePlayer}`).textContent = currentScore
     }else{
         //switch to next player
         switchPlayer()
     }
   }
});

btnHold().addEventListener('click', () => {
    if(playing){
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if player's score is >= 100
        if(scores[activePlayer] >= 100) {
            // if true finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl().classList.add('hidden');
        }else{
            // If false switch to the next player
            switchPlayer();
        }
    }
})

btnNew().addEventListener('click', startingCondition);