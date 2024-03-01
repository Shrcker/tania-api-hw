var buttonA = document.querySelector('#choiceA');
var buttonB = document.querySelector('#choiceB');
var buttonC = document.querySelector('#choiceC');
var questionForm = document.querySelectorAll('#form');
var submitButton = document.querySelector('#submitBtn');

function submit(event) {
    event.preventDefault();
    var selectedAnswer = document.querySelector('input[name="choices"]:checked');
    console.log(selectedAnswer.value);
    selectedAnswer.checked = false;
}

submitButton.addEventListener("click", submit);