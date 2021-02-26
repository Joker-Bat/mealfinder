import { elements } from "./base.js";
import Search from "./models/Search.js";
import SearchById from "./models/SearchById.js";
import RandomSearch from "./models/RandomSearch.js";
import * as searchView from "./views/SearchView.js";

const state = {};

// For testing purpose

// const { log: c } = console;
// window.s = state;

const searchMeal = async () => {
  const query = elements.formInput.value;
  elements.formInput.blur();
  if (query) {
    // Create a new Search object in state
    state.search = new Search(query);

    // Show loader
    searchView.showLoader();
    // Get meal data and store it in state.search.result

    await state.search.getResults();

    // Clear previous Results of search
    searchView.clearSingleMeal();
    searchView.clearMealList();

    // console.log(state.search.result);

    searchView.renderTitle(state.search.result.meals);
    elements.formInput.value = "";

    // Clear loader after fetch data
    searchView.clearLoader();

    // Render MealList from data
    searchView.renderMealList(state.search.result.meals);

    // Render Single Meal
    // searchView.renderSingleMeal(state.search.result.meals[0]);
  }
};

const getSingleMeal = async (e) => {
  const selectedMeal = e.target.closest(".meal");
  const id = selectedMeal.getAttribute("data-id");

  if (id) {
    state.searchById = new SearchById(id);

    // Show loader
    searchView.showLoader();
    // wait for response
    await state.searchById.getResults();

    // Clear previous result of a single page
    searchView.clearSingleMeal();

    // Clear Loader
    searchView.clearLoader();

    // Render Single Meal
    searchView.renderSingleMeal(state.searchById.result.meals[0]);
  }
};

const getRandomMeal = async (e) => {
  // Remove SearchList title
  searchView.clearTitle();

  state.randomSearch = new RandomSearch();

  // Show loader
  searchView.showLoader();

  await state.randomSearch.getResults();

  // Clear previous result of a single page
  searchView.clearSingleMeal();
  searchView.clearMealList();

  // Render Random Single meal
  // c(state.randomSearch.result.meals[0]);

  searchView.renderSingleMeal(state.randomSearch.result.meals[0]);
  searchView.clearLoader();
};

// SearchButton Actions
elements.searchBtn.addEventListener("click", searchMeal);

// Generate Random meal
elements.randomBtn.addEventListener("click", getRandomMeal);

// Click on a meal to get single meal details
elements.mealList.addEventListener("click", getSingleMeal);

// Theme Toggler Button Action
elements.themeToggler.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
});

// Prevent Default Reload of Form buttons
elements.actionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
