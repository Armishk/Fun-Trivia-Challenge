var questions = [
    { question: "What is the largest continent?", options: ["1. Russia", "2. Antarctica", "3. Asia", "4. China"], answer: "3. Asia" },
    { question: "Who is Simba's dad?", options: ["1. Mufasa", "2. Scar", "3. Pumbaa", "4. Timon"], answer: "1. Mufasa" },
    { question: "What are the primary colors?", options: ["1. Red, green and yellow", "2. Red, yellow and blue", "3. Blue, orange and yellow", "4. Green, blue and yellow"], answer: "2. Red, yellow and blue" },
    { question: "How many sides does a heptagon have?", options: ["1. Five", "2. Six", "3. Seven", "4. Eight"], answer: "3. Seven" },
    { question: "Which is the largest planet in the solar system? ", options: ["1. Saturn", "2. Jupiter", "3. Neptune", "4. Earth"], answer: "2. Jupiter" },
];
var currentQuestionIndex = 0;
var score = 0;
var timer;
var timeLeft = 60;

function startQuiz() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';

    var h1Heading = document.querySelector('h1');
    h1Heading.style.display = 'none';
    var heading = document.querySelector('h2'); 
    heading.style.display = 'none';
    showQuestion();
    startTimer();

    var highscoreLink = document.getElementById("highscore-link");
    if (highscoreLink) {
        highscoreLink.style.display = "none";
    }
}

function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;

    var optionsContainer = document.getElementById('options');
    optionsContainer.textContent = '';

    currentQuestion.options.forEach((option, index) => {
        var button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
        optionsContainer.appendChild(document.createElement('br'));

    });
}

function checkAnswer(userAnswer) {
    var currentQuestion = questions[currentQuestionIndex];
    if (userAnswer === currentQuestion.answer) {
        score++;
        document.getElementById('correctAnsr').textContent = 'Correct!';

    } else {
        timeLeft -= 15; 
        if (timeLeft < 0) {
            timeLeft =0;
        }
        document.getElementById('correctAnsr').textContent = '';
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function startTimer() {
    timer = setInterval(function () {
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        } else {
            timeLeft--;
        }
    }, 1000);
}


function endGame() {
    clearInterval(timer);
    document.getElementById('quiz-container').style.display = 'none';
    // five Qs; 1Q = 20 points
    var finalScore = score * 20; 
    
    alert(`All done!\nYour final score is ${finalScore}.`);
    var initials = prompt('Enter your initials:');
    
    var userData = {
        initials: initials,
        score: finalScore
    };
    
    if (typeof(Storage) !== "undefined") {
        var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        
        highScores.push(userData);
        
        highScores.sort(function(a, b) {
            return b.score - a.score;
        });
        
        localStorage.setItem('highScores', JSON.stringify(highScores));
    } else {
        console.error('Local storage is not supported on this browser.');
    }
    
        window.location.href = 'highscores.html';
}