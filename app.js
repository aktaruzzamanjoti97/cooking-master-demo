const searchFood = () => {
    //সার্চ বক্স কে ধরা
    const searchInput = document.getElementById('search-input').value;

    //সার্চবক্সে আমি যা সার্চ করবো টা dynamic ভাবে url এ দিবো 
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;


    //meal এর নামের api টা লোড করবো
    fetch(url)
            .then(res => res.json())
            .then(data => displayMeal(data.meals)) //displayMeal ফাংশন টা কল করছি fetch এর ভিতর
   

}


//name লিখে সার্চ দিলে যাকিছু আসবে সেটার রেজাল্ট দেখাবো displayMeals ফাংশন দিয়ে
const displayMeal = meals => {


    //প্যারেন্ট div টাকে ধরলাম
    const mealContainer = document.getElementById('meal');

    //নতুন কোন কিছু সার্চ দিলে আগের রেজাল্ট যেন empty হয়ে যায় 
    mealContainer.innerHTML = "";


    //displayMeals ফাংশন দিয়ে data.meals যে array টা meals প্যারামিটার দিয়ে আসছে সেগুলা আমি একটা একটা করে UI তে দেখাবো
    meals.forEach(meal => {

        //প্যারেন্ট div এর ভিতর একটা নতুন div বানালাম
        const mealDiv = document.createElement('div');
        //নতুন div এর class বানালাম আমার সুবিধামতো কারণ নতুন div টাকে একটু size করলাম আর কি style.css দিয়ে।
        mealDiv.className = 'meal-item'

        //ui তে যে meal আসবে সেগুলা একটা একটা করে দেখাবো Dynamic ভাবে তার ছবি এবং নাম।
        const mealInfo = `
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="meal-name">
                <h3>${meal.strMeal}</h3>
            </div>
        `;


        //উপরে যে কিছু html লিখলাম সেগুলা নতুন div এর ভিতরে দিয়ে দিলাম।
        mealDiv.innerHTML = mealInfo;

        //নতুন div টাকে প্যারেন্ট div এর বাচ্চা বানিয়ে দিলাম :v
        mealContainer.appendChild(mealDiv);


        //এখন নতুন div এর ভিতরে কি আছে? ওই যে কিছু html লিখলাম। তো এই div এর ভিতরেই ছবি এবং তার নাম রয়েছে। তো আমি এখন কি চাই? ছবির div এর ক্লিক করলে যেন তার ingredients দেখায় সেজন্য নতুন div টায় onclick দিলাম। 
        mealDiv.onclick = function () {
            //onclick এর ভিতরে ingredients শো করার ফাংশন call করলাম। 
            displayIngredient(meal.idMeal); //একটু খেয়াল করে দেখেন? আমি ফাংশনের ভিতর কাকে পাঠাচ্ছি? আমি যে স্পেসিফিক ছবির উপর ক্লিক করলাম ওই ছবির আইডি পাঠাচ্ছি। কারণ আমি শুধুমাত্র সেটার ingredients দেখবো যেটার উপর ক্লিক করছি। আর এইজন্যে আমাকে স্পেসিফিক ছবির id পাঠাতে হবে। 
        }
    });

}

//ingredient এর url নিয়ে আসার ফাংশন। এটার parameter foodId দিয়ে কি যাচ্ছে বলেন তো? বুঝতে হলে ৫৮ নাম্বার লাইনটা বুঝতে হবে।
const displayIngredient = foodId => {

    //এই foodId দিয়ে মূলত meal.idMeal মানে স্পেসিফিক ছবির স্পেসিফিক id টাকে dynamic ভাবে পাঠাচ্ছি। এখন প্রশ্ন হল, dynamic কেন? dynamic যদি না করি তাহলে আমি যে ছবি ক্লিক করছি সেটার স্পেসিফিক id দিয়ে তার ingredients গুলো দেখাতে পারবো না। যা খুব কষ্টদায়ক :(
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    fetch(url)
        .then(res => res.json())

        //এখানে data.meals[0] দিয়েছি কারণ নতুন url এ array access করে তার ০ তম property টা দেখাবো ingredient এ।
        .then(data => renderMealInfo(data.meals[0])) //ingredient শো করার ফাংশন কল করলাম।
}


//ingredient শো করার ফাংশন।
const renderMealInfo = meal => {

    //যেখানে ingredient শো করতে চাচ্ছি সেখানকার div ধরলাম। 
    const mealDiv = document.getElementById('meal-details-content');


    //আমার স্পেসিফিক meal এর নাম, category, ৬ টা ingredients দেখানোর জন্য কিছু html লিখলাম এবং যে div টাকে ধরলাম সেই div এর ভিতরে innerHtml হিসেবে দিয়ে দিলাম।
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


    //সার্চ বাটনে যখন ক্লিক করবো ui তে দেখানো পুরনো রেজাল্ট যেন empty হয়ে যায় তার জন্যে এই কাজ। 
    const searchBtn = document.getElementById('search-button');
    searchBtn.addEventListener("click", function () {
        mealDiv.innerText = "";
    })
}


