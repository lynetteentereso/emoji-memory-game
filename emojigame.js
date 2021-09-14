let mainEmojis = ['laughing', 'inlove', 'shocked', 'sad', 'wink', 'surprised', 'happy', 'smile'];
let emojiArray = [];
let playerArray = [];
let difficulty = 3;
let score = 0;
let gameContainer = document.querySelector('.game-container');
let buttonsContainer = document.querySelector('.buttons-container');
let playerContainer = document.querySelector('.player-sequence-container');
let emojiContainer = document.querySelector('.emoji-sequence-container')
let newGame = document.getElementById('newgame-btn');
let gameInstructions = document.getElementById('instructions-btn');
let gameSettings = document.getElementById('settings-btn');
let allScoresContainer = document.querySelector('.score-container');
let scoreContainer = document.querySelector('.score');
let highScoreContainer = document.querySelector('.highscore');
let instructions = document.querySelector('.instructions');
let settings = document.querySelector('.settings');
let emojiCarousel = document.getElementById('emoji-carousel');
let playerInput = document.getElementById('player-carousel');
let emojiCounter = document.getElementById('emoji-counter');
let easyButton = document.getElementById('easy-btn');
let mediumButton = document.getElementById('medium-btn');
let hardButton = document.getElementById('hard-btn');
let checkButton = document.getElementById('check-btn');
let onButton = document.getElementById('on-btn');
let offButton = document.getElementById('off-btn');
let myMusic = document.getElementById('music');
let banner = document.getElementById('banner');
easyButton.style.borderColor = 'yellow';
offButton.style.borderColor = 'yellow';


//Function to create emoji buttons and add user input to playerArray[]

mainEmojis.forEach(emoji => {
    let emojiButton = document.createElement('img');
    emojiButton.setAttribute('src', `img/${emoji}.png`);
    emojiButton.alt = `${emoji} emoji image`
    emojiButton.classList.add('emojiButton');

    emojiButton.addEventListener('click', () => {
        playerArray.push(emoji);
        playerArrayImage();
    });

    buttonsContainer.appendChild(emojiButton);
});

let userIndex = 0;
function playerArrayImage() { 
    emojiContainer.style.display = 'none';
    playerContainer.style.visibility = 'visible';
    playerInput.style.display = 'block';
    banner.style.display = 'none';
    playerInput.src = `img/${playerArray[userIndex]}.png`;
    playerInput.alt = `${playerArray[userIndex]} emoji image`
    userIndex++;  
    
    if(playerArray.length>emojiArray.length){
        playerInput.src = 'img/blank.png';
        for (i=playerArray.length; i>emojiArray.length; i--){
            playerArray.pop();
         }        
    }       
}

// Function to generate random emojis and push to emojiArray[] based on difficulty level

function emojiSequence(){
    for (i=0; i<=difficulty; i++){
        let randomIndex = Math.floor(Math.random() * 8);   
        emojiArray.push(mainEmojis[randomIndex]);        
    }      
}

//Functions to display the emoji sequence when player starts a new game

function startNewGame (){     
    restartGame();
    emojiSequence();
    emojiArrayImage();

    buttonsContainer.style.display = 'none';
    banner.style.display = 'none';
    allScoresContainer.style.visibility= 'visible';
    document.querySelector('.instructions').style.display = 'none';
    document.querySelector('.settings').style.display = 'none';
    emojiCarousel.style.display = 'block';
    emojiCounter.style.display = 'block';
    playerInput.src = 'img/blank.png';
    userIndex=0;
    counter=0;  
    interval = setInterval(emojiArrayImage, 2000);   
}

let counter = 0;

function emojiArrayImage() {   
    
    emojiCarousel.src = `img/${emojiArray[counter]}.png`;
    emojiCarousel.alt = `${emojiArray[counter]} emoji image`
    emojiCounter.innerText = counter+1;
    counter++;

    if(counter > emojiArray.length ){
        clearInterval(interval);
        checkButton.style.visibility =  'visible';
        buttonsContainer.style.display = 'block';
        emojiCarousel.src = '';
        emojiCarousel.style.display = 'none';
        emojiCounter.innerText = '';
        counter = 0;
    }        
} 

//Function to evaluate player's answer and add score if correct, and update high score

const myScore = document.createElement('p');
myScore.textContent = `Score: ${score}`;
myScore.style.top = '5%';
myScore.style.color = '#fff';
scoreContainer.appendChild(myScore);

function checkAnswer(){
    checkButton.style.visibility =  'hidden';
    let areEqual = emojiArray.length == playerArray.length && emojiArray.every(function(element, index) {
        return element === playerArray[index]; 
    });
    
    if(areEqual == true && difficulty == 3){
        alert('Well Done! Your memory is IMPRESSIVE!');
        score+=5
        myScore.textContent = `Score: ${score}`;

    } else if (areEqual == true && difficulty == 5){
        alert('Well Done! Your memory is IMPRESSIVE!');
        score+=10;
        myScore.textContent = `Score: ${score}`;

    } else if (areEqual == true && difficulty == 7){
        alert('Well Done! Your memory is IMPRESSIVE!');
        score+=20;
        myScore.textContent = `Score: ${score}`;

    } else {
        alert('Wrong answer. Better luck next round!');
    } 

    if (score > localStorage.getItem('highscore')) {
        localStorage.setItem('highscore', score);  
        highestScore.textContent = 'Highest Score: ' + localStorage.getItem('highscore');    
    }  
}


let highestScore = document.createElement('p');
highestScore.textContent = 'Highest Score: ' + localStorage.getItem('highscore');
highestScore.style.color = '#fff';
highScoreContainer.appendChild(highestScore); 

//Function to restart game

function restartGame(){
    userIndex=0;
    counter=0; 
    
    for (i=emojiArray.length; i>=0; i--){
        emojiArray.pop();
        playerArray.pop();
    }    
}

// All button functions

newGame.addEventListener('click', () => {
    
    emojiContainer.style.display = 'block'
    settings.classList.remove('active');
    playerInput.classList.add('active');
    playerContainer.classList.add('active');
    startNewGame()
});

function loadInstructions(){
    document.querySelector('.instructions').style.display = 'block';
    document.querySelector('.emoji-sequence-container').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'none';
    document.querySelector('.settings').style.display = 'none';
    banner.style.display = 'none';
    playerInput.style.display = 'none';
    allScoresContainer.style.visibility= 'hidden';
    instructions.classList.add('active');

}
gameInstructions.addEventListener('click', loadInstructions);

function loadSettings(){
    document.querySelector('.settings').style.display = 'block';
    document.querySelector('.emoji-sequence-container').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'none';
    document.querySelector('.instructions').style.display = 'none';
    allScoresContainer.style.visibility= 'hidden';
    settings.classList.add('active');
    playerInput.classList.remove('active');
    instructions.classList.remove('active');
    banner.style.display = 'none';

}
gameSettings.addEventListener('click', loadSettings);

checkButton.addEventListener('click', checkAnswer);

easyButton.addEventListener('click', () => {
    difficulty = 3;
    easyButton.style.borderColor = 'yellow';
    mediumButton.style.borderColor = 'black';
    hardButton.style.borderColor = 'black';
});

mediumButton.addEventListener('click', () => {
    difficulty = 5;
    mediumButton.style.borderColor = 'yellow';
    easyButton.style.borderColor = 'black';
    hardButton.style.borderColor = 'black';
});

hardButton.addEventListener('click', () => {
    difficulty = 7;
    hardButton.style.borderColor = 'yellow';
    easyButton.style.borderColor = 'black';
    mediumButton.style.borderColor = 'black';
});

onButton.addEventListener('click', () => {
    myMusic.play();
    onButton.style.borderColor = 'yellow';
    offButton.style.borderColor = 'black';
});

offButton.addEventListener('click', () => {
    myMusic.pause();
    offButton.style.borderColor = 'yellow';
    onButton.style.borderColor = 'black';
});