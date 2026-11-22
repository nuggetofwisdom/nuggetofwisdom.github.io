import recipes from './recipes.mjs';

// ---------- Random helpers ----------

// Returns a random whole number from 0 up to (but not including) num.
function random(num) {
	return Math.floor(Math.random() * num);
}

// Returns a random item from any array.
function getRandomListEntry(list) {
	const index = random(list.length);
	return list[index];
}

// ---------- Template functions ----------

// Builds the list of tag buttons for a recipe.
function tagsTemplate(tags) {
	return tags
		.map((tag) => `<li class="recipe-tag">${tag}</li>`)
		.join('');
}

// Builds a 5-star rating. Supports half stars (e.g. 4.5).
function ratingTemplate(rating) {
	let html = `<span
		class="rating"
		role="img"
		aria-label="Rating: ${rating} out of 5 stars"
	>`;

	for (let star = 1; star <= 5; star++) {
		if (rating >= star) {
			html += '<span aria-hidden="true" class="icon-star">⭐</span>';
		} else if (rating >= star - 0.5) {
			html += '<span aria-hidden="true" class="icon-star icon-star-half">⭐</span>';
		} else {
			html += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
		}
	}

	html += '</span>';
	return html;
}

// Builds the full card for a single recipe.
function recipeTemplate(recipe) {
	return `<article class="recipe-card">
		<img class="recipe-image" src="${recipe.image}" alt="Image of ${recipe.name}">
		<div class="recipe-info">
			<ul class="recipe-tags">
				${tagsTemplate(recipe.tags)}
			</ul>
			<h2 class="recipe-name">${recipe.name}</h2>
			${ratingTemplate(recipe.rating)}
			<p class="recipe-description">${recipe.description}</p>
		</div>
	</article>`;
}

// ---------- Rendering ----------

const recipeList = document.querySelector('#recipe-list');

// Renders an array of recipes to the page.
function renderRecipes(recipeArray) {
	if (recipeArray.length === 0) {
		recipeList.innerHTML = '<p class="no-results">No recipes matched your search. Try another keyword.</p>';
		return;
	}

	recipeList.innerHTML = recipeArray.map(recipeTemplate).join('');
}

// ---------- Search / filter / sort ----------

// Returns true if the recipe's name, description, or any tag contains the query.
function recipeMatches(recipe, query) {
	return (
		recipe.name.toLowerCase().includes(query) ||
		recipe.description.toLowerCase().includes(query) ||
		recipe.tags.find((tag) => tag.toLowerCase().includes(query)) !== undefined
	);
}

// Filters the recipes by the query, then sorts the results by name.
function filterRecipes(query) {
	return recipes
		.filter((recipe) => recipeMatches(recipe, query))
		.sort((a, b) => a.name.localeCompare(b.name));
}

// Handles the search form: read input, filter, sort, render.
function searchHandler(event) {
	event.preventDefault();

	const searchInput = document.querySelector('#search-input');
	const query = searchInput.value.trim().toLowerCase();

	const filteredRecipes = filterRecipes(query);
	renderRecipes(filteredRecipes);
}

// ---------- Init ----------

function init() {
	const recipe = getRandomListEntry(recipes);
	renderRecipes([recipe]);

	document.querySelector('.search-form').addEventListener('submit', searchHandler);
	document.querySelector('#current-year').textContent = new Date().getFullYear();
}

init();
