document.addEventListener('DOMContentLoaded', function () {

let role = localStorage.getItem("role");

let defaultRecipes = [
     {
        id: 1,
        title: "Chocolate Chip Cookies 🍪",
        category: "Dessert",
        image: "cookies.jpg",
        ingredients: [
            { name: "Flour", qty: "2 ¾ cups" },
            { name: "Chocolate Chips", qty: "2 cups" },
            { name: "Brown Sugar", qty: "1 cup" },
            { name: "Sugar", qty: "½ cup" },
            { name: "Unsalted Butter", qty: "2 ½ sticks" },
            { name: "Eggs", qty: "2" },
            { name: "Vanilla Extract", qty: "2 teaspoons" },
            { name: "Baking Soda", qty: "1 teaspoon" },
            { name: "Salt", qty: "¾ teaspoon" }
        ],
        steps: [
            "Preheat oven to 375°F (190°C).",
            "Line a baking sheet.",
            "Mix butter and sugar.",
            "Add eggs and vanilla.",
            "Mix dry ingredients.",
            "Add chocolate chips.",
            "Bake 10–12 min."
        ],
        cookingTime: "12 minutes",
        servings: "12 people"
    },

    {
        id: 2,
        title: "Pizza 🍕",
        category: "Main Dish",
        image: "pizza.jpg",
        ingredients: [
            { name: "Dough", qty: "" },
            { name: "Flour", qty: "1 ½ cups" },
            { name: "Instant Yeast", qty: "1 teaspoon" },
            { name: "Warm Water", qty: "¾ cup" },
            { name: "Olive Oil", qty: "2 teaspoons" },

            { name: "Topping", qty: "" },
            { name: "Tomato Sauce", qty: "½ cup" },
            { name: "Mozzarella Cheese", qty: "1 ½ cups" },
            { name: "Pepperoni", qty: "¼ cup" },

            { name: "Pizza Sauce", qty: "" },
            { name: "Tomatoes (mashed)", qty: "6 large" },
            { name: "Vegetable Oil", qty: "1 tablespoon" },
            { name: "Garlic (minced)", qty: "1 teaspoon" },
            { name: "Onion (chopped)", qty: "½ cup" },
            { name: "Oregano/Thyme", qty: "½ teaspoon" },
            { name: "Red Pepper", qty: "2 tablespoons" },
            { name: "Salt", qty: "to taste" },
            { name: "Sugar", qty: "½ teaspoon" }
        ],
        steps: [
            "Dissolve yeast in warm water until bubbles form.",
            "Mix flour with yeast and olive oil.",
            "Knead until smooth dough forms.",
            "Let dough rest.",
            "Roll dough and add sauce and toppings.",
            "Bake for 15 minutes.",
            "Serve hot.",

            "For sauce:",
            "Heat oil in pan.",
            "Add garlic and onion.",
            "Add tomatoes and spices.",
            "Simmer for 3 minutes.",
            "Cool before using."
        ],
        cookingTime: "20 minutes",
        servings: "2 people"
    }
];


let storedRecipes = JSON.parse(localStorage.getItem("recipes"));

if (!storedRecipes || storedRecipes.length === 0) {
    storedRecipes = defaultRecipes;
    localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
}

storedRecipes = storedRecipes.map(recipe => {

    recipe.ingredients = recipe.ingredients.map(item => {
        if (typeof item === "string") {
            return {
                name: item,
                qty: ""
            };
        }
        return item;
    });
    return recipe;
});  
     
function getRecipeId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

let recipeId = getRecipeId();

let selectedRecipe;

if (recipeId) {
    selectedRecipe = storedRecipes.find(r => r.id == recipeId);
} else {
    selectedRecipe = storedRecipes[0];
}

if (!selectedRecipe) {
    document.body.innerHTML = "<h2> Recipe not found</h2>";
    return;
}


function renderUI() {

    document.getElementById("Title").innerText = selectedRecipe.title;
    document.getElementById("category").innerText = "Category: " + selectedRecipe.category;
    document.getElementById("recipeImage").src = selectedRecipe.image;
    const ul = document.getElementById("ingredientsList");
    ul.innerHTML = "";

       selectedRecipe.ingredients.forEach(item => {
    const li = document.createElement("li");
  li.textContent = item.qty ? `${item.name} - ${item.qty}`: item.name;
    ul.appendChild(li);
});


    const ol = document.getElementById("stepsList");
    ol.innerHTML = "";

    selectedRecipe.steps.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        ol.appendChild(li);
    });

    document.getElementById("cookingTime").innerText = selectedRecipe.cookingTime;
    document.getElementById("servings").innerText = selectedRecipe.servings;
}

const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const favBtn = document.getElementById("addToFavBtn");


if (editBtn) editBtn.classList.add("hidden");
if (deleteBtn) deleteBtn.classList.add("hidden");
if (favBtn) favBtn.classList.add("hidden");

if (role === "admin") {
    if (editBtn) editBtn.classList.remove("hidden");
    if (deleteBtn) deleteBtn.classList.remove("hidden");
} 
else if (role === "user") {
    if (favBtn) {
        favBtn.classList.remove("hidden");
        favBtn.addEventListener('click', function() {
            addToFavorites(
                selectedRecipe.id, 
                selectedRecipe.title, 
                selectedRecipe.image, 
                selectedRecipe.category
            );
        });
    }
}
renderUI();

});
