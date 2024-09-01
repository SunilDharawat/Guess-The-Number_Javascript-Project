// To generate random number
let randomNum = parseInt(Math.random() * 100 + 1);
// console.log(randomNum);


const submit = document.querySelector("#guessbtn");
const userInput = document.querySelector("#guessinput");
const preGuess = document.querySelector("#preGuess");
const remGuess = document.querySelector("#remGuess");
const lowOrhi = document.querySelector(".lowOrhi");
const startOver = document.querySelector(".resultParas");

// create element
const p = document.createElement("p");

// check when play next time
let playGame = true;

// to store preGuesses we used array
let preGuesses = [];
// number of guess 
let numGuess = 1;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        // console.log(guess);
        validateGuess(guess);
    })
}

// validate input 
function validateGuess(guess) {
    if (isNaN(guess)) {
        alert(`Please enter valid number`);
    } else if (guess < 1) {
        alert(`Please enter a number greater than 1`);
    } else if (guess > 100) {
        alert(`Please enter a number less than 100`);
    } else {
        preGuesses.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was: ${randomNum}`);
            endGame();
        } else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }

}

// check guesses 
function checkGuess(guess) {
    if (guess === randomNum) {
        displayGuess(guess);
        displayMessage(`You guessed it right`)
        endGame();
    } else if (guess < randomNum) {
        displayMessage(`Hint: It is Tooo low`);

    } else if (guess > randomNum) {
        displayMessage(`Hint: It is Tooo high`);
    }
}

// display guess 
function displayGuess(guess) {
    userInput.value = '';
    preGuess.innerHTML += ` ${guess} ,`;
    numGuess++;
    remGuess.innerHTML = `${11 - numGuess}`;
}

// display message
function displayMessage(message) {
    lowOrhi.innerHTML = `<h2>${message}</h2>`
}

// end game
function endGame() {
    userInput.value = '';
    userInput.setAttribute("disabled", "");
    p.classList.add("button");
    p.innerHTML = `<span id="newGame">Start new Game</span>`
    startOver.appendChild(p);
    playGame = false
    newGame();
}
// play new game
function newGame() {
    const newGameStart = document.getElementById("newGame");
    newGameStart.addEventListener("click", function () {
        randomNum = parseInt(Math.random() * 100 + 1);
        preGuesses = [];
        numGuess = 1;
        preGuess.innerHTML = '';
        remGuess.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute("disabled");
        startOver.removeChild(p);
        lowOrhi.innerHTML='';
        playGame = true;
    })
}

