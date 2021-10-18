const composers = [
    'BIZET', 
    'MOZART', 
    'SHAW', 
    'VIVALDI', 
    'STROZZI', 
    'SCHUMANN', 
    'BRAHAMS', 
    'CHOPIN'
];

let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessed =[];
let wordStatus = null;

let randomWord = () => {
    answer = composers[Math.floor(Math.random()*composers.length)];
    console.log(answer);
}

let generateButtons = () => {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
        <button
            class="btn btn-lg btn-success m-1"
            id='` + letter + `'
            onClick ="handleGuess('` +letter+ `')"
            >
            `+ letter +`
            </button>
            `).join(' ');

        document.getElementById('keyboard').innerHTML = buttonsHTML;
}

let handleGuess = (guessedLetter) => {
    guessed.indexOf(guessedLetter) === -1 ? guessed.push(guessedLetter) : null;
    document.getElementById(guessedLetter).setAttribute('disabled', true);

    if (answer.indexOf(guessedLetter)>= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(guessedLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    };
}

let updateHangmanPicture = () =>{
    document.getElementById('hangmanPic').src = 'resources/'+mistakes+'.png';
}

let checkIfGameWon = () => {
    if(wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = 'Congrats, you won!'
        document.getElementById('hangmanPic').src = "resources2/fireworks.png";
    };
 
}

let checkIfGameLost = () => {
    if(mistakes === maxWrong) {
        document.getElementById('keyboard').innerHTML = 'You lost'
        document.getElementById('wordSpotlight').innerHTML = 'The answer was ' + answer;
    }
}

let guessedWord = () => {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_ ")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

const updateMistakes = () => {
    document.getElementById('mistakes').innerHTML = mistakes;
}

let reset = () => {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = 'resources/1.png';

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}


document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();