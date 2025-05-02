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

// === Create HTML for a single upcoming party list item ===

function UpcomingPartyListItem(party) {
  return `<li>${party.name}</li>`;
}

// === Create HTML for the UpcomingParties section ===

function UpcomingParties() {
  const section = document.createElement("section");
  section.classList.add("upcoming-parties");

  let upcomingPartyListItems = "";
  for (const party of upcomingParties) {
    upcomingPartyListItems += UpcomingPartyListItem(party);
  }

  section.innerHTML = `
    <h2>Upcoming Parties</h2>

    <ul>
      ${upcomingPartyListItems}
    </ul>
  `;

  return section;
}

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

  document.querySelector("UpcomingParties").replaceWith(UpcomingParties());
}

// === We have to first await the data to get sent back from the api, and then render the page, else the render function gets run first with the initial state of the variables ===

async function init() {
  await getParties();
  render();
}
init();
