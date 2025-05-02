// === Initial states ===

let upcomingParties = [];
let selectedParty;

// === API Info ===

const url = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const cohort = "/2109-CPU-RM-WEB-PT";
const resource = "/events";
const api = url + cohort + resource;

// === Fetch upcoming parties data from api ===

async function getParties() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    upcomingParties = data.data;
    console.log(upcomingParties); // delete this later
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}
getParties();
render();

// === Render ===

function render() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <UpcomingParties></UpcomingParties>
      <PartyDetails></PartyDetails>
    </main>
  `;
}
render();
