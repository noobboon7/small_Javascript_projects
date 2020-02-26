import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import { elements, renderLoader, clearLoader } from "./views/base";
import List from "./models/List";
/** Global state of the app
 * - Search object
 * - Current State
 * - Shopping List
 * - Liked recipes
 */

const state = {};

const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput();

	if (query) {
		// 2 search object and add to state
		state.search = new Search(query);

		// 3 Prepare Ui for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);
		try {
			//  4 Search for recipes
			await state.search.getResults();

			// 5 Render results on UI
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (error) {
			alert("Something Wrong with the search");
			console.error(error);
			clearLoader();
		}
	}
};

elements.searchForm.addEventListener("submit", e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
	const btn = e.target.closest(".btn-inline");
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

// RECIPE CONTROLLER

const controlRecipe = async () => {
	// get ID from url
	const id = window.location.hash.replace("#", "");
	if (id) {
		// prepping UI
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		// Highlight selected search item
		if (state.search) searchView.highlightSelected(id);

		// create recipe id
		state.recipe = new Recipe(id);
		try {
			// get recipe info and format ingredients
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			// Calc recipe serve + time
			state.recipe.calcTime();
			state.recipe.calcServings();

			// render recipe
			clearLoader();
			recipeView.renderRecipe(state.recipe);
			// console.log(state.recipe);
		} catch (error) {
			alert("Error processing recipe!");
			console.error(error);
		}
	}
};

["hashchange", "load"].forEach(evt =>
	window.addEventListener(evt, controlRecipe),
);

// LIST CONTROLLER
const controlList = () => {
	// creates list if there is none yet
	if (!state.list) state.list = new List();

	// Add each ingredient to list
	state.recipe.ingredients.forEach(el => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderItem(item);
	});
};

// Handle delete and update list items event
elements.shopping.addEventListener("click", e => {
	const id = e.target.closest('.shopping__item').dataset.itemid
	console.log(e.target.closest('.shopping__item'), id);
	// Handle the delete button
	if (e.target.matches("shopping__delete, .shopping__delete *")) {
		// Delete from state
		state.list.deleteItem(id);
		// Delete form UI
		listView.deleteItem(id);
		// Handle count update
	} else if (e.target.matches(".shopping__count-value")) {
		const val = parseFloat(e.target.value);
		state.list.updateCount(id, val);
	}
});

// handling recipe button clicks
elements.recipe.addEventListener("click", e => {
	if (e.target.matches(".btn-decrease, .btn-decrease *")) {
		// Decreased button is clicked
		if (state.recipe.servings > 1) {
			state.recipe.updateServings("dec");
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (e.target.matches(".btn-increase, .btn-increase *")) {
		// Increased button is clicked
		state.recipe.updateServings("inc");
		recipeView.updateServingsIngredients(state.recipe);
	} else if (e.target.matches("recipe__btn--add, .recipe__btn--add *")) {
		controlList();
	}
});
