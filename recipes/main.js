import recipes from "./recipes.mjs";

const recipesContainer = document.getElementById('recipes-container');
const tagFilters = document.querySelectorAll('.tag-filters button');
const searchInput = document.querySelector('.search input');

let currentTag = 'all'; // Default tag

function displayRecipes(recipesArray) {
    recipesContainer.innerHTML = '';

    recipesArray.forEach(recipe => {
        if (currentTag === 'all' || recipe.tags.includes(currentTag.toLowerCase())) {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            const image = document.createElement('img');
            image.src = recipe.image;
            image.alt = recipe.name;

            const recipeDetails = document.createElement('div');
            recipeDetails.classList.add('recipe-details');

            const title = document.createElement('h2');
            title.textContent = recipe.name;

            const description = document.createElement('p');
            description.classList.add('description');
            description.textContent = recipe.description;

            const rating = document.createElement('span');
            rating.classList.add('rating');
            rating.setAttribute('role', 'img');
            rating.setAttribute('aria-label', `Rating: ${recipe.rating} out of 5 stars`);

            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                star.setAttribute('aria-hidden', 'true');
                star.classList.add(i < Math.floor(recipe.rating) ? 'icon-star' : 'icon-star-empty');
                star.textContent = '⭐';
                rating.appendChild(star);
            }

            recipeDetails.appendChild(title);
            recipeDetails.appendChild(description);
            recipeDetails.appendChild(rating);

            recipeDiv.appendChild(image);
            recipeDiv.appendChild(recipeDetails);

            recipeDiv.addEventListener('click', () => {
                recipeDiv.classList.toggle('selected');
            });

            recipesContainer.appendChild(recipeDiv);
        }
    });
}

function filterRecipes(tag) {
    currentTag = tag;
    displayRecipes(recipes);
}

tagFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        filterRecipes(filter.dataset.tag);
        tagFilters.forEach(btn => btn.classList.remove('active'));
        filter.classList.add('active');
    });
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchTerm) ||
               recipe.description.toLowerCase().includes(searchTerm) ||
               recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });
    displayRecipes(filteredRecipes);
});

displayRecipes(recipes); // Initial display
