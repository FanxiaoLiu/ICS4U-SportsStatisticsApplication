// console.log(teams.Name);

async function initializeScores() {

    if (localStorage.getItem("hasCodeRunBefore") != 'true') {
        await fetch("../data/scores.json")
        .then(iScores => {
            return iScores.json();
        })
        .then(data => {
            localStorage.setItem('scores', JSON.stringify(data));
        });
        console.log(localStorage.getItem('scores'));
    }

    if (localStorage.getItem("hasCodeRunBefore") != 'true') {
        await fetch("../data/teams.json")
        .then(mockResponses => {
            return mockResponses.json();
        })
        .then(data => {
            localStorage.setItem('testObject', JSON.stringify(data));
        });
        console.log(localStorage.getItem('testObject'));
    }

    if (localStorage.getItem("hasCodeRunBefore") != 'true') {
        localStorage.setItem("hasCodeRunBefore", 'true');
    }

    let teams = localStorage.getItem('testObject');

    teams = JSON.parse(teams);

    for (let i = 0; i < teams.Teams.length; i++) {
        let litem = document.createElement('option');
        litem.textContent = teams.Teams[i].Name;
        litem.value = teams.Teams[i].Name;
        litem.setAttribute('id', 'awayteam' + i);
        const formAway = document.getElementById('exampleFormControlSelect1');
        formAway.appendChild(litem);
    }

    for (let i = 0; i < teams.Teams.length; i++) {
        let litem = document.createElement('option');
        litem.textContent = teams.Teams[i].Name;
        litem.setAttribute('id', 'hometeam' + i);
        const formHome = document.getElementById('exampleFormControlSelect2');
        formHome.appendChild(litem);
    }

    updateStats();
}

function submitScores() {
    let awayScore = document.querySelector('#exampleFormControlInput2').value;
    let homeScore = document.querySelector('#exampleFormControlInput1').value;

    let awayTeam = document.querySelector('#exampleFormControlSelect2').value;
    let homeTeam = document.querySelector('#exampleFormControlSelect1').value;

    let date = document.querySelector('#exampleFormControlInput3').value;
    console.log(date);

    let scoreObjects = JSON.parse(localStorage.getItem('scores'));

    let newID = (parseInt(scoreObjects.Scores[scoreObjects.Scores.length-1].id) + 1) + '';

    console.log(newID);

    // console.log(scoreObjects);

    var newScore = {"id":newID,"HomeTeam": homeTeam,"AwayTeam":awayTeam,"HomePoints":homeScore,"AwayPoints":awayScore, "Date":date};

    scoreObjects.Scores.push(newScore);

    console.log(scoreObjects);

    localStorage.setItem('scores', JSON.stringify(scoreObjects));

    console.log(localStorage.getItem('scores'));

    updateStats();
}

function resetAll() {
    localStorage.removeItem('scores');
    localStorage.removeItem('testObject');
    localStorage.setItem('hasCodeRunBefore', 'null');
    console.log("done");
}

function greaterDate(a,b) {
    let hi = null;
    let object = JSON.parse(localStorage.getItem('scores'));
    if (Date.parse(object.Scores[a].Date) > Date.parse(object.Scores[b].Date))
        hi = true;
    else
        hi = false;

    console.log(hi);
    return hi;

}

function updateStats() {
    let temp = JSON.parse(localStorage.getItem('scores'));
    let teams = JSON.parse(localStorage.getItem('testObject'));

    console.log(temp);

    for (let i = 0; i < teams.Teams.length; i++) {
        teams.Teams[i].Wins = 0;
        teams.Teams[i].Losses = 0;
        
    }
    
    for (let i = 0; i < temp.Scores.length; i++) {
        let homeWin = null;
        if (parseInt(temp.Scores[i].AwayPoints) > parseInt(temp.Scores[i].HomePoints)) {
            homeWin = false;
        }
        else {
            homeWin = true;
        }
    
        for (let j = 0; j < teams.Teams.length; j++) {
            if (teams.Teams[j].Name == temp.Scores[i].HomeTeam) {
                if (homeWin) {
                    teams.Teams[j].Wins++;
                }
                else if (!homeWin) {
                    teams.Teams[j].Losses++;
                }
            }
    
            if (teams.Teams[j].Name == temp.Scores[i].AwayTeam) {
                if (homeWin) {
                    teams.Teams[j].Losses++;
                }
                else if (!homeWin) {
                    teams.Teams[j].Wins++;
                }
            }
        }
    }
    
    localStorage.setItem('testObject', JSON.stringify(teams));

    console.log(teams);
}