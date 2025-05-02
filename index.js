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

// === Fetch data on one selected party ===

async function getParty(id) {
  try {
    const response = await fetch(api + `/${id}`);
    const data = await response.json();
    selectedParty = data.data;
    console.log(selectedParty);
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

// === Create HTML for a single upcoming party list item ===

function UpcomingPartyListItem(party) {
  return `
    <li class="upcoming-party" data-id="${party.id}">
      ${party.name}
    </li>
  `;
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

    <ul class="upcoming-parties-list">
      ${upcomingPartyListItems}
    </ul>
  `;

  const upcomingPartyItems = section.querySelectorAll(".upcoming-party");
  upcomingPartyItems.forEach((item) => {
    item.addEventListener("click", async () => {
      const { id } = item.dataset;
      // need to await this before the render because getParty is asynchronous
      await getParty(id);
      render();
    });
  });

  return section;
}

// === === Create HTML for the PartyDetails section ===

function PartyDetails() {
  const section = document.createElement("section");
  section.classList.add("party-details");

  if (!selectedParty) {
    section.innerHTML = `
      <h2>Party Details</h2>
      <p>Please select a party for more information.</p>
    `;
  } else {
    // the date data is a little weird here as it includes party time to the minute... but for practice sake, I'll still render it
    const dateData = new Date(selectedParty.date);
    const date = dateData.toLocaleString();

    section.innerHTML = `
      <h2>Party Details</h2>

      <h3>
        ${selectedParty.name} #${selectedParty.id}
      </h3>

      <p>${date}</p>
      <p>${selectedParty.location}</p>
      <p>${selectedParty.description}</p>
    `;
  }

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
  document.querySelector("PartyDetails").replaceWith(PartyDetails());
}

// === We have to first await the data to get sent back from the api, and then render the page, else the render function gets run first with the initial state of the variables ===

async function init() {
  await getParties();
  render();
}
init();
