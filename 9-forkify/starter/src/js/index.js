import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


// CONTROLLER: this is where for instance all event listeners and handlers are located.


// This works with all below commented out...
/* const search = new Search('tomato');
console.log(search);
search.getResults(); */

/* Global state of the app.
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipe
*/

const state = {};

/* const search = new Search('pizza');
console.log(search);
search.getResults(); */

/**
 * SEARCH CONTROLLER
 * 
 */
const controlSearch = async () => {
  // 1. Get query from view. There will be function in the view model which gets the 
     // search from the view. 
  //const query = 'pizza';  // TODO
  const query = searchView.getInput();
  console.log(query);

  if (query) {
    // 2. New search object and add to state.
    state.search = new Search(query);

    // 3. Prepare UI for results.
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResults);

    // 4. Search for recipes.
    await state.search.getResults();  // Search is an asynchronuous function, so before we can 
    // render the results we need to wait until the function is done executing. Therefore, we need
    // the 'await' here.

    // 5. Render results on UI.
    //console.log(state.search.result); 
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

// Use event delegation, i.e., use an elements we know exists on the page.
elements.searchResultsPages.addEventListener('click', event => {
  // btn will define the area where the button is located, including the triangle. This is 
  // needed as otherwise a user click on the triangle will call the type event, and we don't want
  // that to happen.
  const btn = event.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);  // this extracts the page from the button HTML object
    // The name of the dataset in this case is "goto".
    console.log(goToPage);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }

})

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = () => {
  const id = window.location.hash;
  console.log(id)
};

// The window object is the parent object of the browser.
// Further, we're looking for the change in the ID which we
// programmed as a query parameter, so now we can listen for it:
window.addEventListener('hashchange', controlRecipe);
