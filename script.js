/**
 * Schaltet die Sichtbarkeit und Animation der Projektdetails um.
 * Setzt die Höhe des Containers dynamisch, um mit dem Inhalt mitzuwachsen.
 * @param {string} id - Die ID der Projektkarte.
 */
function toggleProjectDetails(id) {
    // 1. Finde das Detail-Element
    const detailsElement = document.getElementById(`details-${id}`);
    
    // Sicherstellen, dass das Element existiert
    if (!detailsElement) return;

    // 2. Finde den Header-Container
    const cardHeader = detailsElement.previousElementSibling;
    
    // 3. Finde den Pfeil im Header
    const arrow = cardHeader ? cardHeader.querySelector('.arrow-icon') : null;

    // Prüfe, ob das Element gerade geöffnet wird
    const isOpening = !detailsElement.classList.contains('active');

    if (isOpening) {
        // --- ÖFFNEN ---
        
        detailsElement.classList.add('active');
        detailsElement.style.height = detailsElement.scrollHeight + "px";
        
        // Nach der Animation auf 'height: auto' setzen
        detailsElement.addEventListener('transitionend', function handler() {
            if (detailsElement.classList.contains('active')) {
                 detailsElement.style.height = 'auto';
            }
            detailsElement.removeEventListener('transitionend', handler);
        }, { once: true });
        
        // Pfeil drehen
        if (arrow) {
            arrow.style.transform = 'rotate(90deg)';
        }

    } else {
        // --- SCHLIESSEN ---
        
        // Zuerst die aktuelle Höhe explizit auf Pixelwert setzen
        detailsElement.style.height = detailsElement.scrollHeight + "px";
        
        // Dann nach kurzem Timeout auf 0 animieren
        setTimeout(() => {
            detailsElement.style.height = '0';
            detailsElement.classList.remove('active');
        }, 10); 

        // Pfeil zurückdrehen
        if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
        }
    }
}
// -----------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {

    // 1. Logik für die Project Cards
    const projectHeaders = document.querySelectorAll('.project-header');

    projectHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const projectId = header.getAttribute('data-project-id');
            toggleProjectDetails(projectId);
        });
    });

    // -------------------------------------------------------------------------------
    
    // 2. Logik für das Hamburger Menü (jetzt im selben Block)
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) { // Zusätzliche Prüfung, falls Elemente nicht gefunden werden
        
        // Füge den Event-Listener für den Klick hinzu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
            
            const isExpanded = hamburger.classList.contains('open');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Schließe das Menü, wenn ein Link geklickt wird
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Nur schließen, wenn das Menü tatsächlich offen ist
                if (navMenu.classList.contains('open')) {
                    hamburger.classList.remove('open');
                    navMenu.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});