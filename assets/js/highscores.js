var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var highscoreList = document.getElementById('highscore-list');

highScores.forEach(function(scoreData) {
    var listItem = document.createElement('li');
    listItem.textContent = `${scoreData.initials}: ${scoreData.score}`;
    highscoreList.appendChild(listItem);
});

// goes back to start page 
function goBack() {
    window.location.href = "./index.html";
}

// clears storage 
function clrScores() {
    localStorage.removeItem('highScores');
    location.reload();
}

