const buttonA = document.querySelector('#choiceA');
const buttonB = document.querySelector('#choiceB');
const buttonC = document.querySelector('#choiceC');
const questionForm = document.querySelector('#mainForm > *');
const radioForm = document.querySelector('#form');
const submitButton = document.querySelector('#submitBtn');
const legendText = document.querySelector('legend');
const questionLabel = document.querySelector('#ribbon');
const quizQuestion = document.querySelector('#question');
const scoreBoard = document.querySelector('#score');
const timeClock = document.querySelector('#timer');

const grades = 'ABCDEF'.split('');

const answerList = { // Object to contain valid answer values and their associated questions
    prompts: ['Where\'s A?', 'Where\'s B?', 'Where\'s C?'],
    answers: 'abc'.split('') 
}
const savedAnswers = [];
var quizPosition = 0; // Index for answerList[]
questionLabel.innerHTML = `Question ${quizPosition + 1}:`; // Initializes Question count
quizQuestion.innerHTML = answerList.prompts[quizPosition];
var scoreCount = 0;

var timeSet = 60;
timeClock.innerText = `Time remaining: ${timeSet}`;

function submit(event) {
    event.preventDefault();
    var userAnswer = document.querySelector('input[name="choices"]:checked');
    // Returns value of any checked radio
    if (userAnswer.value === answerList.answers[quizPosition]) { // Basic If check for if answer is "right"
        // Correct answers will increase the time on the ticker
        timeSet += 15; 
        legendText.innerHTML = 'Correct!';
        scoreCount++;
        savedAnswers.push(userAnswer.value);
        advanceCheck();
    } else if (userAnswer.value !== answerList.answers[quizPosition]) {
        // Wrong answers decrease time left
        timeSet -= 15;
        legendText.innerHTML = 'Wrong!';
        savedAnswers.push(userAnswer.value);
        advanceCheck();
    } else { 
        legendText.innerHTML = "Please select an answer first";
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
            questionLabel.innerHTML = `Question ${quizPosition + 1}:`
            quizQuestion.innerHTML = answerList.prompts[quizPosition];
        }
}

function endGame() { // Function to end the game and display the final score
    questionLabel.innerText = 'Game Over';
    timeClock.innerText = '';
    clearInterval(interval);
    if (scoreCount === 3) {
        quizQuestion.innerText = `You got an ${grades[0]}!`;
    } else if (scoreCount === 2) {
        quizQuestion.innerText = `You got a ${grades[1]}!`;
    } else {
        quizQuestion.innerText = `You got an ${grades[5]}!`;
    }
    questionForm.style.display = 'none';
}

function timer () { // Timer ticks down, ending the game prematurely if it ticks to zero
    timeSet--;
    timeClock.innerText = `Time remaining: ${timeSet}`;
    if(timeSet === 0) {
        endGame();
    }
}

var interval = setInterval(timer, 1000);
submitButton.addEventListener("click", submit);