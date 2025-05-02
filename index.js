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
