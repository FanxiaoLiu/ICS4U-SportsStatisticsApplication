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

    let scores = JSON.parse(localStorage.getItem('scores'));
    let teams = JSON.parse(localStorage.getItem('testObject'));
    sortScoresFurthest();
    for (let i = 0; i < teams.Teams.length; i++) {
        let litem = document.createElement('option');
        litem.textContent = teams.Teams[i].Name;
        litem.value = teams.Teams[i].Name;
        litem.setAttribute('id', 'totalTeams' + i);
        const formAway = document.getElementById('exampleFormControlSelect1');
        formAway.appendChild(litem);
    }
    let sortedScores = JSON.parse(localStorage.getItem('oldToNewSortedScores'));
    let mainContainer = document.createElement('div');
    let bodyElement = document.querySelector('body');
    let paginationNav = document.createElement('nav');
    paginationNav.setAttribute('aria-label','Pagination');
    paginationNav.setAttribute('id','pageNav');
    bodyElement.appendChild(paginationNav);

    let paginationUL = document.createElement('ul');
    paginationUL.setAttribute('class','pagination');
    paginationNav.appendChild(paginationUL);

    let howManyPages = sortedScores.length;

    howManyPages = Math.ceil(howManyPages/5);

    for (let i = 0; i < howManyPages; i++) {
        let pageLI = document.createElement('li');
        let pageA = document.createElement('a');

        pageA.setAttribute('class','page-link');
        //pageA.addEventListener('click',setPageContent(i));
        pageA.setAttribute('onclick','setPageContent(' + i + ');')

        pageA.innerHTML = i+1;

        paginationUL.appendChild(pageLI);
        paginationUL.appendChild(pageA);
        
    }

    mainContainer.setAttribute('class','d-flex flex-column scoresContainer');
    mainContainer.setAttribute('id','mainScores');
    bodyElement.appendChild(mainContainer);

    let j = 0;

    

    for (let i = 0; i < sortedScores.length && typeof sortedScores[i] !== 'undefined' && j < 5; i++) {
        let mainwrapperDiv = document.querySelector('#mainScores');
        let scoreBoxWrapper = document.createElement('div');
        scoreBoxWrapper.setAttribute('class','scoreBoxContainer');
        mainwrapperDiv.appendChild(scoreBoxWrapper);

        let teamInfo = document.createElement('div');
        teamInfo.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(teamInfo);

        let homeInfo = document.createElement('div');
        homeInfo.setAttribute('class','col-4');
        teamInfo.appendChild(homeInfo);

        let homeTeamP = document.createElement('p');
        homeTeamP.innerHTML = "Home Team";
        homeInfo.appendChild(homeTeamP);


        let homeName = document.createElement('h5');
        homeName.innerHTML = sortedScores[i].HomeTeam;
        homeInfo.appendChild(homeName);

        let vsDiv = document.createElement('div');
        vsDiv.setAttribute('class','col-4');
        teamInfo.appendChild(vsDiv);

        let vsP = document.createElement('p');
        vsP.innerHTML = "VS.";
        vsDiv.appendChild(vsP);

        let matchDate = document.createElement('p');
        matchDate.innerHTML = sortedScores[i].Date;
        vsDiv.appendChild(matchDate);

        let awayInfo = document.createElement('div');
        awayInfo.setAttribute('class','col-2');
        teamInfo.appendChild(awayInfo);

        let awayTeamP = document.createElement('p');
        awayTeamP.innerHTML = "Away Team";
        awayInfo.appendChild(awayTeamP);

        let awayName = document.createElement('h5');
        awayName.innerHTML = sortedScores[i].AwayTeam;
        awayInfo.appendChild(awayName);

        let scoresDiv = document.createElement('div');
        scoresDiv.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(scoresDiv);

        let homeScoresDiv = document.createElement('div');
        homeScoresDiv.setAttribute('class','col-8');
        scoresDiv.appendChild(homeScoresDiv);

        let homeScoresP = document.createElement('h2');
        homeScoresP.innerHTML = sortedScores[i].HomePoints;
        homeScoresDiv.appendChild(homeScoresP);

        let awayScoresDiv = document.createElement('div');
        awayScoresDiv.setAttribute('class','col-2');
        scoresDiv.appendChild(awayScoresDiv);

        let awayScoresP = document.createElement('h2');
        awayScoresP.innerHTML = sortedScores[i].AwayPoints;
        awayScoresDiv.appendChild(awayScoresP);

        j++;
    }
    j = 0;

    /*<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>*/
}

function sortDateNewtoOld() {

    resetEntirePage();

    let scores = JSON.parse(localStorage.getItem('scores'));
    let teams = JSON.parse(localStorage.getItem('testObject'));
    sortScoresFurthest();
    let sortedScores = JSON.parse(localStorage.getItem('oldToNewSortedScores'));
    let mainContainer = document.createElement('div');
    let bodyElement = document.querySelector('body');
    let paginationNav = document.createElement('nav');
    paginationNav.setAttribute('aria-label','Pagination');
    paginationNav.setAttribute('id','pageNav');
    bodyElement.appendChild(paginationNav);

    let paginationUL = document.createElement('ul');
    paginationUL.setAttribute('class','pagination');
    paginationNav.appendChild(paginationUL);

    let howManyPages = sortedScores.length;

    howManyPages = Math.ceil(howManyPages/5);

    for (let i = 0; i < howManyPages; i++) {
        let pageLI = document.createElement('li');
        let pageA = document.createElement('a');

        pageA.setAttribute('class','page-link');
        //pageA.addEventListener('click',setPageContent(i));
        pageA.setAttribute('onclick','setPageContent(' + i + ');')

        pageA.innerHTML = i+1;

        paginationUL.appendChild(pageLI);
        paginationUL.appendChild(pageA);
        
    }

    mainContainer.setAttribute('class','d-flex flex-column scoresContainer');
    mainContainer.setAttribute('id','mainScores');
    bodyElement.appendChild(mainContainer);

    let j = 0;

    

    for (let i = 0; i < sortedScores.length && typeof sortedScores[i] !== 'undefined' && j < 5; i++) {
        let mainwrapperDiv = document.querySelector('#mainScores');
        let scoreBoxWrapper = document.createElement('div');
        scoreBoxWrapper.setAttribute('class','scoreBoxContainer');
        mainwrapperDiv.appendChild(scoreBoxWrapper);

        let teamInfo = document.createElement('div');
        teamInfo.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(teamInfo);

        let homeInfo = document.createElement('div');
        homeInfo.setAttribute('class','col-4');
        teamInfo.appendChild(homeInfo);

        let homeTeamP = document.createElement('p');
        homeTeamP.innerHTML = "Home Team";
        homeInfo.appendChild(homeTeamP);


        let homeName = document.createElement('h5');
        homeName.innerHTML = sortedScores[i].HomeTeam;
        homeInfo.appendChild(homeName);

        let vsDiv = document.createElement('div');
        vsDiv.setAttribute('class','col-4');
        teamInfo.appendChild(vsDiv);

        let vsP = document.createElement('p');
        vsP.innerHTML = "VS.";
        vsDiv.appendChild(vsP);

        let matchDate = document.createElement('p');
        matchDate.innerHTML = sortedScores[i].Date;
        vsDiv.appendChild(matchDate);

        let awayInfo = document.createElement('div');
        awayInfo.setAttribute('class','col-2');
        teamInfo.appendChild(awayInfo);

        let awayTeamP = document.createElement('p');
        awayTeamP.innerHTML = "Away Team";
        awayInfo.appendChild(awayTeamP);

        let awayName = document.createElement('h5');
        awayName.innerHTML = sortedScores[i].AwayTeam;
        awayInfo.appendChild(awayName);

        let scoresDiv = document.createElement('div');
        scoresDiv.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(scoresDiv);

        let homeScoresDiv = document.createElement('div');
        homeScoresDiv.setAttribute('class','col-8');
        scoresDiv.appendChild(homeScoresDiv);

        let homeScoresP = document.createElement('h2');
        homeScoresP.innerHTML = sortedScores[i].HomePoints;
        homeScoresDiv.appendChild(homeScoresP);

        let awayScoresDiv = document.createElement('div');
        awayScoresDiv.setAttribute('class','col-2');
        scoresDiv.appendChild(awayScoresDiv);

        let awayScoresP = document.createElement('h2');
        awayScoresP.innerHTML = sortedScores[i].AwayPoints;
        awayScoresDiv.appendChild(awayScoresP);

        j++;
    }
    j = 0;
}

function sortDateOldtoNew() {
    resetEntirePage();

    let scores = JSON.parse(localStorage.getItem('scores'));
    let teams = JSON.parse(localStorage.getItem('testObject'));
    sortScoresClosest();
    let sortedScores = JSON.parse(localStorage.getItem('oldToNewSortedScores'));
    let mainContainer = document.createElement('div');
    let bodyElement = document.querySelector('body');
    let paginationNav = document.createElement('nav');
    paginationNav.setAttribute('aria-label','Pagination');
    paginationNav.setAttribute('id','pageNav');
    bodyElement.appendChild(paginationNav);

    let paginationUL = document.createElement('ul');
    paginationUL.setAttribute('class','pagination');
    paginationNav.appendChild(paginationUL);

    let howManyPages = sortedScores.length;

    howManyPages = Math.ceil(howManyPages/5);

    for (let i = 0; i < howManyPages; i++) {
        let pageLI = document.createElement('li');
        let pageA = document.createElement('a');

        pageA.setAttribute('class','page-link');
        //pageA.addEventListener('click',setPageContent(i));
        pageA.setAttribute('onclick','setPageContent(' + i + ');')

        pageA.innerHTML = i+1;

        paginationUL.appendChild(pageLI);
        paginationUL.appendChild(pageA);
        
    }

    mainContainer.setAttribute('class','d-flex flex-column scoresContainer');
    mainContainer.setAttribute('id','mainScores');
    bodyElement.appendChild(mainContainer);

    let j = 0;

    

    for (let i = 0; i < sortedScores.length && typeof sortedScores[i] !== 'undefined' && j < 5; i++) {
        let mainwrapperDiv = document.querySelector('#mainScores');
        let scoreBoxWrapper = document.createElement('div');
        scoreBoxWrapper.setAttribute('class','scoreBoxContainer');
        mainwrapperDiv.appendChild(scoreBoxWrapper);

        let teamInfo = document.createElement('div');
        teamInfo.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(teamInfo);

        let homeInfo = document.createElement('div');
        homeInfo.setAttribute('class','col-4');
        teamInfo.appendChild(homeInfo);

        let homeTeamP = document.createElement('p');
        homeTeamP.innerHTML = "Home Team";
        homeInfo.appendChild(homeTeamP);


        let homeName = document.createElement('h5');
        homeName.innerHTML = sortedScores[i].HomeTeam;
        homeInfo.appendChild(homeName);

        let vsDiv = document.createElement('div');
        vsDiv.setAttribute('class','col-4');
        teamInfo.appendChild(vsDiv);

        let vsP = document.createElement('p');
        vsP.innerHTML = "VS.";
        vsDiv.appendChild(vsP);

        let matchDate = document.createElement('p');
        matchDate.innerHTML = sortedScores[i].Date;
        vsDiv.appendChild(matchDate);

        let awayInfo = document.createElement('div');
        awayInfo.setAttribute('class','col-2');
        teamInfo.appendChild(awayInfo);

        let awayTeamP = document.createElement('p');
        awayTeamP.innerHTML = "Away Team";
        awayInfo.appendChild(awayTeamP);

        let awayName = document.createElement('h5');
        awayName.innerHTML = sortedScores[i].AwayTeam;
        awayInfo.appendChild(awayName);

        let scoresDiv = document.createElement('div');
        scoresDiv.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(scoresDiv);

        let homeScoresDiv = document.createElement('div');
        homeScoresDiv.setAttribute('class','col-8');
        scoresDiv.appendChild(homeScoresDiv);

        let homeScoresP = document.createElement('h2');
        homeScoresP.innerHTML = sortedScores[i].HomePoints;
        homeScoresDiv.appendChild(homeScoresP);

        let awayScoresDiv = document.createElement('div');
        awayScoresDiv.setAttribute('class','col-2');
        scoresDiv.appendChild(awayScoresDiv);

        let awayScoresP = document.createElement('h2');
        awayScoresP.innerHTML = sortedScores[i].AwayPoints;
        awayScoresDiv.appendChild(awayScoresP);

        j++;
    }
    j = 0;
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

function sortbyTeam() {
    resetEntirePage();
    sortScoresClosest();
    let scores = JSON.parse(localStorage.getItem('scores'));
    let teams = JSON.parse(localStorage.getItem('testObject'));
    let sortedTeams = JSON.parse(localStorage.getItem('oldToNewSortedScores'));
    let mainContainer = document.createElement('div');
    let bodyElement = document.querySelector('body');
    mainContainer.setAttribute('class','d-flex flex-column scoresContainer');
    mainContainer.setAttribute('id','mainScores');
    bodyElement.appendChild(mainContainer);

    let teamName = document.querySelector('#exampleFormControlSelect1').value;

    let sortedScores = sortedTeams.filter(score => (score.AwayTeam == teamName || score.HomeTeam == teamName));
    console.log(sortedScores);

    localStorage.setItem('oldToNewSortedScores',JSON.stringify(sortedScores));

    let paginationNav = document.createElement('nav');
    paginationNav.setAttribute('aria-label','Pagination');
    paginationNav.setAttribute('id','pageNav');
    bodyElement.appendChild(paginationNav);

    let paginationUL = document.createElement('ul');
    paginationUL.setAttribute('class','pagination');
    paginationNav.appendChild(paginationUL);

    let howManyPages = sortedScores.length;

    howManyPages = Math.ceil(howManyPages/5);

    for (let i = 0; i < howManyPages; i++) {
        let pageLI = document.createElement('li');
        let pageA = document.createElement('a');

        pageA.setAttribute('class','page-link');
        //pageA.addEventListener('click',setPageContent(i));
        pageA.setAttribute('onclick','setPageContent(' + i + ');')

        pageA.innerHTML = i+1;

        paginationUL.appendChild(pageLI);
        paginationUL.appendChild(pageA);
        
    }

    mainContainer.setAttribute('class','d-flex flex-column scoresContainer');
    mainContainer.setAttribute('id','mainScores');
    bodyElement.appendChild(mainContainer);

    let j = 0;

    

    for (let i = 0; i < sortedScores.length && typeof sortedScores[i] !== 'undefined' && j < 5; i++) {
        let mainwrapperDiv = document.querySelector('#mainScores');
        let scoreBoxWrapper = document.createElement('div');
        scoreBoxWrapper.setAttribute('class','scoreBoxContainer');
        mainwrapperDiv.appendChild(scoreBoxWrapper);

        let teamInfo = document.createElement('div');
        teamInfo.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(teamInfo);

        let homeInfo = document.createElement('div');
        homeInfo.setAttribute('class','col-4');
        teamInfo.appendChild(homeInfo);

        let homeTeamP = document.createElement('p');
        homeTeamP.innerHTML = "Home Team";
        homeInfo.appendChild(homeTeamP);


        let homeName = document.createElement('h5');
        homeName.innerHTML = sortedScores[i].HomeTeam;
        homeInfo.appendChild(homeName);

        let vsDiv = document.createElement('div');
        vsDiv.setAttribute('class','col-4');
        teamInfo.appendChild(vsDiv);

        let vsP = document.createElement('p');
        vsP.innerHTML = "VS.";
        vsDiv.appendChild(vsP);

        let matchDate = document.createElement('p');
        matchDate.innerHTML = sortedScores[i].Date;
        vsDiv.appendChild(matchDate);

        let awayInfo = document.createElement('div');
        awayInfo.setAttribute('class','col-2');
        teamInfo.appendChild(awayInfo);

        let awayTeamP = document.createElement('p');
        awayTeamP.innerHTML = "Away Team";
        awayInfo.appendChild(awayTeamP);

        let awayName = document.createElement('h5');
        awayName.innerHTML = sortedScores[i].AwayTeam;
        awayInfo.appendChild(awayName);

        let scoresDiv = document.createElement('div');
        scoresDiv.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(scoresDiv);

        let homeScoresDiv = document.createElement('div');
        homeScoresDiv.setAttribute('class','col-8');
        scoresDiv.appendChild(homeScoresDiv);

        let homeScoresP = document.createElement('h2');
        homeScoresP.innerHTML = sortedScores[i].HomePoints;
        homeScoresDiv.appendChild(homeScoresP);

        let awayScoresDiv = document.createElement('div');
        awayScoresDiv.setAttribute('class','col-2');
        scoresDiv.appendChild(awayScoresDiv);

        let awayScoresP = document.createElement('h2');
        awayScoresP.innerHTML = sortedScores[i].AwayPoints;
        awayScoresDiv.appendChild(awayScoresP);

        j++;
    }
    j = 0;
}

function setPageContent(pageNumber) {
    resetPage();

    let sortedScores = JSON.parse(localStorage.getItem('oldToNewSortedScores'));
    let mainContainer = document.createElement('div');
    let bodyElement = document.querySelector('body');
    mainContainer.setAttribute('class','d-flex flex-column scoresContainer');
    mainContainer.setAttribute('id','mainScores');
    bodyElement.appendChild(mainContainer);

    let beginPlace = pageNumber * 5;

    let j = 0;

    for (let i = beginPlace; i < sortedScores.length && typeof sortedScores[i] !== 'undefined' && j < 5; i++) {
        let mainwrapperDiv = document.querySelector('#mainScores');
        let scoreBoxWrapper = document.createElement('div');
        scoreBoxWrapper.setAttribute('class','scoreBoxContainer');
        mainwrapperDiv.appendChild(scoreBoxWrapper);

        let teamInfo = document.createElement('div');
        teamInfo.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(teamInfo);

        let homeInfo = document.createElement('div');
        homeInfo.setAttribute('class','col-4');
        teamInfo.appendChild(homeInfo);

        let homeTeamP = document.createElement('p');
        homeTeamP.innerHTML = "Home Team";
        homeInfo.appendChild(homeTeamP);


        let homeName = document.createElement('h5');
        homeName.innerHTML = sortedScores[i].HomeTeam;
        homeInfo.appendChild(homeName);

        let vsDiv = document.createElement('div');
        vsDiv.setAttribute('class','col-4');
        teamInfo.appendChild(vsDiv);

        let vsP = document.createElement('p');
        vsP.innerHTML = "VS.";
        vsDiv.appendChild(vsP);

        let matchDate = document.createElement('p');
        matchDate.innerHTML = sortedScores[i].Date;
        vsDiv.appendChild(matchDate);

        let awayInfo = document.createElement('div');
        awayInfo.setAttribute('class','col-2');
        teamInfo.appendChild(awayInfo);

        let awayTeamP = document.createElement('p');
        awayTeamP.innerHTML = "Away Team";
        awayInfo.appendChild(awayTeamP);

        let awayName = document.createElement('h5');
        awayName.innerHTML = sortedScores[i].AwayTeam;
        awayInfo.appendChild(awayName);

        let scoresDiv = document.createElement('div');
        scoresDiv.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(scoresDiv);

        let homeScoresDiv = document.createElement('div');
        homeScoresDiv.setAttribute('class','col-8');
        scoresDiv.appendChild(homeScoresDiv);

        let homeScoresP = document.createElement('h2');
        homeScoresP.innerHTML = sortedScores[i].HomePoints;
        homeScoresDiv.appendChild(homeScoresP);

        let awayScoresDiv = document.createElement('div');
        awayScoresDiv.setAttribute('class','col-2');
        scoresDiv.appendChild(awayScoresDiv);

        let awayScoresP = document.createElement('h2');
        awayScoresP.innerHTML = sortedScores[i].AwayPoints;
        awayScoresDiv.appendChild(awayScoresP);

        j++;
    }
    j = 0;
}

function sortScoresClosest() {
    let unsorted = JSON.parse(localStorage.getItem('scores'));
    let sorted = unsorted.Scores.sort((a,b) => (Date.parse(a.Date) > Date.parse(b.Date)) ? 1 : ((Date.parse(b.Date) > Date.parse(a.Date)) ? -1 : 0));
    let dateValue = [];

    console.log(sorted);

    localStorage.setItem('oldToNewSortedScores',JSON.stringify(sorted));
}

function filterScoresDateRange() {
    resetEntirePage();

    let scores = JSON.parse(localStorage.getItem('scores'));
    let teams = JSON.parse(localStorage.getItem('testObject'));
    sortScoresFurthest();
    let unfiltered = JSON.parse(localStorage.getItem('oldToNewSortedScores'));
    let targetDateStart = document.querySelector('#exampleFormControlInputDateRangeStart').value;
    let targetDateEnd = document.querySelector('#exampleFormControlInputDateRangeEnd').value;
    let sortedScores = unfiltered.filter(score => Date.parse(targetDateStart) <= Date.parse(score.Date) && Date.parse(score.Date) <= Date.parse(targetDateEnd));
    console.log(sortedScores);
    let mainContainer = document.createElement('div');
    let bodyElement = document.querySelector('body');
    let paginationNav = document.createElement('nav');
    paginationNav.setAttribute('aria-label','Pagination');
    paginationNav.setAttribute('id','pageNav');
    bodyElement.appendChild(paginationNav);

    localStorage.setItem('oldToNewSortedScores',JSON.stringify(sortedScores));

    let paginationUL = document.createElement('ul');
    paginationUL.setAttribute('class','pagination');
    paginationNav.appendChild(paginationUL);

    let howManyPages = sortedScores.length;

    howManyPages = Math.ceil(howManyPages/5);

    for (let i = 0; i < howManyPages; i++) {
        let pageLI = document.createElement('li');
        let pageA = document.createElement('a');

        pageA.setAttribute('class','page-link');
        //pageA.addEventListener('click',setPageContent(i));
        pageA.setAttribute('onclick','setPageContent(' + i + ');')

        pageA.innerHTML = i+1;

        paginationUL.appendChild(pageLI);
        paginationUL.appendChild(pageA);
        
    }

    mainContainer.setAttribute('class','d-flex flex-column scoresContainer');
    mainContainer.setAttribute('id','mainScores');
    bodyElement.appendChild(mainContainer);

    let j = 0;

    

    for (let i = 0; i < sortedScores.length && typeof sortedScores[i] !== 'undefined' && j < 5; i++) {
        let mainwrapperDiv = document.querySelector('#mainScores');
        let scoreBoxWrapper = document.createElement('div');
        scoreBoxWrapper.setAttribute('class','scoreBoxContainer');
        mainwrapperDiv.appendChild(scoreBoxWrapper);

        let teamInfo = document.createElement('div');
        teamInfo.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(teamInfo);

        let homeInfo = document.createElement('div');
        homeInfo.setAttribute('class','col-4');
        teamInfo.appendChild(homeInfo);

        let homeTeamP = document.createElement('p');
        homeTeamP.innerHTML = "Home Team";
        homeInfo.appendChild(homeTeamP);


        let homeName = document.createElement('h5');
        homeName.innerHTML = sortedScores[i].HomeTeam;
        homeInfo.appendChild(homeName);

        let vsDiv = document.createElement('div');
        vsDiv.setAttribute('class','col-4');
        teamInfo.appendChild(vsDiv);

        let vsP = document.createElement('p');
        vsP.innerHTML = "VS.";
        vsDiv.appendChild(vsP);

        let matchDate = document.createElement('p');
        matchDate.innerHTML = sortedScores[i].Date;
        vsDiv.appendChild(matchDate);

        let awayInfo = document.createElement('div');
        awayInfo.setAttribute('class','col-2');
        teamInfo.appendChild(awayInfo);

        let awayTeamP = document.createElement('p');
        awayTeamP.innerHTML = "Away Team";
        awayInfo.appendChild(awayTeamP);

        let awayName = document.createElement('h5');
        awayName.innerHTML = sortedScores[i].AwayTeam;
        awayInfo.appendChild(awayName);

        let scoresDiv = document.createElement('div');
        scoresDiv.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(scoresDiv);

        let homeScoresDiv = document.createElement('div');
        homeScoresDiv.setAttribute('class','col-8');
        scoresDiv.appendChild(homeScoresDiv);

        let homeScoresP = document.createElement('h2');
        homeScoresP.innerHTML = sortedScores[i].HomePoints;
        homeScoresDiv.appendChild(homeScoresP);

        let awayScoresDiv = document.createElement('div');
        awayScoresDiv.setAttribute('class','col-2');
        scoresDiv.appendChild(awayScoresDiv);

        let awayScoresP = document.createElement('h2');
        awayScoresP.innerHTML = sortedScores[i].AwayPoints;
        awayScoresDiv.appendChild(awayScoresP);

        j++;
    }
    j = 0;
}

function filterScoresSingleDate() {
    resetPage();
    sortScoresClosest();
    let unfiltered = JSON.parse(localStorage.getItem('scores'));
    let targetDate = document.querySelector('#exampleFormControlInputSingleDate').value;

    let sortedScores = unfiltered.Scores.filter(score => Date.parse(score.Date) == Date.parse(targetDate));
    let mainContainer = document.createElement('div');
    let bodyElement = document.querySelector('body');

    mainContainer.setAttribute('class','d-flex flex-column scoresContainer');
    mainContainer.setAttribute('id','mainScores');
    bodyElement.appendChild(mainContainer);

    let j = 0;

    

    for (let i = 0; i < sortedScores.length && typeof sortedScores[i] !== 'undefined' && j < 5; i++) {
        let mainwrapperDiv = document.querySelector('#mainScores');
        let scoreBoxWrapper = document.createElement('div');
        scoreBoxWrapper.setAttribute('class','scoreBoxContainer');
        mainwrapperDiv.appendChild(scoreBoxWrapper);

        let teamInfo = document.createElement('div');
        teamInfo.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(teamInfo);

        let homeInfo = document.createElement('div');
        homeInfo.setAttribute('class','col-4');
        teamInfo.appendChild(homeInfo);

        let homeTeamP = document.createElement('p');
        homeTeamP.innerHTML = "Home Team";
        homeInfo.appendChild(homeTeamP);


        let homeName = document.createElement('h5');
        homeName.innerHTML = sortedScores[i].HomeTeam;
        homeInfo.appendChild(homeName);

        let vsDiv = document.createElement('div');
        vsDiv.setAttribute('class','col-4');
        teamInfo.appendChild(vsDiv);

        let vsP = document.createElement('p');
        vsP.innerHTML = "VS.";
        vsDiv.appendChild(vsP);

        let matchDate = document.createElement('p');
        matchDate.innerHTML = sortedScores[i].Date;
        vsDiv.appendChild(matchDate);

        let awayInfo = document.createElement('div');
        awayInfo.setAttribute('class','col-2');
        teamInfo.appendChild(awayInfo);

        let awayTeamP = document.createElement('p');
        awayTeamP.innerHTML = "Away Team";
        awayInfo.appendChild(awayTeamP);

        let awayName = document.createElement('h5');
        awayName.innerHTML = sortedScores[i].AwayTeam;
        awayInfo.appendChild(awayName);

        let scoresDiv = document.createElement('div');
        scoresDiv.setAttribute('class','row justify-content-center');
        scoreBoxWrapper.appendChild(scoresDiv);

        let homeScoresDiv = document.createElement('div');
        homeScoresDiv.setAttribute('class','col-8');
        scoresDiv.appendChild(homeScoresDiv);

        let homeScoresP = document.createElement('h2');
        homeScoresP.innerHTML = sortedScores[i].HomePoints;
        homeScoresDiv.appendChild(homeScoresP);

        let awayScoresDiv = document.createElement('div');
        awayScoresDiv.setAttribute('class','col-2');
        scoresDiv.appendChild(awayScoresDiv);

        let awayScoresP = document.createElement('h2');
        awayScoresP.innerHTML = sortedScores[i].AwayPoints;
        awayScoresDiv.appendChild(awayScoresP);

        j++;
    }
    j = 0;
}

function sortScoresFurthest() {
    let unsorted = JSON.parse(localStorage.getItem('scores'));
    let sorted = unsorted.Scores.sort((a,b) => (Date.parse(b.Date) > Date.parse(a.Date)) ? 1 : ((Date.parse(a.Date) > Date.parse(b.Date)) ? -1 : 0))
    let dateValue = [];

    console.log(sorted);

    localStorage.setItem('oldToNewSortedScores',JSON.stringify(sorted));
}

function resetPage() {
    let bodyElement = document.querySelector('body');
    //let mainContainer = 

    bodyElement.removeChild(document.querySelector('#mainScores'));
}

function resetEntirePage() {
    let bodyElement = document.querySelector('body');
    //let mainContainer = 

    bodyElement.removeChild(document.querySelector('#mainScores'));
    bodyElement.removeChild(document.querySelector('#pageNav'));
}