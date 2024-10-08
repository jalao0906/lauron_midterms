// DOM Elements
const recipeForm = document.getElementById('recipeForm');
const recipeList = document.getElementById('recipeList');
const ingredientInput = document.getElementById('ingredientInput');
const stepInput = document.getElementById('stepInput');
const ingredientList = document.getElementById('ingredientList');
const stepList = document.getElementById('stepList');
const addIngredientBtn = document.getElementById('addIngredient');
const addStepBtn = document.getElementById('addStep');

// Arrays to store ingredients and steps
let ingredients = [];
let steps = [];
let recipes = [];
let isEditing = false;
let currentIndex = null;

// Add Ingredients to List
addIngredientBtn.addEventListener('click', function() {
    const ingredient = ingredientInput.value.trim();
    if (ingredient) {
        ingredients.push(ingredient);
        ingredientInput.value = '';
        renderIngredientList();
    }
});

// Add Steps to List
addStepBtn.addEventListener('click', function() {
    const step = stepInput.value.trim();
    if (step) {
        steps.push(step);
        stepInput.value = '';
        renderStepList();
    }
});

// Render Ingredient List
function renderIngredientList() {
    ingredientList.innerHTML = '';
    ingredients.forEach((ingredient, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `${ingredient} <button class="btn btn-danger btn-sm float-end" onclick="removeIngredient(${index})"><i class="fas fa-trash-alt"></i></button>`;
        ingredientList.appendChild(li);
    });
}

// Render Step List
function renderStepList() {
    stepList.innerHTML = '';
    steps.forEach((step, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `${step} <button class="btn btn-danger btn-sm float-end" onclick="removeStep(${index})"><i class="fas fa-trash-alt"></i></button>`;
        stepList.appendChild(li);
    });
}

// Remove Ingredient
function removeIngredient(index) {
    ingredients.splice(index, 1);
    renderIngredientList();
}

// Remove Step
function removeStep(index) {
    steps.splice(index, 1);
    renderStepList();
}

// Render Recipes
function renderRecipes() {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            <div>
                <strong>${recipe.name}</strong>
                <ul>Ingredients: ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                <ol>Steps: ${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>
                <p>Time: ${recipe.time} minutes</p>
                <p><img src="${recipe.image}" alt="Recipe Image" width="300"></p>
            </div>
            <div class="actions">
                <button class="btn btn-warning edit" onclick="editRecipe(${index})" ${isEditing ? 'disabled' : ''}>
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger delete" onclick="deleteRecipe(${index})" ${isEditing ? 'disabled' : ''}>
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        recipeList.appendChild(li);
    });
}

// Add or Edit Recipe
recipeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const recipeName = document.getElementById('recipeName').value;
    const time = document.getElementById('time').value;
    const image = document.getElementById('image').value;

    const recipe = {
        name: recipeName,
        ingredients: [...ingredients],
        steps: [...steps],
        time: time,
        image: image
    };

    if (isEditing) {
        recipes[currentIndex] = recipe;
        isEditing = false;
        currentIndex = null;
    } else {
        recipes.push(recipe);
    }

    // Clear the form and reset lists
    ingredients = [];
    steps = [];
    recipeForm.reset();
    renderIngredientList();
    renderStepList();
    renderRecipes();
});

// Edit Recipe
function editRecipe(index) {
    isEditing = true;
    currentIndex = index;
    
    const recipe = recipes[index];
    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('time').value = recipe.time;
    
    ingredients = [...recipe.ingredients];
    steps = [...recipe.steps];
    
    renderIngredientList();
    renderStepList();

    renderRecipes();
}

// Delete Recipe
function deleteRecipe(index) {
    const confirmDelete = confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
        recipes.splice(index, 1);
        renderRecipes();
    }
}

// Initial render
renderRecipes();
