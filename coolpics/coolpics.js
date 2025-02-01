document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('nav');

    menuButton.addEventListener('click', function() {
        navMenu.classList.toggle('hide');
    });

    function handleResize() {
        if (window.innerWidth > 1000) {
            navMenu.classList.remove('hide');
        } else {
            navMenu.classList.add('hide');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // imddediatly when page loads

    function viewerTemplate(src, alt) {
        return `
        <div class="viewer">
            <button class="close-viewer">X</button>
            <img src="${src}" alt="${alt}">
        </div>`;
    }

    function viewHandler(event) {
        if (event.target.tagName === 'IMG') {
            const imgSrc = event.target.src.split('-')[0] + '-full.jpeg';
            const imgAlt = event.target.alt;
            document.body.insertAdjacentHTML("afterbegin", viewerTemplate(imgSrc, imgAlt));

            document.querySelector('.close-viewer').addEventListener('click', closeViewer);
        }
    }

    function closeViewer() {
        document.querySelector('.viewer').remove();
    }

    document.querySelector('.gallery').addEventListener('click', viewHandler);
})