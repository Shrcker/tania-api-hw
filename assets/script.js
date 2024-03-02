const buttonA = document.querySelector('#choiceA');
const buttonB = document.querySelector('#choiceB');
const buttonC = document.querySelector('#choiceC');
const questionForm = document.querySelectorAll('#form');
const submitButton = document.querySelector('#submitBtn');
const legendText = document.querySelector('legend');
const questionLabel = document.querySelector('#ribbon');
const quizQuestion = document.querySelector('#question');
const scoreBoard = document.querySelector('#score');


const answerList = { // Object to contain valid answer values and their associated questions
    prompts: ['Where\'s A?', 'Where\'s B?', 'Where\'s C?'],
    answers: 'abc'.split('') 
}
const savedAnswers = [];
var quizPosition = 0; // Index for answerList[]
questionLabel.innerHTML = `Question ${quizPosition + 1}:`; // Initializes Question count
quizQuestion.innerHTML = answerList.prompts[quizPosition];
var scoreCount = 0;
scoreBoard.innerText = `Score: ${scoreCount}`;

function submit(event) {
    event.preventDefault();
    var userAnswer = document.querySelector('input[name="choices"]:checked');
    // Returns value of any checked radio
    if (userAnswer.value === answerList.answers[quizPosition]) { // Basic If check for if answer is "right"
        legendText.innerHTML = 'Correct!';
        scoreCount++;
        scoreBoard.innerText = `Score: ${scoreCount}`;
        savedAnswers.push(userAnswer.value);
        advanceCheck();
    } else if (userAnswer.value !== answerList.answers[quizPosition]) {
        legendText.innerHTML = 'Wrong!';
        scoreCount--;
        scoreBoard.innerText = `Score: ${scoreCount}`;
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
        console.log('Quiz has reset');
        questionLabel.innerHTML = `Question ${quizPosition + 1}:` // Question label will update with quiz position
        quizQuestion.innerHTML = answerList.prompts[quizPosition];
        } else {
            quizPosition++;
            questionLabel.innerHTML = `Question ${quizPosition + 1}:`
            quizQuestion.innerHTML = answerList.prompts[quizPosition];
        }
}

submitButton.addEventListener("click", submit);