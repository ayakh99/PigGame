/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, sixCheck, maxScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(!gamePlaying) {
        return;
    }
    //random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

    //display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    diceDOM = document.querySelector('.dice-1');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice1 + '.png';
    
    
    //update the round score only if the rolled number is not a 1
    if (dice > 1 && dice1 > 1) { //or !==
        //check if there were two 6s in row
        if(dice === 6 || dice1 === 6) {
            sixCheck[1]++;
            if(sixCheck[1] > 1) {
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
                return;
            }
        }
        else {
            sixCheck[1] = 0;
        }
        //add score
        roundScore += dice + dice1;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    } else {
        //next player
        nextPlayer();   
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(!gamePlaying) {
        return;
    }
    //add round score to global score
    scores[activePlayer] += roundScore;

    //update the ui
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //check if player won the game

    if (scores[activePlayer] >= maxScore) {
        gamePlaying = false;
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        hideDice();
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
    } else {
        //Next player
        nextPlayer();
    } 
});


function hideDice() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
}


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    resetCheck();
    
    document.getElementById('current-0').textContent = '0';       
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    hideDice();
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    sixCheck = [0, 0];
    gamePlaying = true;
    
    maxScore = 100;
    var userInput = document.getElementById('rules').value;
    if(userInput) {
        maxScore = userInput;
    }
    
    hideDice();
    //global scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    //round scores
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //names reset
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //winners reset
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //active player reset
    document.querySelector('.player-0-panel').classList.remove('active');   //to avoid having an active class twice on the same element
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function resetCheck() {
    sixCheck = [activePlayer, 0];
}