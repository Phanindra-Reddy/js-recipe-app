// -------------------------Home--------------------



// -------------------Your Recipes--------------------

var addRecipeBtn = document.getElementById('addRecipeBtn');
addRecipeBtn.addEventListener('click',addRecipe);

var your_recipe_form=document.getElementById('exampleModal');

function addRecipe(e){
    e.preventDefault();

}

var addIngredient = document.getElementById('addIngredient');
addIngredient.addEventListener('click', createInputForIngedient);

var ingredient_input=document.getElementById('ingredient_input');

function  createInputForIngedient(){
    console.log('hello');
    // ingredient_input.innerHTML =
    //     `<input class="form-control form-control-sm" type="text" placeholder="Ingredient(Ex: 4 Onions)">`;
    ingredient_input.innerText='hello';
}


// -------------------Favourites--------------------


