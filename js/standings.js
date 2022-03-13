async function initialize() {
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

    updateStats();

    let teams = JSON.parse(localStorage.getItem('testObject'));

    let sortedTeams = teams.Teams.sort((a,b) => (a.Name > b.Name) ? 1 : (b.Name > a.Name) ? -1 : 0);

    console.log(sortedTeams);

    valuesintoTable(sortedTeams);
}

function sortbyWins() {
    resetPage();

    let teams = JSON.parse(localStorage.getItem('testObject'));

    let sortedTeams = teams.Teams.sort((a,b) => (a.Wins < b.Wins) ? 1 : (b.Wins < a.Wins) ? -1 : 0);

    console.log(sortedTeams);

    valuesintoTable(sortedTeams);
}

function sortbyLosses() {
    resetPage();

    let teams = JSON.parse(localStorage.getItem('testObject'));

    let sortedTeams = teams.Teams.sort((a,b) => (a.Losses < b.Losses) ? 1 : (b.Losses < a.Losses) ? -1 : 0);

    console.log(sortedTeams);
    
    valuesintoTable(sortedTeams);
}

function sortbyName() {
    resetPage();

    let teams = JSON.parse(localStorage.getItem('testObject'));

    let sortedTeams = teams.Teams.sort((a,b) => (a.Name > b.Name) ? 1 : (b.Name > a.Name) ? -1 : 0);

    console.log(sortedTeams);

    valuesintoTable(sortedTeams);
}

function valuesintoTable(teams) {
    let mainTable = document.querySelector('#mainTable');
    let tableBody = document.createElement('tbody');
    tableBody.setAttribute('id','tableBody');
    mainTable.appendChild(tableBody);

    for (let i = 0; i < teams.length; i++) {

        let tableRow = document.createElement('tr');
        tableBody.setAttribute('class','tableRow1')
        tableBody.appendChild(tableRow);

        let tableHeader = document.createElement('th');
        tableHeader.setAttribute('scope', 'row');
        tableHeader.innerHTML = i+1;
        tableRow.appendChild(tableHeader);

        let tc1 = document.createElement('td');
        tc1.innerHTML = teams[i].Name;
        tableRow.appendChild(tc1);

        let tc2 = document.createElement('td');
        tc2.innerHTML = teams[i].Wins;
        tableRow.appendChild(tc2);
        
        let tc3 = document.createElement('td');
        tc3.innerHTML = teams[i].Losses;
        tableRow.appendChild(tc3);

        let tc4 = document.createElement('td');
        tc4.setAttribute('class','responsiveDelete');
        tc4.innerHTML = teams[i].Wins + ' - ' + teams[i].Losses;
        tableRow.appendChild(tc4);

        let WLpercent = 0;

        if (teams[i].Wins === 0 && teams[i].Losses === 0) {
            WLpercent = 0;
        }
        else {
            WLpercent = (teams[i].Wins / (teams[i].Wins + teams[i].Losses));
        }

        let tc5 = document.createElement('td');
        tc5.setAttribute('class','responsiveDelete');
        tc5.innerHTML = WLpercent.toFixed(2);
        tableRow.appendChild(tc5);
    }

    if (screen.width < 600) {
        var paras = document.getElementsByClassName('responsiveDelete');

        while(paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }

        let 
    }
}

function resetPage() {
    let mainTable = document.querySelector('#mainTable');
    let tableBody = document.querySelector('#tableBody');
    
    mainTable.removeChild(tableBody);
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