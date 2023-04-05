// define all questions and answers
// define variable for tracking
    // track time
    // track questions

// create variables to reference DOM elements
    // timer
    // questions
    // start button
    // name/initials
    // save button
    // high scores container

// function
    // start quiz
        // hide start button after start
        // start timer
        // display countdown on screen

// function
    // rendering a question
        // clear/remove previous question
        // getting first question
        // add question to the container
        // make button for each answer
        // add answers to the answers container

// function
    // handle quiz completion
        // stop timer
        // hide quiz container
        // show end screen
        // show time remaining as score

// function
    // handle answer clicks

    // if answer is wrong
        // subtract time from timer
        // make sure the timer is displayed correctly on page
        // flash wrong answer message (setTimeout)
        
    // update question variable to next question
    // display question on page

    // if the question is the last question
        // trigger quiz completion
        
// function
    // tracking time
        // subtract time
        // update the page

    // if timer hits zero
        // trigger quiz completion

// function
    // saving high scores
        // get value of user input (name/initials)
        // validate input
        // retrieve existing data from local storage
        // update the high score data
        // save updated data back to local storage
        // redirect to start screen after save

// function
    // listening for key press
        // check if the key pressed was "Enter" for saving scores
        // Optional: check if the key pressed was "a", "b", "c" for answers

// event listeners
    // click start
    // click answers
    // click save score
    // keyups


// quiz questions
var questions = [
    {
        question: "What plant does tea come from? 🌱",
        possibleAnswers: [
            "Camellia japonica",
            "Artemisia vulgaris",
            "Zingiber officinale",
        ],
        correctAnswer: "Camellia sinensis",
    },
    {
        question: "What type of tea is fermented? 🍃",
        possibleAnswers: [
            "Oolong",
            "Green",
            "White",
        ],
        correctAnswer: "Pu-er(h)",
    },
    {
        question: "Where did bubble tea originate? 🧋",
        possibleAnswers: [
            "Hong Kong",
            "Singapore",
            "Malaysia",
        ],
        correctAnswer: "Taiwan",
    },
    {
        question: "What tea is used in a Japanese tea ceremony? 🍵",
        possibleAnswers: [
            "Hojicha",
            "Genmaicha",
            "Mecha",
        ],
        correctAnswer: "Matcha",
    },
    {
        question: "What type of tea is partially oxidized? ☕",
        possibleAnswers: [
            "Genmaicha",
            "Hojicha",
            "Lapsang souchong",
        ],
        correctAnswer: "Oolong",
    },
    {
        question: "What type of tea is smoked? 🌫️☁️",
        possibleAnswers: [
            "Keemun",
            "Bancha",
            "Oolong",
        ],
        correctAnswer: "Lapsang souchong",
    },
    {
        question: "What type of tea is roasted? ☕",
        possibleAnswers: [
            "Kukicha",
            "Gyokuro",
            "Kabusecha",
        ],
        correctAnswer: "Hojicha",
    },
    {
        question: "What is a tisane? 🥤🧉",
        possibleAnswers: [
            "Assam tea",
            "Butter tea",
            "Jasmine tea",
        ],
        correctAnswer: "An herbal infusion",
    },
    {
        question: "According to legend, who first discovered tea? ✨",
        possibleAnswers: [
            "Qin Shi Huang",
            "Liu Bei",
            "Zhuge Liang",
        ],
        correctAnswer: "Shen Nong",
    },
    {
        question: "Where did Rooibos tea originate?",
        possibleAnswers: [
            "Nigeria",
            "Morocco",
            "Tunisia",
        ],
        correctAnswer: "South Africa",
    },
]

var timerEl = document.querySelector("#time-left");
var startScreen = document.querySelector("#start-screen");
var startGameEl = document.querySelector("#start-game");
var quizScreen = document.querySelector("#quiz-screen");
var questionContent = document.querySelector("#question-content");
var answerContent = document.querySelectorAll(".answer-option");
var answerOptionA = document.querySelector("#answer-option-a");
var answerOptionB = document.querySelector("#answer-option-b");
var answerOptionC = document.querySelector("#answer-option-c");
var answerOptionD = document.querySelector("#answer-option-d");
var answerMessage = document.querySelector("#answer-message");
var endScreen = document.querySelector("#end-screen");
var submitBtn = document.querySelector("#submit-btn");
var finalScoreEl = document.querySelector("#final-score");
var scoresScreen = document.querySelector("#scores-screen");
var scoresFormEl = document.querySelector("#scores-form");
var scoresListEl = document.querySelector("#scores-list");
var initialsInput = document.querySelector("#initials-input");
var highScoresEl = document.querySelector("#high-scores");
var backBtn = document.querySelector("#back-btn");
var resetScoreEl = document.querySelector("#reset-score");
var isPlaying = false;
var currentQuestionIndex = 0;
var timeRemaining;
var finalTime;
var quizTime;
var scoresArr; 

// localStorage
var savedScores = localStorage.getItem("saved-scores");
if(savedScores === null){
    scoresArr = [];
}else{
    scoresArr = JSON.parse(savedScores);
}


// countdown timer
function quizTimer(playTime){
    timeRemaining = playTime;

    quizTime = setInterval(function(){
        timeRemaining--;
        timerEl.textContent = timeRemaining;

        if (timeRemaining <= 0){
            // if time runs out, go to end screen
            goEndScreen();
        }

    }, 1000);
}

// shows start screen and hides other screens
function startQuiz(){
    startScreen.classList.remove("hidden");
    quizScreen.classList.add("hidden");
    scoresScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
}

// start quiz when button is clicked
function playQuiz(){

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    scoresScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    
    // initial time set for quiz
    quizTimer(60);
    timerEl.textContent = timeRemaining;
    answerMessage.textContent = ""
    currentQuestionIndex = 0;
    nextQuestion();
}


function nextQuestion(){
    var newAnswerArr = [];
    
    // push possible answers to new array newAnswerArray to randomly shuffle correct answer placement
    for (var i = 0; i < questions[currentQuestionIndex].possibleAnswers.length; i++) {
        newAnswerArr.push(questions[currentQuestionIndex].possibleAnswers[i]);
    }
    newAnswerArr.push(questions[currentQuestionIndex].correctAnswer);
    
    shuffleAnswerArray(newAnswerArr);
    
    // will place the shuffled array elements in the four button options
    questionContent.textContent = questions[currentQuestionIndex].question;
    answerOptionA.textContent = newAnswerArr[0];
    answerOptionB.textContent = newAnswerArr[1];
    answerOptionC.textContent = newAnswerArr[2];
    answerOptionD.textContent = newAnswerArr[3];

}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// JavaScript implementation of the Durstenfeld shuffle, an optimized version of Fisher-Yates
// this takes newAnswerArr as a parameter
// it shuffles the values in the array
function shuffleAnswerArray(newAnswerArr) {
    for (var i = newAnswerArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempArray = newAnswerArr[i];
        newAnswerArr[i] = newAnswerArr[j];
        newAnswerArr[j] = tempArray;
    }
}

// to submit initials and score for the scores screen
function handleFormSubmit(event){
    // prevent the default behavior
    event.preventDefault();

    // if no value input will exit function without submitting
    // aka submit button will not work until value added
    if(initialsInput.value === ""){
        return;
    }

    var scoreObj = {
        initials: initialsInput.value,
        score: finalTime,
    };
  
    scoresArr.push(scoreObj);  

    // compares two scores to sort by higher score
    scoresArr.sort(function(a, b){
        if(a.score === b.score){
            return 0;
        }
        if(a.score > b.score){
            return -1;
        }
        if(a.score < b.score){
            return 1;
        }
    });

    // localStorage
    localStorage.setItem("saved-scores", JSON.stringify(scoresArr));

    goScoreScreen();
}

// takes in an array and and prints to screen
function renderScoresToList(scores){
    scoresListEl.innerHTML = "";

    for (var i = 0; i < scores.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = scores[i].initials + " " + scores[i].score;
        scoresListEl.append(listItem);
    }
    
}

// goes to score screen
function goScoreScreen(){
    startScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    scoresScreen.classList.remove("hidden");
    endScreen.classList.add("hidden");

    renderScoresToList(scoresArr);
}

// shows end screen
function goEndScreen(){
    startScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    scoresScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");

    clearInterval(quizTime);

    if(timeRemaining < 0){
        finalTime = 0;
    }else{
        finalTime = timeRemaining;
    }

    finalScoreEl.textContent = finalTime;
}

// starts game if start button is clicked
startGameEl.addEventListener("click", function(){
    playQuiz();
})

// if answer option a = correct answer display message "Correct!"
// else display message "Wrong!"
// advance to next question
answerOptionA.addEventListener("click", function(){
    if(answerOptionA.textContent === questions[currentQuestionIndex].correctAnswer){
        answerMessage.textContent = "Correct!";
        timeRemaining = timeRemaining + 10;
    }else{
        answerMessage.textContent = "Wrong!";
        timeRemaining = timeRemaining - 10;
    }
    currentQuestionIndex++;

    // if answer all questions go to end screen
    if(currentQuestionIndex === questions.length){
        goEndScreen();
    }else{
        nextQuestion(questions[currentQuestionIndex]);
    }
});

// if answer option b = correct answer display message "Correct!"
// else display message "Wrong!"
// advance to next question
answerOptionB.addEventListener("click", function(){
    if(answerOptionB.textContent === questions[currentQuestionIndex].correctAnswer){
        answerMessage.textContent = "Correct!";
        timeRemaining = timeRemaining + 10;
    }else{
        answerMessage.textContent = "Wrong!";
        timeRemaining = timeRemaining - 10;
    }
    currentQuestionIndex++;

    // if answer all questions go to end screen
    if(currentQuestionIndex === questions.length){
       goEndScreen(); 
    }else{
    nextQuestion(questions[currentQuestionIndex]);
    }
});

// if answer option c = correct answer display message "Correct!"
// else display message "Wrong!"
// advance to next question
answerOptionC.addEventListener("click", function(){
    if(answerOptionC.textContent === questions[currentQuestionIndex].correctAnswer){
        answerMessage.textContent = "Correct!";
        timeRemaining = timeRemaining + 10;
    }else{
        answerMessage.textContent = "Wrong!";
        timeRemaining = timeRemaining - 10;
    }
    currentQuestionIndex++;

    // if answer all questions go to end screen
    if(currentQuestionIndex === questions.length){
        goEndScreen();
    }else{
    nextQuestion(questions[currentQuestionIndex]);
    }
});

// if answer option d = correct answer display message "Correct!"
// else display message "Wrong!"
// advance to next question
answerOptionD.addEventListener("click", function(){
    if(answerOptionD.textContent === questions[currentQuestionIndex].correctAnswer){
        answerMessage.textContent = "Correct!";
        timeRemaining = timeRemaining + 10;
    }else{
        answerMessage.textContent = "Wrong!";
        timeRemaining = timeRemaining - 10;
    }
    currentQuestionIndex++;

    // if answer all questions go to end screen
    if(currentQuestionIndex === questions.length){
        goEndScreen();
    }else{
    nextQuestion(questions[currentQuestionIndex]);
    }
});

// submit button when clicked adds initials and scores to score screen
submitBtn.addEventListener("click", handleFormSubmit);

// goes to scores screen when button clicked
highScoresEl.addEventListener("click", goScoreScreen);  

// goes to start screen when button clicked
backBtn.addEventListener("click", startQuiz);

// if reset scores clicked, resets scores in localStorage
resetScoreEl.addEventListener("click", function(){
    localStorage.removeItem("saved-scores");
    scoresArr = [];
    renderScoresToList(scoresArr);
});