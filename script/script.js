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
        const gameId = event.id;
        const awayTeam = event.competitions[0].competitors[1].team.displayName;
        const homeTeam = event.competitions[0].competitors[0].team.displayName;
        const newElement = document.createElement("div");
        newElement.setAttribute("id", gameId);
        newElement.setAttribute("class", "game-row");
        newElement.textContent = `Game ID: ${gameId} ${awayTeam} at ${homeTeam}`;
        sportsDiv.append(newElement);
    });

    document.querySelectorAll('.game-row').forEach(element => {
        element.addEventListener('click', (event) => {
            const clickedElement = event.target;
            const gameId = clickedElement.id;
            const gameName = clickedElement.textContent;            
            sportsDiv.innerHTML = `<button id="back-button">Back</button>`;
            sportsDiv.innerHTML += `<p>${gameName}</p>`;
            document.getElementById('back-button').addEventListener('click', () => {
                mlbDisplay();
            });
        });
    });
}

fetchData();
