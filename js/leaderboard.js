fetch("data/leaderboard.json", {
  cache: "no-store"
})
  .then(res => res.json())
  .then(data => {
    console.log("Fresh leaderboard loaded", data);

    const table = document.querySelector(".leaderboard-table");

    // clear old rows (important!)
    table.querySelectorAll(".leaderboard-row:not(.header)")
         .forEach(row => row.remove());

    const teams = data.teams.sort((a, b) => b.points - a.points);

    teams.forEach((team, index) => {
      const row = document.createElement("div");
      row.className = "leaderboard-row";

      if (index === 0) row.classList.add("gold");
      if (index === 1) row.classList.add("silver");
      if (index === 2) row.classList.add("bronze");

      row.innerHTML = `
        <span>${index + 1}</span>
        <span>${team.name}</span>
        <span>${team.points}</span>
      `;

      table.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Leaderboard fetch failed:", err);
  });
