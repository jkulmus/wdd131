import recipes from "./recipes.mjs";

const recipesContainer = document.getElementById('recipes-container');

function displayRecipes(recipesArray) {
    recipesContainer.innerHTML = ''; // Clear previous content

    recipesArray.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.name;

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

        recipeDiv.appendChild(image);
        recipeDiv.appendChild(title);
        recipeDiv.appendChild(description);
        recipeDiv.appendChild(rating);

        recipesContainer.appendChild(recipeDiv);
    });
}

displayRecipes(recipes);