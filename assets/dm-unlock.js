function unlockDM() {
  const password = prompt("Inserisci la password DM:");
  if (password === "drago123") {  // Cambia la password qui
    document.querySelectorAll('.dm-only').forEach(el => {
      el.style.display = 'block';
    });
    alert("Sezioni DM sbloccate.");
  } else {
    alert("Password errata.");
  }
}
