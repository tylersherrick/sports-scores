const sportsDiv = document.getElementById("sports-div");
const mlbSection = document.getElementById("mlb-section");
const mlbURL = 'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';
let sportsData = { };

const fetchData = async() => {
    try {
        const res = await fetch(mlbURL);
        const data = await res.json();
        sportsData = data.events;
        updateViews();
    } catch (err) {
        console.log(err)
    }
}

const updateViews = () => {
    mlbDisplay();
}

const mlbDisplay = () => {
    sportsDiv.innerHTML = `<h1>Todays Sports Scores</h1>`;
    sportsData.forEach(event => {
        console.log(sportsData);
        const gameId = event.id;
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const awayScore = event.competitions[0].competitors[1].score;
        const homeScore = event.competitions[0].competitors[0].score;
        const inning = event.status.type.detail;
        const gameStatus = event.status.type.shortDetail;
        const outs = event.competitions[0].outsText;
        const situation = event.competitions[0].situation;
        const balls = situation ? situation.balls : 'N/A';
        const strikes = situation ? situation.strikes : 'N/A';
        const isFirst = situation ? situation.onFirst : 'N/A';
        const isSecond = situation ? situation.onSecond : 'N/A';
        const isThird = situation ? situation.onThird : 'N/A';
        const newElement = document.createElement("div");
        newElement.id = gameId;
        newElement.innerHTML += `${awayTeam} ${awayScore} at ${homeTeam} ${homeScore}`;
        sportsDiv.append(newElement);

        newElement.addEventListener('click', (e) => {
            console.log(e.target.id + ` ${awayTeam} at ${homeTeam}`); 
            sportsDiv.innerHTML = `
                <button id="all-content">Back</button>
                <p>${e.target.id}: </p>
                <p>${awayTeam} - ${awayScore}</p>
                <p>${homeTeam} - ${awayScore}</p>
            `;
            const backButton = document.getElementById("all-content");
        backButton.addEventListener('click', mlbDisplay)
        });
    });
};


fetchData();
