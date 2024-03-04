// Initializing all API selectors
const radioForm = document.querySelector('.radioForm');
const submitBtn = document.querySelector('#submitBtn');
const legend = document.querySelector('legend');
const ribbon = document.querySelector('#ribbon');
const quizQuestion = document.querySelector('#question');
const timer = document.querySelector('#timer');
const nameSubmit = document.querySelector('#nameSubmit');
const nameInput = document.querySelector('#nameInput');
const nameForm = document.querySelector('.nameForm');
const startBtn = document.querySelector('#startBtn');
const restart = document.querySelector('.restart');
const restartBtn = document.querySelector('#restartBtn');
const choiceA = document.querySelector('#choiceA');
const choiceB = document.querySelector('#choiceB');
const choiceC = document.querySelector('#choiceC');
const choiceD = document.querySelector('#choiceD');

var timeInterval; // declaring valueless variable so that timer can't start prematurely
var scoreCount = 0;

const grades = 'ABCDEF'.split('');

const answerList = { // Object to contain valid answer values and their associated questions, shares index
    prompts: ['Where\'s A?', 'Where\'s B?', 'Where\'s C?'],
    correctAns: 'acc'.split(''),
    possibleA: ['Here', 'There', 'Everywhere'],
    possibleB: ['There', 'Kansas', 'Missouri'],
    possibleC: ['Florida', 'Top of Appalachia', 'Japan'],
    possibleD: ['The Moon', 'The Mouse has it', 'The Wizard']
}
var quizPosition = 0; // Index for answerList[]
var timeSc = 60;


function submit(event) {
    event.preventDefault();
    var userAnswer = document.querySelector('input[name="choices"]:checked');
    // Returns value of any checked radio
    if (userAnswer.value === answerList.correctAns[quizPosition]) { // Basic If check for if answer is "right"
        // Correct correctAns will increase the time on the ticker
        timeSc += 15; 
        legend.innerHTML = 'Correct!';
        scoreCount++;
        advanceCheck();
    } else if (userAnswer.value !== answerList.correctAns[quizPosition]) {
        // Wrong correctAns decrease time left
        timeSc -= 15;
        legend.innerHTML = 'Wrong!';
        advanceCheck();
    } else { 
        legend.innerHTML = "Please select an answer first";
    }
    userAnswer.checked = false;
    console.log(answerList.correctAns[quizPosition]); //debug to monitor which question quiz is on
}

function advanceCheck() { // Advances questions and recognizes when user reaches the end of the quiz
    if (quizPosition === answerList.correctAns.length - 1) {
        quizPosition = 0;
        endGame();
    } else { // If game is not over, it will flip through the answers array, simulating a progressing quiz
        quizPosition++;
        ribbon.innerHTML = `Question ${quizPosition + 1}:`
        quizQuestion.innerHTML = answerList.prompts[quizPosition];
        choiceA.innerHTML = answerList.possibleA[quizPosition];
        choiceB.innerHTML = answerList.possibleB[quizPosition];
        choiceC.innerHTML = answerList.possibleC[quizPosition];
        choiceD.innerHTML = answerList.possibleD[quizPosition];
    }
}

function endGame() { // Function to end the game and display the final score
    ribbon.innerText = 'Game Over';
    timer.innerText = '';
    radioForm.style.display = 'none';
    nameForm.style.display = 'block';
    restart.style.display = 'block';
    restartBtn.style.display = 'block';
    clearInterval(timeInterval);
    if (scoreCount === 3) {
        quizQuestion.innerText = `You got an ${grades[0]}! Score: 3`;
    } else if (scoreCount === (2 || 1)) {
        quizQuestion.innerText = `You got a ${grades[1]}! Score: 2`;
    } else {
        quizQuestion.innerText = `You got an ${grades[5]}! \n Score: ${scoreCount}`;
    }
}

function timeSetup () { // Timer ticks down, ending the game prematurely if it ticks to zero
    timeSc = 60; // Initalized total time just in case of potential errors
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

function startQuiz (event) { // Initalize the start of the quiz
    event.preventDefault();
    scoreCount = 0; // Score is reset every restart
    ribbon.innerHTML = `Question ${quizPosition + 1}:`;
    quizQuestion.innerHTML = answerList.prompts[quizPosition];
    choiceA.innerHTML = answerList.possibleA[quizPosition];
    choiceB.innerHTML = answerList.possibleB[quizPosition];
    choiceC.innerHTML = answerList.possibleC[quizPosition];
    choiceD.innerHTML = answerList.possibleD[quizPosition];
    timer.innerText = `Time remaining: ${timeSc}`;
    radioForm.style.display = 'block';
    startBtn.style.display = 'none';

    timeInterval = setInterval(timeSetup, 1000);
}

function welcomeScreen () {
    ribbon.innerHTML = 'Welcome to the Coding Quiz!<br>Please press start to continue.';
    quizQuestion.innerHTML = 'You will have 60 seconds to answer each question, but correct correctAns will increase your time!';
    startBtn.style.display = 'block';
    radioForm.style.display = 'none';
    nameForm.style.display = 'none';
    restart.style.display = 'none';
    restartBtn.style.display = 'none';
    timer.innerHTML = '';
}

submitBtn.addEventListener('click', submit);
nameSubmit.addEventListener('click', saveEntry);
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', welcomeScreen);
welcomeScreen(); // Quiz always starts at its landing page