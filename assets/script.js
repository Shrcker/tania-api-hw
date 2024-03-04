const buttonA = document.querySelector('#choiceA');
const buttonB = document.querySelector('#choiceB');
const buttonC = document.querySelector('#choiceC');
const mainForm = document.querySelector('#mainForm > *');
const radioForm = document.querySelector('.radioForm');
const submitBtn = document.querySelector('#submitBtn');
const legend = document.querySelector('legend');
const ribbon = document.querySelector('#ribbon');
const quizQuestion = document.querySelector('#question');
const scoreBoard = document.querySelector('#score');
const timer = document.querySelector('#timer');
const nameEntryBtn = document.querySelector('#nameEntry');
const nameInput = document.querySelector('#nameInput');
const nameForm = document.querySelector('.nameForm');

const grades = 'ABCDEF'.split('');

var nameList = [];
var scoreList = [];

const answerList = { // Object to contain valid answer values and their associated questions
    prompts: ['Where\'s A?', 'Where\'s B?', 'Where\'s C?'],
    answers: 'abc'.split('') 
}
const savedAnswers = [];
var quizPosition = 0; // Index for answerList[]
ribbon.innerHTML = `Question ${quizPosition + 1}:`; // Initializes Question count
quizQuestion.innerHTML = answerList.prompts[quizPosition];
var scoreCount = 0;

var timeSc = 60;
timer.innerText = `Time remaining: ${timeSc}`;

function submit(event) {
    event.preventDefault();
    var userAnswer = document.querySelector('input[name="choices"]:checked');
    // Returns value of any checked radio
    if (userAnswer.value === answerList.answers[quizPosition]) { // Basic If check for if answer is "right"
        // Correct answers will increase the time on the ticker
        timeSc += 15; 
        legend.innerHTML = 'Correct!';
        scoreCount++;
        savedAnswers.push(userAnswer.value);
        advanceCheck();
    } else if (userAnswer.value !== answerList.answers[quizPosition]) {
        // Wrong answers decrease time left
        timeSc -= 15;
        legend.innerHTML = 'Wrong!';
        savedAnswers.push(userAnswer.value);
        advanceCheck();
    } else { 
        legend.innerHTML = "Please select an answer first";
    }
    userAnswer.checked = false;
    console.log(answerList.answers[quizPosition]); //debug to monitor which question quiz is on
}

function advanceCheck() { // Advances questions and recognizes when user reaches the end of the quiz
    if (quizPosition === answerList.answers.length - 1) {
        quizPosition = 0;
        endGame();
        } else {
            quizPosition++;
            ribbon.innerHTML = `Question ${quizPosition + 1}:`
            quizQuestion.innerHTML = answerList.prompts[quizPosition];
        }
}

function endGame() { // Function to end the game and display the final score
    ribbon.innerText = 'Game Over';
    timer.innerText = '';
    clearInterval(interval);
    if (scoreCount === 3) {
        quizQuestion.innerText = `You got an ${grades[0]}! Score: 3`;
    } else if (scoreCount === 2 || 1) {
        quizQuestion.innerText = `You got a ${grades[1]}! Score: 2`;
    } else {
        quizQuestion.innerText = `You got an ${grades[5]}! \n Score: ${scoreCount}`;
    }
    mainForm.style.display = 'none';
}

function timeSetup () { // Timer ticks down, ending the game prematurely if it ticks to zero
    timeSc--;
    timer.innerText = `Time remaining: ${timeSc}`;
    if(timeSc === 0) {
        endGame();
    }
}

function saveEntry (event) {
    event.preventDefault();
    localStorage.setItem('name', JSON.stringify(nameInput.value));
    localStorage.setItem('score', JSON.stringify(scoreCount));
    quizQuestion.innerText = 'Saved!';
    nameForm.style.display = 'none';
}

var interval = setInterval(timer, 1000);
submitBtn.addEventListener("click", submit);
nameEntryBtn.addEventListener('click', saveEntry);