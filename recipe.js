
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


// -------------------Your Recipes--------------------

var userRecipe = firebase.database().ref('Recipes');

var addRecipeBtn = document.getElementById('addRecipeBtn');
addRecipeBtn.addEventListener('click', openRecipeBox);

function openRecipeBox(e){
    e.preventDefault();
    document.getElementById('exampleModal').style.display='block';
}

var addRecipeForm = document.getElementById('addRecipeForm');
addRecipeForm.addEventListener('submit', submitRecipeData);

var img=document.getElementById('output_recipe_image');

function submitRecipeData(e){
    e.preventDefault();

    var d=new Date();
    var getId=d.getTime();
    var recipe_id = getId;
    var recipe_name = getInputValue('recipe_name');
    var recipe_intro = getInputValue('recipe_intro');
    var recipe_ingredients = getInputValue('recipe_ingredient');
    var recipe_procedure = getInputValue('recipe_procedure');

    var recipe_image = getInputValue('recipe_image');

    saveRecipe(recipe_id,recipe_name,recipe_intro,recipe_ingredients,recipe_procedure,recipe_image);
    addRecipeForm.reset();
}

function getInputValue(id){
    return document.getElementById(id).value;
}

function saveRecipe(recipe_id,recipe_name,recipe_intro,recipe_ingredients,recipe_procedure,recipe_image){
    var newRecipe = userRecipe.push();
    newRecipe.set({
        recipe_id:recipe_id,
        recipe_name:recipe_name,
        recipe_intro:recipe_intro,
        recipe_ingredients:recipe_ingredients,
        recipe_procedure:recipe_procedure,
        recipe_image:recipe_image
    });

    getRecipes();
}


function getRecipes(){
    userRecipe.on('value',function(snapshot){
        var childData = snapshot.val();
        var keys = Object.keys(childData);
        
        var recipes = document.getElementById('yourRecipes');
        var eachRecipe='';
        for(var i=0; i<keys.length; i++){
            var key = keys[i];
            var recipe_id = childData[key].recipe_id;
            var recipe_image = childData[key].recipe_image;
            var recipe_name = childData[key].recipe_name;
            var recipe_intro = childData[key].recipe_intro;
            var recipe_ingredients = childData[key].recipe_ingredients;
            var recipe_procedure = childData[key].recipe_procedure;

            //console.log(recipe_id,recipe_name,recipe_ingredients,recipe_procedure);
            eachRecipe +=
            `<div class="card shadow h-100" style="width: 18rem;">

                <img id="output_recipe_image" 
                    src="${recipe_image}"
                    class="card-img-top" 
                    alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">${recipe_name}</h5>
                  <p class="card-text">
                    <textarea class="form-control form-control-sm" rows="3" cols="63">
                    ${recipe_intro}
                    </textarea>
                  </p>
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                      View Recipe
                  </button>

                  <!-- Modal -->
                  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                          <div class="modal-content">
                              <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLongTitle">${recipe_name}</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <div class="modal-body">
                                <img id="output_recipe_image" 
                                    src="${recipe_image}"
                                    class="card-img-top" 
                                    alt="Card image cap"
                                />
                                  <h5 class="modal-title" id="exampleModalLongTitle">Ingredients</h5>
                                  ${recipe_ingredients}
                                  <h5 class="modal-title" id="exampleModalLongTitle">Procedure</h5>
                                  ${recipe_procedure}
                              </div>
                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
            </div>`;
        }
        recipes.innerHTML = eachRecipe;
    })
}



// function getRecipes(){
//     var recipes = document.getElementById('yourRecipes');
//    var eachRecipe = '';
//     firebase.database().ref('Recipes').on('value',function(snapshot){
//         snapshot.forEach(function(childSnapshot){
//             var childKey = childSnapshot.key;
//             var childData = childSnapshot.val();

//             console.log(childKey,childData);

//             eachRecipe +=
//             `<div class="card shadow p-3 col-4" style="width: 18rem;">
//                 <img class="card-img-top" src="${childData['recipe_image']}" alt="Card image cap">
//                 <div class="card-body">
//                     <h5 class="card-title">${childData['recipe_name']}</h5>
//                     <p class="card-text">
//                         ${childData['recipe_intro']}
//                     </p>
//                     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
//                         View Recipe
//                     </button>

//                     <!-- Modal -->
//                     <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//                         <div class="modal-dialog modal-dialog-centered" role="document">
//                             <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h5 class="modal-title" id="exampleModalLongTitle">${childData['recipe_name']}</h5>
//                                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                         <span aria-hidden="true">&times;</span>
//                                     </button>
//                                 </div>
//                                 <div class="modal-body">
//                                     ${childData['recipe_image']}
//                                     <h5 class="modal-title" id="exampleModalLongTitle">Ingredients</h5>
//                                     ${childData['recipe_ingredients']}
//                                     <h5 class="modal-title" id="exampleModalLongTitle">Procedure</h5>
//                                     ${childData['recipe_procedure']}
//                                 </div>
//                                 <div class="modal-footer">
//                                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>`;
//         })
//         recipes.innerHTML=eachRecipe;
//     })
// }
