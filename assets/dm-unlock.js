// Mostra la modale
function showDMModal() {
  document.getElementById("dm-modal").style.display = "flex";
}

// Chiude la modale
function closeDMModal() {
  document.getElementById("dm-modal").style.display = "none";
}

// Sblocca contenuti
function unlockGeneric(password) {
  const passwords = {
    dm: "drago123",
    pg: "classe_liv3"
  };

  if (password === passwords.dm) {
    localStorage.setItem("unlocked-dm", "true");
    localStorage.setItem("unlocked-pg", "true");
    revealAll();
    closeDMModal();
    alert("Contenuti DM e PG sbloccati!");
  } else if (password === passwords.pg) {
    localStorage.setItem("unlocked-pg", "true");
    revealPG();
    closeDMModal();
    alert("Contenuti PG sbloccati!");
  } else {
    alert("Password errata.");
  }
}

function revealAll() {
  document.querySelectorAll(".dm-only, .pg-only").forEach(el => {
    el.style.display = "block";
  });
}

function revealPG() {
  document.querySelectorAll(".pg-only").forEach(el => {
    el.style.display = "block";
  });
}

// All’avvio
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("unlocked-dm") === "true") revealAll();
  else if (localStorage.getItem("unlocked-pg") === "true") revealPG();
});
