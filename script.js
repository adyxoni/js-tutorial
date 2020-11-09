 //Challenge 1: Your Age in Days

function ageInDays(){
    let yearOfBirth = prompt("In which year were you born?");
    yearOfBirth = parseInt(yearOfBirth);
    let currentYear = 2020;
    let days = (currentYear - yearOfBirth) * 365;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + days + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
} 

 //Challenge 2: Cat Generator 

function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//Challenge 3: Game: Rock Paper Scissors

function rpsGame(userChoice){
    var humanChoice, botChoice;
    humanChoice = userChoice.id;
    botChoice = numberToChoice(randomNumber());
    result = decideWinner(humanChoice, botChoice);
    message = finalMessage(result);
    rpsFrontEnd(userChoice.id, botChoice, message);
}

function randomNumber(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0){
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5){
        return {'message': 'Draw!', 'color': 'yellow'};
    } else{
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    
    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;' >" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

    document.getElementById('flex-box-rps').appendChild(humanDiv)
    document.getElementById('flex-box-rps').appendChild(messageDiv)
    document.getElementById('flex-box-rps').appendChild(botDiv)
}

// Challenge 4: Button color change

var allButtons = document.getElementsByTagName('button')
var copyAllButtons = [];
for(let i = 0; i < allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonPress){
    if(buttonPress.value === 'red') buttonRed();
    else if(buttonPress.value === 'green') buttonGreen();
    else if(buttonPress.value === 'reset') buttonReset();
    else if(buttonPress.value === 'random') buttonRandom();
}

function buttonRed(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonReset(){
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom(){
    //second way
    let choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'];
    let randomize;
    for(let i=0 ; i<allButtons.length; i++){
        //randomize = Math.floor(Math.random() * allButtons.length);
        randomize = Math.floor(Math.random() * choices.length);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        //allButtons[i].classList.add(copyAllButtons[randomize])
        allButtons[i].classList.add(choices[randomize]);
    }
}

//Challenge 5: Blackjack - GAME

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-score', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-score', 'div': '#dealer-box', 'score': 0},
    'cards': ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    'cardsMap': {'A': 10, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',blackjackStand);


function blackjackHit(){
    if(blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomNumber = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomNumber];
}

function showCard(card,activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        hitSound.play();
        cardImage.src = `static/images/${card}.png`;
        cardImage.width = 175;
        cardImage.height = 220;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver'] === true ){
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for(i=0; i < yourImages.length; i++){
            yourImages[i].remove();
        }

        for(i=0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;

        document.querySelector(YOU['scoreSpan']).style.color = '#ffffff';
        document.querySelector(DEALER['scoreSpan']).style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play!";
        document.querySelector('#blackjack-result').style.color= 'black';

        blackjackGame['isStand'] = false;
        blackjackGame['turnsOver'] = false;
    }
}

function updateScore(card, activePlayer){
    activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand(){
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    showResult(computeWinner());
}

function computeWinner(){
    let winner;

    if (YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
            }
        else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
            }
    }
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        winner = DEALER;
        blackjackGame['losses']++;
    }
    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }

    return winner;
}

function showResult(winner){
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true){
       
        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        }
        else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            loseSound.play();
        }
        else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'Tie!';
            messageColor = 'orange';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color= messageColor;
    }
}