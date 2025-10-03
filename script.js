document.addEventListener('DOMContentLoaded', () => {

    const projectHeaders = document.querySelectorAll('.project-header');

    projectHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const details = header.nextElementSibling;

            details.classList.toggle('active');
        });
    });
});