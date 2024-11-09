const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q.in whaich year kalapahada invaded odisha? କେଉଁ ବର୍ଷରେ କାଲାପାହାଡା ଓଡିଶା ଉପରେ ଆକ୍ରମଣ କଲା",
        choices: ["1568"
, "1668", "2003", "1999"
],
        answer: "1568"
    },
    {
        question: "Q.The largest district in Odisha in terms of area is:   କ୍ଷେତ୍ର ଦୃଷ୍ଟିରୁ ଓଡିଶାର ସବୁଠାରୁ ବଡ ଜିଲ୍ଲା ହେଉଛି : ",
        choices: ["Mayurbhanj", "Balasore", "Cuttack", "Puri"],
        answer: "Mayurbhanj"
    },
    {
        question: "Q. Which is the first CM of odisha? ଓଡିଶା ର ପ୍ରଥମ ମୁଖ୍ୟମନ୍ତ୍ରୀ ଙ୍କ ନାମ କଣ?",
        choices: ["Mohan Charan Majhi", "Nabin Pattnaik", "Krushna chandra Gajapati", "Anjan kumar Das"],
        answer: "Krushna chandra Gajapati"
    },
    
    {
        question: "Q.The height of Lord Jagannath Temple at Puri from road level is: ସଡକ ସ୍ତରରୁ ପୁରୀରେ ପ୍ରଭୁ ଜଗନ୍ନାଥ ମନ୍ଦିରର ଉଚ୍ଚତା:",
        choices: ["324 ft. 6 inch ", " 220 ft. 8 inch ", "214 ft. 8 inch", " none of these"],
        answer: "214 ft. 8 inch"
    },
{
    
    question: "Q.. Rukuna Rath is the chariot of:ରୁକୁନା ରଥ ହେଉଛି ରଥ:",
    choices: ["Lord Lingaraj", "Loard Jagannath", "lord Shiva", " none of these"],
    answer: "Lord Lingaraj"
}

];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm(" sry Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 10;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});