
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

// var userRecipe = firebase.database().ref('Recipes'/+recipe_id);

var addRecipeBtn = document.getElementById('addRecipeBtn');
addRecipeBtn.addEventListener('click', openRecipeBox);

function openRecipeBox(e){
    e.preventDefault();
    document.getElementById('exampleModal').style.display='block';
}

var addRecipeForm = document.getElementById('addRecipeForm');
addRecipeForm.addEventListener('submit', submitRecipeData);


function submitRecipeData(e){
    e.preventDefault();

    var d=new Date();
    var getId=d.getTime();
    var recipe_id = getId;
    var recipe_name = document.getElementById('recipe_name').value;
    var recipe_intro = document.getElementById('recipe_intro').value;
    var recipe_ingredients = document.getElementById('recipe_ingredients').value;
    var recipe_procedure = document.getElementById('recipe_procedure').value;

    var image = document.getElementById('recipe_image').files[0];
    var imageName = image.name;
    var storageRef=firebase.storage().ref('Recipe_Images/'+imageName);
    var uploadTask=storageRef.put(image);

    uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is "+progress+" done");
    },function(error){
        console.log(error.message);
    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){ 
            var userRecipe = firebase.database().ref('Recipes/');
            var newRecipe = userRecipe.push();
            newRecipe.set({
                recipe_id:recipe_id,
                recipe_name:recipe_name,
                recipe_intro:recipe_intro,
                recipe_ingredients:recipe_ingredients,
                recipe_procedure:recipe_procedure,
                recipe_image:downloadURL
            },function(error){
                if(error){
                    alert("Error while uploading");
                }else{
                    alert("Successfully uploaded");
                    addRecipeForm.reset();
                    $('#exampleModal').modal('hide');
                    getRecipes();
                }
            });
        });
    });
}


window.onload=function(){
    this.getRecipes();
}

function getRecipes(){
    firebase.database().ref('Recipes').once('value').then(function(snapshot){
        var data=snapshot.val();
        
        var recipes = document.getElementById('yourRecipes');
        var eachRecipe = '';

        for(let[key,value] of Object.entries(data)){
            
            eachRecipe +=
            `<div class="card shadow h-100" style="width: 20rem;">
                <img id="output_recipe_image" 
                    src="${value.recipe_image}"
                    class="card-img-top" 
                    alt="Card image cap"
                />   
                <div class="card-body">
                    <h5 class="card-title d-flex justify-content-between">
                        ${value.recipe_name}
                        <button id="${key}" onclick="delete_recipe(this.id)" class="btn btn-danger" title="Delete Recipe">
                            <i class="fa fa-trash"></i>
                        </button>
                    </h5>
                    
                    <p class="card-text" rows="3" >
                        <input type="text" class="form-control-plaintext" readonly
                            value="${value.recipe_intro}"
                        />
                    </p>
                
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${key}${value.recipe_id}">
                        View Recipe
                    </button>
    
                 
                    <div class="modal fade" id="${key}${value.recipe_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                             <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">${value.recipe_name}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <img id="output_recipe_image" 
                                        src="${value.recipe_image}"
                                        class="card-img-top" 
                                        alt="Card image cap"
                                    />
                                    <h5 class="modal-title" id="exampleModalLongTitle">Ingredients</h5>
                                        ${value.recipe_ingredients}
                                    <h5 class="modal-title" id="exampleModalLongTitle">Procedure</h5>
                                        ${value.recipe_procedure}
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
};

function delete_recipe(key){
    firebase.database().ref('Recipes/'+key).remove();
    getRecipes();
}

{/* <div class="card-footer d-flex justify-content-between">
<button id="${key}" onclick="delete_recipe(this.id)" class="btn btn-danger">
    Delete Recipe
</button>
</div> */}
