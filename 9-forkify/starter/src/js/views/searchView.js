import {elements} from './base';

export const getInput = () => elements.searchInput.value; 

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResultsList.innerHTML = '';
  elements.searchResultsPages.innerHTML = '';  // for pagination button clearance
};

export const limitRecipeTitle = (title, limit = 12) => {
  // We don't want title that are too long. In those cases we chop off the title and replace
  // overhanging words by three dots '...'

  // Create an array that holds those words that exceed the limit.
  const newTitle = [];  // can be a const, we can still add elements to it
  if (title.length > limit) {
    // Split title into its words, and use a accumulator.
    // EXAMPLE: "Pasta with tomato and spinach"
    // acc:0 / acc + cur.length = 5 / newTitle = ['Pasta']
    // acc:1 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
    // acc:2 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
    // acc:3 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato', 'and']

    // We're taking advantage of the accumulator, which is already part of the reduce method.
    // That saves us from constructing an accumulator array.
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    // Return the result.
    return `${newTitle.join(' ')} ...`;
  }
  return title;
}

export const renderRecipe = recipe => {
  // This is where the rendering will actually happen. Because we use ES6 we can paste
  // dynamically generated HTML code right here, using single backticks, which is basically
  // a template string.
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;

  // Render it to the DOM.
  elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'; We just write HTML here.
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
  <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
  </button>
`;

const renderButtons = (page, numResults, resPerPage) => {

  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    // Only button go to next page.
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Both buttons.
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Only button to go to previous page.
    button = createButton(page, 'prev');
  }

  elements.searchResultsPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {

  // Render results of current page.
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // Render pagination buttons.
  renderButtons(page, recipes.length, resPerPage);

};