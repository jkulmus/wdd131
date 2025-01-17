const themeSelector = document.querySelector('#theme-selector');
const body = document.body;
const logo = document.getElementById('logo');

function changeTheme() {
    if (themeSelector.value === 'dark') {
        body.classList.add('dark');
        logo.src = 'byui-logo-white.webp';
    } else {
        body.classList.remove('dark');
        logo.src = 'byui-logo.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);