// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const scoreDiv = document.getElementById("scoreContainer");
const yourName = document.getElementById(".details");
const highsSores= [];

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "Hyper Text Markup Language",
        choiceB : "Hyperlinks and Text Markup Language",
        choiceC : "Home Tool Markup Language",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Creative Style Sheets",
        choiceB : "Cascading Style Sheets",
        choiceC : "Colorful Style Sheets",
        correct : "B"
    },{
        question : "Which property is used to change the background color?",
        choiceA : "color",
        choiceB : "bgc",
        choiceC : "background-color",
        correct : "C"   
    },
    {
        question : "Which property is used to change the left margin of an element?",
        choiceA : "margin-left",
        choiceB : "padding-left",
        choiceC : "indent",
        correct : "A"
    },

    {
        question : "Which jQuery method is used to hide selected elements?",
        choiceA : "visible(false)",
        choiceB : "hide()",
        choiceC : "hidden()",
        correct : "B"
    }

];
// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 10;
const questionTime = 10; // 10s
let TIMER;
let score = 0;

// timer
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='GAME OVER';
    // or...
    alert("You're out of time!");
  }
}, 1000);

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
start.addEventListener("click",startQuiz);
// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}
// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}
// answer is correct
function answerIsCorrect(){
    confirm("That's Correct");
}
// answer is Wrong
function answerIsWrong(){
    confirm("Sorry, that's incorrect");
}
// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}


