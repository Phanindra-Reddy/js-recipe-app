var firebaseConfig = {
    apiKey: "AIzaSyDIXlkjnfYecrpgboqsN-0WbQ5OTsXJfzU",
    authDomain: "recipe-app-9ae80.firebaseapp.com",
    databaseURL: "https://recipe-app-9ae80.firebaseio.com",
    projectId: "recipe-app-9ae80",
    storageBucket: "recipe-app-9ae80.appspot.com",
    messagingSenderId: "705071174496",
    appId: "1:705071174496:web:88b335818960a0bffbc405",
    measurementId: "G-V1RLFC0MN1"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

//----------------------------Home Recipes----------------------

const searchForm = document.querySelector("form");
const homeRecipesDiv = document.querySelector("#homeRecipes");
const recipeContainer = document.querySelector(".recipes-container");
let searchQuery = "";
const APP_ID = "13d09cac";
const APP_key = "b11a1f91747f198d553ac896f5dff0ec";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchRecipeAPI();
});

async function fetchRecipeAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    recipeData(data.hits);
}

function recipeData(results){
    let generatedRecipeData = "";
    results.map((result) => {
    generatedRecipeData += `
    <div class="card shadow mb-3" style="width: 20rem;">
        <img class="card-img-top" src="${result.recipe.image}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title d-flex justify-content-between">${result.recipe.label}
                <a 
                    href="${result.recipe.url}" 
                    class="btn btn-primary"
                    target="_blank"
                >
                    View Recipe
                </a>
            </h5>
            <p class="card-text">
                <ul class="a">
                    <li><strong>Calories:</strong> ${result.recipe.calories.toFixed(2)}</li>
                    <li><strong>Diet label:</strong> ${
                        result.recipe.dietLabels.length > 0
                          ? result.recipe.dietLabels
                          : "No Data Found"
                      }
                    </li>
                    <li><strong>Health label:</strong> ${result.recipe.healthLabels}</li>
                </ul>
            </p>
        </div>
        <form action="" class="user_rating">
            <div class="card-footer d-flex justify-content-between">
                <small class="text-muted">
                    <span class="fa fa-star fa-2x"></span>
                    <span class="fa fa-star fa-2x"></span>
                    <span class="fa fa-star fa-2x"></span>
                    <span class="fa fa-star fa-2x"></span>
                    <span class="fa fa-star fa-2x"></span>
                </small>
                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Add to Favourites">
                    <a href="#"><i class="fa fa-heart-o fa-2x" style="color:black;"></i></a>
                </span>
            </div>
        </form>
    </div>
    `;
  });
  homeRecipesDiv.innerHTML = generatedRecipeData;
}