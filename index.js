const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  // Validate input
  if (isNaN(guess) || guess < 1 || guess > 99) {
    console.log('Invalid guess');
    return;
  }
  attempts++;
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guess${attempts === 1 ? '' : 'es'}`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;

    resetButton.style.display = '';
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }
  }

  // remaining attempts
  const remainingAttempts = maxNumberOfAttempts - attempts;
  numberOfGuessesMessage.style.display = '';
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess${remainingAttempts === 1 ? '' : 'es'} remaining.`;

  // disable input when max attempts are reached
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = '';
    maxGuessesMessage.innerHTML = `You have no guesses remaining.`;
    resetButton.style.display = '';
  }

  guessInput.value = '';
}





// Hide all messages
function hideAllMessages() {
  Array.from(messages).forEach(message => {
    message.style.display = 'none';
  });
}

function setup() {
  targetNumber = getRandomNumber(1, 100);
  console.log(`Target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;
  hideAllMessages();
  resetButton.style.display = 'none';


}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);
setup();

