// Abilita gesture swipe per aprire/chiudere la sidebar e mostrare l'indice pagina
let startX = null, startY = null;
const swipeThreshold = 50;  // spostamento orizzontale minimo in pixel per riconoscere lo swipe
const verticalTolerance = 2;  // lo spostamento orizzontale deve essere almeno il doppio di quello verticale
document.addEventListener('touchstart', function(e) {
  if(e.touches.length === 1) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  } else {
    startX = null;
    startY = null;
  }
});
document.addEventListener('touchend', function(e) {
  if(startX === null) return;
  let dx = e.changedTouches[0].clientX - startX;
  let dy = e.changedTouches[0].clientY - startY;
  // Verifica se è uno swipe orizzontale sufficientemente lungo
  if(Math.abs(dx) > swipeThreshold && Math.abs(dx) > Math.abs(dy) * verticalTolerance) {
    if(dx > 0) {
      // Swipe verso destra: apre la sidebar (se chiusa)
      let toggler = document.querySelector('button.collapse-toggle');
      if(toggler) {
        // Attiva il toggle solo se la sidebar è attualmente collassata
        let sidebarLayout = document.querySelector('.bslib-sidebar-layout');
        if(!sidebarLayout || sidebarLayout.classList.contains('sidebar-collapsed')) {
          toggler.click();
        }
      }
    } else {
      // Swipe verso sinistra: se la sidebar è aperta la chiude, altrimenti apre il TOC della pagina
      let sidebarLayout = document.querySelector('.bslib-sidebar-layout');
      let sidebarOpen = sidebarLayout && !sidebarLayout.classList.contains('sidebar-collapsed');
      if(sidebarOpen) {
        // Sidebar aperta: la chiude simulando il click sul toggle
        let toggler = document.querySelector('button.collapse-toggle');
        if(toggler) toggler.click();
      } else {
        // Sidebar chiusa: mostra l'indice dei contenuti (TOC) se presente
        let tocHeader = null;
        document.querySelectorAll('h2').forEach(h => {
          if(h.textContent.trim().toLowerCase() === 'table of contents') tocHeader = h;
        });
        if(tocHeader) {
          let tocList = tocHeader.nextElementSibling;
          if(tocList && tocList.tagName.toLowerCase() === 'ul') {
            // Crea (o riutilizza) un overlay a comparsa per il TOC
            let overlay = document.getElementById('toc-overlay');
            if(!overlay) {
              overlay = document.createElement('div');
              overlay.id = 'toc-overlay';
              overlay.style.position = 'fixed';
              overlay.style.top = 0;
              overlay.style.left = 0;
              overlay.style.right = 0;
              overlay.style.bottom = 0;
              overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
              overlay.style.zIndex = '9999';
              // Click fuori dal pannello chiude l'overlay
              overlay.addEventListener('click', function(e) {
                if(e.target === overlay) {
                  document.body.removeChild(overlay);
                }
              });
            } else {
              overlay.innerHTML = '';  // pulisce contenuto se già esistente
            }
            // Crea il contenitore del TOC (pannello bianco scorrevole da destra)
            let tocBox = document.createElement('div');
            tocBox.style.position = 'fixed';
            tocBox.style.top = 0;
            tocBox.style.bottom = 0;
            tocBox.style.right = 0;
            tocBox.style.width = '80%';
            tocBox.style.maxWidth = '300px';
            tocBox.style.backgroundColor = 'white';
            tocBox.style.padding = '1em';
            tocBox.style.overflowY = 'auto';
            // Pulsante di chiusura "X" nell'angolo
            let closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.setAttribute('aria-label', 'Chiudi indice dei contenuti');
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '10px';
            closeBtn.style.right = '10px';
            closeBtn.style.fontSize = '1.5em';
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.cursor = 'pointer';
            closeBtn.addEventListener('click', function() {
              if(document.body.contains(overlay)) {
                document.body.removeChild(overlay);
              }
            });
            tocBox.appendChild(closeBtn);
            // Clona il titolo "Contents" e la lista del TOC
            let tocTitle = document.createElement('h3');
            tocTitle.textContent = 'Contents';
            tocBox.appendChild(tocTitle);
            let listClone = tocList.cloneNode(true);
            tocBox.appendChild(listClone);
            overlay.appendChild(tocBox);
            document.body.appendChild(overlay);
          }
        }
      }
    }
  }
  // Reset variabili per lo swipe successivo
  startX = null;
  startY = null;
});
