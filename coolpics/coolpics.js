document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const navLinks = document.querySelector('.nav-links');

    menuButton.addEventListener('click', () => {
        console.log('Menu button clicked');
        navLinks.classList.toggle('visible');
        console.log('Menu state:', navLinks.classList.contains('visible'));
    });

    function handleResize() {
        if (window.innerWidth > 1000) {
            navLinks.classList.remove('hide');
            menuButton.style.display = 'none'; // hide button
        } else {
            navLinks.classList.add('hide');
            menuButton.style.display = 'block'; // Show button
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

        const closeButton = document.querySelector('.close-viewer');
        closeButton.addEventListener('click', closeViewer);

        // prevent scrolling on main page when viewer open
        document.body.style.overflow = 'hidden';
    }

    function closeViewer() {
        const viewer = document.querySelector('.viewer');
        if (viewer) {
            viewer.remove();
        }

        // Re-enable scroling on main page when viewer closed
        document.body.style.overflow = 'auto';
    }

    document.querySelector(".gallery").addEventListener("click", viewHandler);
});