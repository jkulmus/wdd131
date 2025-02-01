document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.querySelector('nav ul');

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('visible');
    });

    function handleResize() {
        if (window.innerWidth > 1000) {
            navLinks.classList.remove('hide');
        } else {
            navLinks.classList.add('hide');
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    function viewerTemplate(pic, alt) {
        return `
            <div class="viewer">
                <button class="close-viewer">X</button>
                <img src="${pic}" alt="${alt}">
            </div>`;
    }

    function viewHandler(event) {
        const element = event.target;
        if (!element.classList.contains('gallery-img')) return;

        const imgSrc = element.src.replace('-sm', '-lg'); // Adjust based on your naming convention
        const imgAlt = element.alt;

        const viewerHTML = viewerTemplate(imgSrc, imgAlt);
        document.body.insertAdjacentHTML("afterbegin", viewerHTML);

        document.querySelector('.close-viewer').addEventListener('click', closeViewer);
    }

    function closeViewer() {
        const viewer = document.querySelector('.viewer');
        if (viewer) {
            viewer.remove();
        }
    }

    document.querySelector(".gallery").addEventListener("click", viewHandler);
});