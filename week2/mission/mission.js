const themeSelector = document.querySelector('#theme-selector');

function changeTheme() {
    const currentTheme = themeSelector.value;
    const bodyElement = document.body;
    const logo = document.querySelector('img');

    if (currentTheme === 'Dark') {
        bodyElement.classList.add('dark');
        logo.src = 'byui-logo_white.png';
    } else {
        bodyElement.classList.remove('dark');
        logo.src = 'byui-logo.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);