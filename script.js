/**
 * Toggle-Funktion zum Ein- und Ausblenden der Kartendetails.
 * Diese Funktion steuert JETZT auch die Pfeil-Drehung direkt.
 * @param {string} id - Die ID der Projektkarte.
 */

function toggleProjectDetails(id) {
    // 1. Finde das Detail-Element
    const detailsElement = document.getElementById(`details-${id}`);
    
    // 2. Finde den Header-Container
    const cardHeader = detailsElement.previousElementSibling;
    
    // 3. Finde den Pfeil im Header
    const arrow = cardHeader.querySelector('.arrow-icon');
    
    // 4. Toggle der 'active'-Klasse für die Details
    detailsElement.classList.toggle('active');

    // 5. Pfeil drehen, basierend auf dem Zustand
    if (detailsElement.classList.contains('active')) {
        // Wenn aktiv, 90 Grad drehen
        arrow.style.transform = 'rotate(90deg)'; 
    } else {
        // Wenn inaktiv, auf 0 Grad zurücksetzen
        arrow.style.transform = 'rotate(0deg)'; 
    }
}
document.addEventListener('DOMContentLoaded', () => {

    const projectHeaders = document.querySelectorAll('.project-header');

    projectHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const projectId = header.getAttribute('data-project-id');
            toggleProjectDetails(projectId);
        });
    });
});