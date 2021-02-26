import { elements } from "../base.js";

export const clearSingleMeal = () => {
  elements.singleMeal.innerHTML = "";
};

export const clearMealList = () => {
  elements.mealList.innerHTML = "";
};

export const showLoader = () => {
  elements.loader.style.display = "flex";
};

export const clearLoader = () => {
  elements.loader.style.display = "none";
};

export const clearTitle = () => {
  elements.searchTitleBox.innerHTML = '';
}

export const renderTitle = (type) => {
  // console.log(elements.formInput.value);
  const markup =
    elements.formInput.value && type
      ? `
    Search Result for 
    <span class="search-title-name" id="searchTitle">"${elements.formInput.value}"<span>
    `
      : `Sorry no result for <span class="search-title-name" id="searchTitle">${elements.formInput.value} !</span>  have a look at " <span class="search-title-name" id="searchTitle">pork</span> "`;

  elements.searchTitleBox.innerHTML = markup;
};

// Meals list for search result
export const renderMealList = (meals) => {
  const markup = meals
    .map((meal) => {
      return `
    <div class="meal" data-id=${meal.idMeal}>
      <img
        class="meal-img"
        src=${meal.strMealThumb}
        loading="lazy"
        alt=${meal.strMeal}
      />
      <div class="meal-info">
        <h1 class="meal-title">${meal.strMeal}</h1>
      </div>
    </div>
    `;
    })
    .join("");

  elements.mealList.insertAdjacentHTML("beforeend", markup);
};

// Single meal page
export const renderSingleMeal = (meal) => {
  const title = meal.strMeal,
    imgSrc = meal.strMealThumb,
    mealType = meal.strCategory,
    mealArea = meal.strArea,
    mealInstruction = meal.strInstructions,
    ingredients = parseIngredients(meal),
    link = meal.strYoutube;

  const markup = `
  <h1 class="single__meal--title" id="single__meal--title">${title}</h1>
  <img src=${imgSrc} id="single__meal--img" class="single__meal--img" loading="lazy" alt="img" />
  <div class="single__meal--details">
      <p class="single__meal--details-type" id="single__meal--type">${mealType}</p>
      <p class="single__meal--details-area" id="single__meal--area">${mealArea}</p>
  </div>
  <div class="single__meal--instruction">
    <h1 class="single__meal--instruction-title">How To</h1>
      <p class="single__meal--instruction-steps">
         ${mealInstruction}
      </p>
 </div>
  <div class="single__meal--ingredients">
    <h1 class="single__meal--ingredients-title">Ingredients</h1>
      <ul class="single__meal--ingredients-list">
        ${ingredients.map((item) => `<li>${item}</li>`).join("")}
      </ul>
  </div>
  <div class="single__meal--watch">
    <a href=${link} target="_blank">
      <span><i class="fab fa-youtube"></i></span>
        Watch now
     </a>
  </div>
  `;

  elements.singleMeal.insertAdjacentHTML("beforeend", markup);
};

// Parse ingredients list from data
function parseIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  return ingredients;
}
