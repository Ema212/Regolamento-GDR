console.log("??? JS caricato.");


// Mostra la modale DM
function showDMModal() {
  document.getElementById("dm-modal").style.display = "flex";
}

// Nasconde la modale
function closeDMModal() {
  document.getElementById("dm-modal").style.display = "none";
}

// Sblocca DM se la password è giusta
function unlockDM() {
  const input = document.getElementById("dm-password").value;
  if (input === "drago123") {
    localStorage.setItem("dm-unlocked", "true");
    revealDMSections();
    closeDMModal();
    alert("Sezioni DM sbloccate!");
  } else {
    alert("Password errata.");
  }
}

// Mostra le sezioni DM se già sbloccate
function revealDMSections() {
  document.querySelectorAll('.dm-only').forEach(el => {
    el.style.display = 'block';
    el.style.opacity = 0;
    el.style.transition = 'opacity 1s ease';
    setTimeout(() => {
      el.style.opacity = 1;
    }, 10);
  });
}

// All'avvio: controlla se già sbloccato
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("dm-unlocked") === "true") {
    revealDMSections();
  }
});
