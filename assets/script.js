const buttonA = document.querySelector('#choiceA');
const buttonB = document.querySelector('#choiceB');
const buttonC = document.querySelector('#choiceC');
const questionForm = document.querySelectorAll('#form');
const submitButton = document.querySelector('#submitBtn');
const text = document.querySelector('legend');

const answerList = 'abc'.split('');
const savedAnswers = [];
var answerIs = 0; // Index for answerList[]

function submit(event) {
    event.preventDefault();
    var userAnswer = document.querySelector('input[name="choices"]:checked');
    // Returns value of any checked radio
    if (userAnswer.value === answerList[answerIs]) { // Basic If check for if answer is "right"
        text.textContent = 'Correct!';
        savedAnswers.push(userAnswer.value);
        advanceCheck();
    } else if (userAnswer.value !== answerList[answerIs]){
        text.textContent = 'Wrong!';
        savedAnswers.push(userAnswer.value);
        advanceCheck();
    } else { 
        text.textContent = "Please select an answer";
    }
    userAnswer.checked = false;
    console.log(answerList[answerIs]); //debug to monitor which question quiz is on
}

function advanceCheck() { // Advances questions and recognizes when user reaches the end of the quiz
    if (answerIs === answerList.length - 1) {
        answerIs = 0;
        console.log('Quiz has reset');
        } else {
            answerIs++;
        }
}

submitButton.addEventListener("click", submit);