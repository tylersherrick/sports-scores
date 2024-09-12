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
        const newElement = document.createElement("div");
        newElement.id = gameId;
        newElement.innerHTML = `${awayTeam} at ${homeTeam}`;
        sportsDiv.append(newElement);

        newElement.addEventListener('click', (e) => {
            console.log(e.target.id + ` ${awayTeam} at ${homeTeam}`); 
            sportsDiv.innerHTML = `
                <button id="all-content">Back</button>
                <p>${e.target.id}: ${awayTeam} at ${homeTeam}</p>
            `;
            const backButton = document.getElementById("all-content");
        backButton.addEventListener('click', mlbDisplay)
        });
    });
};


fetchData();
