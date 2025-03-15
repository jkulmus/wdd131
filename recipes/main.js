import recipes from "./recipes.mjs";

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

function tagsTemplate(tags) {
    let html = '';
    tags.forEach(tag => {
        html += `<li>${tag}</li>`;
    });
    return html;
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `<figure class="recipe">
        <img src="${recipe.image}" alt="image of ${recipe.name}">
        <figcaption>
            <ul class="recipe__tags">
                ${tagsTemplate(recipe.tags)}
            </ul>
            <h2>${recipe.name}</h2>
            <p class="recipe__ratings">
                ${ratingTemplate(recipe.rating)}
            </p>
            <p class="recipe__description">
                ${recipe.description}
            </p>
        </figcaption>
    </figure>`;
}

function renderRecipes(recipeList) {
    const recipeSection = document.getElementById('recipes-container');
    let html = '';
    if (recipeList.length === 0) {
        html = '<p>No recipes found. Please try a different search term.</p>';
    } else {
        recipeList.forEach(recipe => {
            html += recipeTemplate(recipe);
        });
    }
    recipeSection.innerHTML = html;
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

init();

function filterRecipes(query, filters = {}) {
    const lowerQuery = query.toLowerCase();
    let filtered = recipes;

    if (query) {
        filtered = filtered.filter(recipe => {
            return (
                recipe.name.toLowerCase().includes(lowerQuery) ||
                recipe.description.toLowerCase().includes(lowerQuery) ||
                recipe.tags.find(tag => tag.toLowerCase().includes(lowerQuery)) ||
                recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(lowerQuery))
            );
        });
    }

    if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter(recipe => {
            return filters.tags.every(tag => recipe.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()));
        });
    }

    const sorted = filtered.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    });

    return sorted;
}

function searchHandler(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value;
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', debounce(searchHandler, 300));

document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    searchHandler(e);
});