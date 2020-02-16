import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';
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

  if(query){
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
      alert('Something Wrong with the search');
      console.error(error);
      clearLoader();
    }
  }
};


elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn){
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// RECIPE CONTROLLER

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  if(id){
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
      console.log(state.recipe)
    } catch (error) {
      alert('Error processing recipe!');
      console.error(error);
    }
  }
};

["hashchange", "load"].forEach( evt => window.addEventListener(evt, controlRecipe));
