fetch("data/leaderboard.json")
  .then(res => res.json())
  .then(data => {

    const table = document.querySelector(".leaderboard-table");

    // 🔒 LOCK LEADERBOARD
    if (data.locked) {
      const lockedMsg = document.createElement("div");
      lockedMsg.className = "leaderboard-locked";
      lockedMsg.innerText = "Leaderboard will be updated after event completion";
      table.appendChild(lockedMsg);
      return;
    }

    // 📊 SORT BY POINTS (DESC)
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
  });
