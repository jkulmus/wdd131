document.addEventListener('DOMContentLoaded' () => {
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.querySelector('nav ul');

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('visible');
    });
});