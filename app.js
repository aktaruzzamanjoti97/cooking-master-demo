const searchFood = () => {
    const searchInput = document.getElementById('search-input').value;

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    fetch(url)
            .then(res => res.json())
            .then(data => displayMeal(data.meals))
   

}


const displayMeal = meals => {
    const mealContainer = document.getElementById('meal');
    mealContainer.innerHTML = "";

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal-item'

        const mealInfo = `
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="meal-name">
                <h3>${meal.strMeal}</h3>
            </div>
        `;

        mealDiv.innerHTML = mealInfo;

        mealContainer.appendChild(mealDiv);

        mealDiv.onclick = function () {
            displayIngredient(meal.idMeal);
        }
    });

}


const displayIngredient = foodId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => renderMealInfo(data.meals[0]))
}


const renderMealInfo = meal => {
    const mealDiv = document.getElementById('meal-details-content');

    mealDiv.innerHTML = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="" srcset="">
    </div>
    <div class="recipe-instruction">
      <h3>Ingredients:</h3>
      <p><i class="fab fa-500px"></i>${meal.strIngredient1}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient2}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient3}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient4}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient5}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient6}</p>
    </div>
    
    <div class="recipe-order">
      <button href="#" target="_blank">Order Recipe</button>
    </div>
    `;

    const searchBtn = document.getElementById('search-button');
    searchBtn.addEventListener("click", function () {
        mealDiv.innerText = "";
    })
}